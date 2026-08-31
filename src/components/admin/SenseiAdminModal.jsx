import React, { useState } from 'react';
import { useAcademyData } from '../../context/AcademyDataContext';
import './SenseiAdminModal.css';

const ADMIN_PIN = '2012';

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

  if (!isAdminOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (enteredPin.trim() === ADMIN_PIN || enteredPin.trim() === 'kka2012') {
      setIsAuthenticated(true);
      setPinError('');
      showToast('Welcome, Sensei Krishna!');
    } else {
      setPinError('Incorrect PIN. (Default PIN is 2012)');
    }
  };

  const handleCreateTournament = (e) => {
    e.preventDefault();
    if (!newTourn.title || !newTourn.location) return;
    addTournament({
      title: newTourn.title,
      subtitle: newTourn.subtitle || 'State & Invitational Championship',
      targetDate: newTourn.targetDate,
      location: newTourn.location,
      categories: ['Kata Forms Division', 'Kumite Sparring', 'Cadet & Senior Divisions'],
      status: newTourn.status || 'Upcoming Tournament'
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
    if (!newChamp.name || !newChamp.event) return;
    addChampion({
      name: newChamp.name,
      title: newChamp.title,
      event: newChamp.event,
      badge: newChamp.badge,
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
    if (!newBelt.name) return;
    addBlackBelt(Number(newBelt.tierIndex), {
      name: newBelt.name,
      title: newBelt.title,
      status: newBelt.status
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
    const reader = new FileReader();
    reader.onload = (event) => {
      const success = importDataJSON(event.target.result);
      if (success) {
        showToast('Data imported successfully!');
      } else {
        alert('Invalid JSON backup file format.');
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
            <span className="admin-badge">🥋 SENSEI ADMIN PORTAL</span>
            <h2 className="admin-title">Academy Live Content Manager</h2>
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
          /* AUTHENTICATION VIEW */
          <form className="admin-auth-form" onSubmit={handleLogin}>
            <div className="auth-lock-icon">🔒</div>
            <h3 className="auth-title">Sensei Krishna Login</h3>
            <p className="auth-desc">
              Enter your master PIN to update Tournaments, Student Wins, and Belt Registers without writing any code.
            </p>
            <div className="auth-input-group">
              <input
                type="password"
                placeholder="Enter PIN (Default: 2012)"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                className="auth-pin-input"
                autoFocus
              />
              <button type="submit" className="button-primary auth-submit-btn">
                Unlock Portal →
              </button>
            </div>
            {pinError && <p className="auth-error-msg">{pinError}</p>}
            <p className="auth-hint caption">Default Academy ESTD PIN: <code>2012</code></p>
          </form>
        ) : (
          /* DASHBOARD VIEW */
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
                          <option key={idx} value={idx}>{b.tier}</option>
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
                      />
                    </div>
                    <div className="form-field">
                      <label>Title / Role</label>
                      <input
                        type="text"
                        placeholder="e.g. Senior Black Belt Coach"
                        value={newBelt.title}
                        onChange={(e) => setNewBelt({ ...newBelt, title: e.target.value })}
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
                      <h5 className="tier-head-title">{tier.tier} ({tier.students.length})</h5>
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

            {/* TAB 4: BACKUP & RESTORE */}
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
