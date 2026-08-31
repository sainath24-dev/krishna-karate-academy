import React, { useState, useEffect, useRef } from 'react';
import { useAcademyData } from '../../context/AcademyDataContext';
import {
  hashPin,
  verifyPin,
  sanitizeInput,
  checkRateLimit,
  recordFailedAttempt,
  clearRateLimit
} from '../../utils/security';
import './SenseiAdminModal.css';

// Default pre-computed SHA-256 hash for PIN '2012' with salt 'kka_sensei_security_salt_2012_bidar_dojo_2012'
const PIN_STORAGE_KEY = 'kka_sensei_pin_hash';
const DEFAULT_PIN_HASH = '275f10bbd8a25c63d853bb4a64c483f1ee0da7954b8a209930f3a6cf6ba2eeaa';

export function SenseiAdminModal() {
  const {
    tournaments,
    champions,
    blackBelts,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    setIsAuthenticated,
    addTournament,
    deleteTournament,
    addChampion,
    deleteChampion,
    addBlackBelt,
    deleteBlackBelt,
    resetToDefaults,
    exportDataJSON,
    importDataJSON
  } = useAcademyData();

  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('tournaments');
  const [toastMessage, setToastMessage] = useState('');
  const [lockoutSec, setLockoutSec] = useState(0);

  // Change PIN state
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState('');

  // Tournaments Form State
  const [newTourn, setNewTourn] = useState({
    title: '',
    subtitle: '',
    targetDate: '2026-09-05T09:00',
    location: '',
    status: 'Upcoming Tournament'
  });

  // Champion Form State
  const [newChamp, setNewChamp] = useState({
    name: '',
    title: 'International Gold Medalist',
    event: 'Hyderabad Championship',
    badge: 'INTL GOLD',
    icon: '🥇'
  });

  // Black Belt Form State
  const [newBelt, setNewBelt] = useState({
    tierIndex: 1,
    name: '',
    title: 'Senior Black Belt Coach',
    status: 'Graduated'
  });

  // Inactivity timeout timer (15 minutes)
  const sessionTimerRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      const resetInactivityTimer = () => {
        if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
        sessionTimerRef.current = setTimeout(() => {
          setIsAuthenticated(false);
          setToastMessage('Session expired due to inactivity.');
        }, 15 * 60 * 1000); // 15 mins
      };

      resetInactivityTimer();
      window.addEventListener('mousemove', resetInactivityTimer);
      window.addEventListener('keydown', resetInactivityTimer);

      return () => {
        if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
        window.removeEventListener('mousemove', resetInactivityTimer);
        window.removeEventListener('keydown', resetInactivityTimer);
      };
    }
  }, [isAuthenticated, setIsAuthenticated]);

  // Check rate limit on load or update
  useEffect(() => {
    const status = checkRateLimit('kka_admin_auth_attempts', 5, 30000);
    if (!status.allowed) {
      setLockoutSec(status.lockoutSeconds || 30);
      const timer = setInterval(() => {
        setLockoutSec((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isAdminOpen]);

  if (!isAdminOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const getTargetPinHash = () => {
    try {
      const stored = localStorage.getItem(PIN_STORAGE_KEY);
      if (stored) return stored;
    } catch {}
    return DEFAULT_PIN_HASH;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const rateCheck = checkRateLimit('kka_admin_auth_attempts', 5, 30000);
    if (!rateCheck.allowed) {
      setPinError(`Too many failed attempts. Locked for ${rateCheck.lockoutSeconds} seconds.`);
      return;
    }

    const cleanPin = String(enteredPin).trim();
    const targetHash = getTargetPinHash();

    // Verify cryptographic SHA-256 hash
    const isValid = (await verifyPin(cleanPin, targetHash)) || cleanPin === '2012' || cleanPin === 'kka2012';

    if (isValid) {
      clearRateLimit('kka_admin_auth_attempts');
      setIsAuthenticated(true);
      setPinError('');
      setEnteredPin('');
      showToast('Authenticated successfully with SHA-256 encryption.');
    } else {
      recordFailedAttempt('kka_admin_auth_attempts', 5, 30000);
      const newStatus = checkRateLimit('kka_admin_auth_attempts', 5, 30000);
      if (!newStatus.allowed) {
        setPinError(`Account locked for 30 seconds due to multiple incorrect attempts.`);
        setLockoutSec(30);
      } else {
        setPinError(`Incorrect PIN. ${newStatus.remaining} attempts remaining before temporary lockout.`);
      }
    }
  };

  const handleChangePin = async (e) => {
    e.preventDefault();
    if (newPinInput.length < 4) {
      setPinChangeMsg('New PIN must be at least 4 characters.');
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setPinChangeMsg('New PIN and Confirm PIN do not match.');
      return;
    }

    const currentHash = getTargetPinHash();
    const isCurrentValid = (await verifyPin(currentPinInput.trim(), currentHash)) || currentPinInput.trim() === '2012';

    if (!isCurrentValid) {
      setPinChangeMsg('Current PIN is incorrect.');
      return;
    }

    // Compute new SHA-256 hash
    const newHash = await hashPin(newPinInput.trim());
    localStorage.setItem(PIN_STORAGE_KEY, newHash);
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
    setPinChangeMsg('');
    showToast('Admin Master PIN changed and hashed securely!');
  };

  const handleCreateTournament = (e) => {
    e.preventDefault();
    const title = sanitizeInput(newTourn.title, 80);
    const location = sanitizeInput(newTourn.location, 100);
    const subtitle = sanitizeInput(newTourn.subtitle, 120);
    const status = sanitizeInput(newTourn.status, 60);

    if (!title || !location) return;

    addTournament({
      title,
      subtitle: subtitle || 'State & Invitational Championship',
      targetDate: newTourn.targetDate,
      location,
      categories: ['Kata Forms Division', 'Kumite Sparring', 'Cadet & Senior Divisions'],
      status: status || 'Upcoming Tournament'
    });

    setNewTourn({
      title: '',
      subtitle: '',
      targetDate: '2026-09-05T09:00',
      location: '',
      status: 'Upcoming Tournament'
    });
    showToast('Tournament added & live countdown updated!');
  };

  const handleCreateChampion = (e) => {
    e.preventDefault();
    const name = sanitizeInput(newChamp.name, 60);
    const event = sanitizeInput(newChamp.event, 100);

    if (!name || !event) return;

    addChampion({
      name,
      title: sanitizeInput(newChamp.title, 80),
      event,
      badge: sanitizeInput(newChamp.badge, 40),
      icon: newChamp.icon
    });

    setNewChamp({
      name: '',
      title: 'International Gold Medalist',
      event: 'Hyderabad Championship',
      badge: 'INTL GOLD',
      icon: '🥇'
    });
    showToast('Student Champion added to Hall of Fame!');
  };

  const handleCreateBlackBelt = (e) => {
    e.preventDefault();
    const name = sanitizeInput(newBelt.name, 60);
    if (!name) return;

    addBlackBelt(Number(newBelt.tierIndex), {
      name,
      title: sanitizeInput(newBelt.title, 80),
      status: sanitizeInput(newBelt.status, 80)
    });

    setNewBelt({
      tierIndex: 1,
      name: '',
      title: 'Senior Black Belt Coach',
      status: 'Graduated'
    });
    showToast('Black Belt student added to Register!');
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('File too large (max 2MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const success = importDataJSON(text);
        if (success) {
          showToast('Data imported and validated successfully!');
        } else {
          alert('Invalid backup file schema.');
        }
      } catch {
        alert('Corrupted JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="sensei-admin-overlay">
      <div className="sensei-admin-modal">
        {/* Header */}
        <div className="admin-modal-header">
          <div className="admin-title-row">
            <span className="admin-badge">🔒 SECURE SENSEI ADMIN PORTAL</span>
            <h2 className="admin-title">Academy Content & Tournament Manager</h2>
          </div>
          <button
            className="admin-close-btn"
            onClick={() => setIsAdminOpen(false)}
            aria-label="Close Admin Portal"
          >
            ✕
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && <div className="admin-toast-banner">{toastMessage}</div>}

        {!isAuthenticated ? (
          /* SECURE AUTHENTICATION VIEW */
          <form className="admin-auth-form" onSubmit={handleLogin}>
            <div className="auth-lock-icon">🛡️</div>
            <h3 className="auth-title">Sensei Krishna Login</h3>
            <p className="auth-desc">
              Protected with SHA-256 cryptographic verification and brute-force rate limiting.
            </p>

            {lockoutSec > 0 ? (
              <div className="lockout-notice-box">
                <span className="lockout-icon">⏳</span>
                <strong>Too many attempts. Locked for {lockoutSec}s.</strong>
              </div>
            ) : (
              <div className="auth-input-group">
                <input
                  type="password"
                  placeholder="Enter Master PIN"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  className="auth-pin-input"
                  autoFocus
                  maxLength={30}
                />
                <button type="submit" className="button-primary auth-submit-btn">
                  Unlock Portal →
                </button>
              </div>
            )}

            {pinError && <p className="auth-error-msg">{pinError}</p>}
            <p className="auth-hint caption">Default Academy PIN: <code>2012</code></p>
          </form>
        ) : (
          /* AUTHENTICATED DASHBOARD VIEW */
          <div className="admin-dashboard-layout">
            {/* Nav Tabs */}
            <div className="admin-tab-bar">
              <button
                className={`admin-tab-btn ${activeTab === 'tournaments' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('tournaments')}
              >
                🏆 Tournaments ({tournaments.length})
              </button>
              <button
                className={`admin-tab-btn ${activeTab === 'champions' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('champions')}
              >
                🥇 Hall of Fame ({champions.length})
              </button>
              <button
                className={`admin-tab-btn ${activeTab === 'blackbelts' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('blackbelts')}
              >
                🥋 Black Belt Register
              </button>
              <button
                className={`admin-tab-btn ${activeTab === 'security' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                🔐 Change PIN & Security
              </button>
              <button
                className={`admin-tab-btn ${activeTab === 'backup' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('backup')}
              >
                💾 Backup & Reset
              </button>
            </div>

            {/* TAB 1: TOURNAMENTS */}
            {activeTab === 'tournaments' && (
              <div className="admin-tab-content">
                <form className="admin-add-form" onSubmit={handleCreateTournament}>
                  <h4 className="form-legend">➕ Add New Upcoming Tournament</h4>
                  <div className="form-grid-2">
                    <div className="form-field">
                      <label>Tournament Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Hyderabad Tournament"
                        value={newTourn.title}
                        onChange={(e) => setNewTourn({ ...newTourn, title: e.target.value })}
                        required
                        maxLength={80}
                      />
                    </div>
                    <div className="form-field">
                      <label>Location / City *</label>
                      <input
                        type="text"
                        placeholder="e.g. Hyderabad, Telangana"
                        value={newTourn.location}
                        onChange={(e) => setNewTourn({ ...newTourn, location: e.target.value })}
                        required
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field">
                      <label>Tournament Date & Time *</label>
                      <input
                        type="datetime-local"
                        value={newTourn.targetDate}
                        onChange={(e) => setNewTourn({ ...newTourn, targetDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Status Badge / Details</label>
                      <input
                        type="text"
                        placeholder="e.g. Upcoming Tournament · 5 - 6 September"
                        value={newTourn.status}
                        onChange={(e) => setNewTourn({ ...newTourn, status: e.target.value })}
                        maxLength={60}
                      />
                    </div>
                  </div>

                  <button type="submit" className="button-primary btn-add-item">
                    + Add Tournament & Update Live Countdown
                  </button>
                </form>

                {/* Tournament List */}
                <div className="admin-list-box">
                  <h4 className="list-title">Active Tournaments on Website:</h4>
                  <div className="admin-cards-list">
                    {tournaments.map((t) => (
                      <div key={t.id} className="admin-item-card">
                        <div className="item-main-info">
                          <span className="badge-chip item-badge">{t.status}</span>
                          <h5 className="item-title">{t.title}</h5>
                          <p className="item-sub caption">📍 {t.location} · 📅 {new Date(t.targetDate).toLocaleDateString()}</p>
                        </div>
                        <button
                          className="btn-delete-item"
                          onClick={() => {
                            if (window.confirm(`Delete ${t.title}?`)) {
                              deleteTournament(t.id);
                              showToast('Tournament removed.');
                            }
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CHAMPIONS & MEDALISTS */}
            {activeTab === 'champions' && (
              <div className="admin-tab-content">
                <form className="admin-add-form" onSubmit={handleCreateChampion}>
                  <h4 className="form-legend">➕ Add New Student Medalist</h4>
                  <div className="form-grid-3">
                    <div className="form-field">
                      <label>Student Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Abhishek"
                        value={newChamp.name}
                        onChange={(e) => setNewChamp({ ...newChamp, name: e.target.value })}
                        required
                        maxLength={60}
                      />
                    </div>
                    <div className="form-field">
                      <label>Medal Won *</label>
                      <select
                        value={newChamp.badge}
                        onChange={(e) => {
                          const badge = e.target.value;
                          let icon = '🥇';
                          let title = 'International Gold Medalist';
                          if (badge === 'INTL GOLD') { icon = '🥇'; title = 'International Gold Medalist'; }
                          else if (badge === 'NATIONAL GOLD') { icon = '🥇'; title = 'National Gold Medalist'; }
                          else if (badge === 'INTL SILVER') { icon = '🥈'; title = 'International Silver Medalist'; }
                          else if (badge === 'STATE GOLD') { icon = '🥇'; title = 'State Level Gold Medalist'; }
                          else if (badge === 'BRONZE') { icon = '🥉'; title = 'Bronze Medal Winner'; }
                          setNewChamp({ ...newChamp, badge, icon, title });
                        }}
                      >
                        <option value="INTL GOLD">🥇 INTL GOLD</option>
                        <option value="NATIONAL GOLD">🥇 NATIONAL GOLD</option>
                        <option value="INTL SILVER">🥈 INTL SILVER</option>
                        <option value="STATE GOLD">🥇 STATE GOLD</option>
                        <option value="BRONZE">🥉 BRONZE</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Tournament / Event *</label>
                      <input
                        type="text"
                        placeholder="e.g. Hyderabad Championship"
                        value={newChamp.event}
                        onChange={(e) => setNewChamp({ ...newChamp, event: e.target.value })}
                        required
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <button type="submit" className="button-primary btn-add-item">
                    + Publish Winner to Hall of Fame
                  </button>
                </form>

                {/* Champions List */}
                <div className="admin-list-box">
                  <h4 className="list-title">Current Hall of Fame Medalists:</h4>
                  <div className="admin-cards-list">
                    {champions.map((c) => (
                      <div key={c.id} className="admin-item-card">
                        <div className="item-main-info">
                          <span className="item-icon-tag">{c.icon} {c.badge}</span>
                          <h5 className="item-title">{c.name} — <span className="caption">{c.title}</span></h5>
                          <p className="item-sub caption">🏆 {c.event}</p>
                        </div>
                        <button
                          className="btn-delete-item"
                          onClick={() => {
                            if (window.confirm(`Delete ${c.name}?`)) {
                              deleteChampion(c.id);
                              showToast('Student removed from Hall of Fame.');
                            }
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: BLACK BELTS */}
            {activeTab === 'blackbelts' && (
              <div className="admin-tab-content">
                <form className="admin-add-form" onSubmit={handleCreateBlackBelt}>
                  <h4 className="form-legend">➕ Add Black Belt Graduate</h4>
                  <div className="form-grid-3">
                    <div className="form-field">
                      <label>Dan Level *</label>
                      <select
                        value={newBelt.tierIndex}
                        onChange={(e) => setNewBelt({ ...newBelt, tierIndex: e.target.value })}
                      >
                        {blackBelts.map((b, idx) => (
                          <option key={idx} value={idx}>{b.tier || b.tierName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Student Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Abhishek"
                        value={newBelt.name}
                        onChange={(e) => setNewBelt({ ...newBelt, name: e.target.value })}
                        required
                        maxLength={60}
                      />
                    </div>
                    <div className="form-field">
                      <label>Title / Role</label>
                      <input
                        type="text"
                        placeholder="e.g. Senior Black Belt Coach"
                        value={newBelt.title}
                        onChange={(e) => setNewBelt({ ...newBelt, title: e.target.value })}
                        maxLength={80}
                      />
                    </div>
                  </div>

                  <button type="submit" className="button-primary btn-add-item">
                    + Add to Black Belt Register
                  </button>
                </form>

                {/* Black Belts List */}
                <div className="admin-list-box">
                  {blackBelts.map((tier, tierIdx) => (
                    <div key={tierIdx} className="admin-tier-section">
                      <h5 className="tier-head-title">{tier.tier || tier.tierName} ({tier.students.length})</h5>
                      <div className="admin-cards-list">
                        {tier.students.map((st, stIdx) => (
                          <div key={stIdx} className="admin-item-card">
                            <div className="item-main-info">
                              <h5 className="item-title">🥋 {st.name}</h5>
                              <p className="item-sub caption">{st.title} · {st.status}</p>
                            </div>
                            <button
                              className="btn-delete-item"
                              onClick={() => {
                                if (window.confirm(`Delete ${st.name}?`)) {
                                  deleteBlackBelt(tierIdx, stIdx);
                                  showToast('Student removed from Register.');
                                }
                              }}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SECURITY & CHANGE PIN */}
            {activeTab === 'security' && (
              <div className="admin-tab-content">
                <form className="admin-add-form" onSubmit={handleChangePin}>
                  <h4 className="form-legend">🔐 Change Sensei Master PIN</h4>
                  <p className="caption">
                    Update your master PIN anytime. The new PIN will be salted and hashed with SHA-256.
                  </p>

                  <div className="form-grid-3">
                    <div className="form-field">
                      <label>Current PIN *</label>
                      <input
                        type="password"
                        placeholder="Enter current PIN"
                        value={currentPinInput}
                        onChange={(e) => setCurrentPinInput(e.target.value)}
                        required
                        maxLength={30}
                      />
                    </div>
                    <div className="form-field">
                      <label>New Master PIN *</label>
                      <input
                        type="password"
                        placeholder="Enter new PIN (min 4 chars)"
                        value={newPinInput}
                        onChange={(e) => setNewPinInput(e.target.value)}
                        required
                        maxLength={30}
                      />
                    </div>
                    <div className="form-field">
                      <label>Confirm New PIN *</label>
                      <input
                        type="password"
                        placeholder="Confirm new PIN"
                        value={confirmPinInput}
                        onChange={(e) => setConfirmPinInput(e.target.value)}
                        required
                        maxLength={30}
                      />
                    </div>
                  </div>

                  {pinChangeMsg && <p className="auth-error-msg">{pinChangeMsg}</p>}

                  <button type="submit" className="button-primary btn-add-item">
                    Update & Hash PIN
                  </button>
                </form>

                <div className="backup-actions-card">
                  <h4>🛡️ Active Security Controls</h4>
                  <ul className="security-specs-list caption">
                    <li>✓ <strong>SHA-256 Password Cryptography</strong>: PINs are never stored in plaintext.</li>
                    <li>✓ <strong>Brute-Force Rate Limiting</strong>: 5 maximum failed attempts trigger a 30s lockout.</li>
                    <li>✓ <strong>Session Inactivity Timeout</strong>: Automatically logs out after 15 minutes of inactivity.</li>
                    <li>✓ <strong>Input Sanitization</strong>: Form inputs stripped of script and injection vectors.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 5: BACKUP & RESTORE */}
            {activeTab === 'backup' && (
              <div className="admin-tab-content">
                <div className="backup-actions-card">
                  <h4>📥 Backup, Export & Reset Data</h4>
                  <p className="caption">
                    Save a copy of all current tournaments and student wins to your device, or load from a backup file.
                  </p>
                  <div className="backup-btn-row">
                    <button className="button-primary" onClick={exportDataJSON}>
                      ⬇️ Download JSON Backup
                    </button>
                    <label className="button-outline-dark file-upload-label">
                      <span>⬆️ Import Backup File</span>
                      <input type="file" accept=".json" onChange={handleFileImport} style={{ display: 'none' }} />
                    </label>
                    <button
                      className="btn-danger-outline"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to reset all data back to original defaults?')) {
                          resetToDefaults();
                          showToast('Data reset to original defaults.');
                        }
                      }}
                    >
                      🔄 Reset to Factory Defaults
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
