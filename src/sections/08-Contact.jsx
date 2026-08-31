import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { validatePhone, validateEmail, sanitizeInput } from '../utils/security';
import './08-Contact.css';

const QUICK_SCHEDULE_SUMMARY = [
  { level: '18+ Adults Morning Class', days: 'Monday to Saturday', timing: '5:00 AM – 7:00 AM' },
  { level: '18- Kids & Teens Evening Class', days: 'Monday to Saturday', timing: '5:00 PM – 7:00 PM' },
  { level: 'Housewives Early Morning Batch', days: 'Monday to Saturday', timing: '4:00 AM – 5:00 AM' },
  { level: 'Hyderabad Tournament Training', days: '5 – 6 September Prep', timing: 'Dedicated Sparring' }
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    experienceLevel: '18+ Adults Morning Batch (5:00 AM – 7:00 AM)',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const formLoadTimeRef = React.useRef(Date.now());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getWhatsAppBookingUrl = (data = formData) => {
    const lines = [
      `KRISHNA MARTIAL ART KARATE SCHOOL, BIDAR`,
      `-----------------------------------------`,
      `FREE 2-3 DAYS TRIAL CLASS ENROLLMENT`,
      ``,
      `Namaste Sensei Krishna,`,
      `I would like to register for a free trial practice session at your academy. Here are my details:`,
      ``,
      `STUDENT INFORMATION:`,
      `- Student Name: ${data.studentName ? data.studentName.trim() : ''}`,
      data.parentName ? `- Parent / Guardian: ${data.parentName.trim()}` : null,
      `- Phone Number: ${data.phone ? data.phone.trim() : ''}`,
      data.email ? `- Email Address: ${data.email.trim()}` : null,
      `- Selected Batch: ${data.experienceLevel}`,
      data.message ? `- Goals / Query: ${data.message.trim()}` : null,
      ``,
      `-----------------------------------------`,
      `Location: K.E.B Road, SBH Colony, Bidar 585401`,
      `Please let me know the confirmation and reporting date. Thank you!`
    ].filter(Boolean);

    const messageText = lines.join('\n');
    return `https://api.whatsapp.com/send?phone=919620303207&text=${encodeURIComponent(messageText)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Bot Honeypot Trap Check
    if (honeypot) {
      // Silently drop bot submission
      setFormSubmitted(true);
      return;
    }

    // 2. Submission Timing Trap (Bots submit within milliseconds)
    const timeElapsed = Date.now() - formLoadTimeRef.current;
    if (timeElapsed < 1200) {
      setFormSubmitted(true);
      return;
    }

    // 3. Client Rate Limit Check (Prevent rapid form spamming)
    const lastSubmitTime = Number(sessionStorage.getItem('kka_last_lead_submit') || '0');
    if (Date.now() - lastSubmitTime < 15000) {
      setErrorMsg('Please wait a moment before submitting another request.');
      return;
    }

    const cleanStudentName = sanitizeInput(formData.studentName, 80);
    const cleanPhone = sanitizeInput(formData.phone, 20);
    const cleanParentName = sanitizeInput(formData.parentName, 80);
    const cleanEmail = sanitizeInput(formData.email, 100);
    const cleanMessage = sanitizeInput(formData.message, 300);

    if (!cleanStudentName || !cleanPhone) {
      setErrorMsg('Please fill in required fields (Student Name, Phone Number).');
      return;
    }

    // 4. Validate Phone format
    if (!validatePhone(cleanPhone)) {
      setErrorMsg('Please enter a valid 10-digit phone/mobile number.');
      return;
    }

    // 5. Validate Email format if provided
    if (cleanEmail && !validateEmail(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const sanitizedData = {
      studentName: cleanStudentName,
      parentName: cleanParentName,
      phone: cleanPhone,
      email: cleanEmail,
      experienceLevel: formData.experienceLevel,
      message: cleanMessage
    };

    setErrorMsg('');
    setIsSubmitting(true);
    sessionStorage.setItem('kka_last_lead_submit', String(Date.now()));

    // Save lead backup in localStorage for instant access
    try {
      const existingLeads = JSON.parse(localStorage.getItem('kka_registered_leads') || '[]');
      existingLeads.unshift({
        ...sanitizedData,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('kka_registered_leads', JSON.stringify(existingLeads.slice(0, 50)));
    } catch {
      // ignore
    }

    // Automatically send details in background to Sensei Krishna (Email API)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '382cb755-e421-4f95-9bf8-92167d3b24f5',
          from_name: 'Krishna Karate Academy Website',
          subject: `New Free Trial Registration: ${sanitizedData.studentName} (${sanitizedData.experienceLevel})`,
          recipient: 'bidarkrishnakaratewal@gmail.com',
          student_name: sanitizedData.studentName,
          parent_guardian: sanitizedData.parentName || 'N/A',
          phone_number: sanitizedData.phone,
          email_address: sanitizedData.email || 'N/A',
          batch_timing: sanitizedData.experienceLevel,
          message_goals: sanitizedData.message || 'None',
          academy_location: 'K.E.B Road SBH Colony Hanuman Mandir Bidar 585401'
        })
      });
    } catch {
      // Completed background push
    }

    setIsSubmitting(false);
    setFormSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.8 },
        colors: ['#e60000', '#25282b', '#ffffff']
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="contact" className="content-band-soft contact-section-wrapper">
      <div className="section-wrapper contact-content-inner">
        <div className="section-heading-block">
          <span className="eyebrow-uppercase">GET IN TOUCH & ENROLL</span>
          <h2 className="display-lg contact-heading">
            Book Your Free 2–3 Days Trial
          </h2>
          <p className="body-md section-subtitle">
            Visit our training center in Bidar or register below. 
            Meet Sensei Krishna, try out a live practice session, and experience the energy of Krishna Karate Academy!
          </p>
        </div>

        {/* Two Column Layout: Info/Schedule + Lead Capture Form */}
        <div className="contact-main-grid">
          {/* Left Column: Dojo Details & Schedule */}
          <div className="contact-info-col">
            <div className="card-content dojo-location-card">
              <div className="dojo-card-header">
                <img src="/logo.jpg" alt="Krishna Martial Art Logo" className="contact-brand-logo" />
                <div>
                  <span className="eyebrow-uppercase">ACADEMY LOCATION</span>
                  <h3 className="display-xs location-name">
                    <span className="brand-word-black">KRISHNA</span>{' '}
                    <span className="brand-word-red">KARATE</span>{' '}
                    <span className="brand-word-black">ACADEMY</span> BIDAR
                  </h3>
                </div>
              </div>
              
              <div className="info-item-row">
                <span className="info-icon">📍</span>
                <div>
                  <span className="info-label caption-uppercase">ADDRESS</span>
                  <p className="info-value body-sm">
                    K.E.B Road, SBH Colony, Hanuman Mandir, Bidar, Karnataka – 585401
                  </p>
                </div>
              </div>

              <div className="info-item-row">
                <span className="info-icon">📞</span>
                <div>
                  <span className="info-label caption-uppercase">PHONE & WHATSAPP</span>
                  <p className="info-value body-sm-strong">+91 96203 03207 / +91 72598 96802</p>
                </div>
              </div>

              <div className="info-item-row">
                <span className="info-icon">✉</span>
                <div>
                  <span className="info-label caption-uppercase">EMAIL ADDRESS</span>
                  <p className="info-value body-sm">bidarkrishnakaratewal@gmail.com</p>
                </div>
              </div>

              {/* Action Buttons (60px Pill Buttons) */}
              <div className="dojo-action-links">
                <a
                  href="https://maps.app.goo.gl/8j6y5akxcsuredU46"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-ink btn-action-pill"
                >
                  <span>📍 Open Google Maps</span>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=919620303207&text=Namaste%20Sensei%20Krishna%2C%20I%20would%20like%20to%20inquire%20about%20karate%20classes%20and%20trial%20sessions%20at%20Krishna%20Martial%20Art%20Karate%20School%2C%20Bidar."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary btn-action-pill"
                >
                  <span>💬 WhatsApp Sensei</span>
                </a>
                <a
                  href="tel:+919620303207"
                  className="btn-outline-ink btn-action-pill"
                >
                  <span>📞 Call Directly</span>
                </a>
              </div>

              {/* Social Channels (Pill Chips) */}
              <div className="dojo-social-strip">
                <span className="social-label caption-uppercase">FOLLOW US:</span>
                <div className="social-links-row">
                  <a
                    href="https://www.instagram.com/krishna_waldoddi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="badge-chip social-pill"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="badge-chip social-pill"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://youtube.com/@bidarkrishnakaratewaldoddi1106?si=rU2b0sUZqUMQB3-Q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="badge-chip social-pill"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Reference Training Schedule */}
            <div className="card-content quick-schedule-panel">
              <h4 className="schedule-panel-title">
                <span>🗓️ CLASS SCHEDULE QUICK-REFERENCE</span>
              </h4>
              <div className="quick-schedule-list">
                {QUICK_SCHEDULE_SUMMARY.map((s, idx) => (
                  <div key={idx} className="quick-sched-item">
                    <div className="sched-level-name body-sm-strong">{s.level}</div>
                    <div className="sched-days-timing caption">
                      <span>{s.days}</span>
                      <span className="sched-timing">{s.timing}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Automated Lead Capture Form */}
          <div className="contact-form-column">
            <div className="card-content contact-form-card">
              {formSubmitted ? (
                <div className="form-success-state">
                  <div className="speechmark-logo-orb success-emblem">
                    <span>✓</span>
                  </div>
                  <h3 className="display-sm success-title">REGISTRATION RECEIVED AUTOMATICALLY!</h3>
                  <p className="body-md success-desc">
                    Thank you, <strong>{formData.studentName}</strong>! Your 2–3 Days Free Trial request has been 
                    automatically delivered to Sensei Krishna (<strong>bidarkrishnakaratewal@gmail.com</strong>).
                    Sensei will contact you at <strong>{formData.phone}</strong> for your reporting schedule.
                  </p>
                  
                  <div className="success-qr-wrap">
                    <img src="/whatsapp-qr.jpg" alt="WhatsApp QR Code" className="success-qr-img" />
                  </div>

                  <div className="success-actions">
                    <a
                      href={getWhatsAppBookingUrl(formData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary btn-whatsapp-confirm"
                    >
                      <span>💬 Chat with Sensei on WhatsApp (Optional)</span>
                      <span>→</span>
                    </a>
                    <button
                      type="button"
                      className="btn-outline-ink btn-reset-form"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          studentName: '',
                          parentName: '',
                          phone: '',
                          email: '',
                          experienceLevel: '18+ Adults Morning Batch (5:00 AM – 7:00 AM)',
                          message: ''
                        });
                      }}
                    >
                      Register Another Student
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="dojo-lead-form">
                  {/* Invisible Honeypot Anti-Bot Trap */}
                  <input
                    type="text"
                    name="contact_verification_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="form-header-box">
                    <h3 className="display-xs form-title">REGISTER FOR A FREE CLASS</h3>
                    <p className="body-sm form-sub">
                      Fill your details below. Single-class attendance rule applies (18+ Morning, 18- Evening, or 4 AM Housewives).
                    </p>
                  </div>

                  {errorMsg && <div className="form-error-banner body-sm">{errorMsg}</div>}

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="studentName" className="form-label caption-uppercase">
                        STUDENT NAME <span className="req-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        className="form-input"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="parentName" className="form-label caption-uppercase">
                        PARENT / GUARDIAN (IF UNDER 18)
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        className="form-input"
                        placeholder="e.g. Suresh Sharma"
                        value={formData.parentName}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label caption-uppercase">
                        PHONE / WHATSAPP NUMBER <span className="req-star">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-input"
                        placeholder="+91 96203 03207"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label caption-uppercase">
                        EMAIL ADDRESS (OPTIONAL)
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="experienceLevel" className="form-label caption-uppercase">
                      BATCH TIMING OF INTEREST
                    </label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      className="form-select"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      <option value="18+ Adults Morning Batch (5:00 AM – 7:00 AM)">18+ Adults Morning Batch (5:00 AM – 7:00 AM)</option>
                      <option value="18- Kids & Teens Evening Batch (5:00 PM – 7:00 PM)">18- Kids & Teens Evening Batch (5:00 PM – 7:00 PM)</option>
                      <option value="Housewives Early Morning Batch (4:00 AM – 5:00 AM)">Housewives Early Morning Batch (4:00 AM – 5:00 AM)</option>
                      <option value="Hyderabad Tournament Squad (5-6 Sept)">Hyderabad Tournament Squad (5–6 Sept)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label caption-uppercase">
                      ANY QUESTIONS OR SPECIAL GOALS (OPTIONAL)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      rows="3"
                      placeholder="Let us know any questions about batches or start dates..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    className="button-primary btn-form-submit"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'SUBMITTING REGISTRATION...' : 'CONFIRM 2–3 DAYS FREE TRIAL'}</span>
                    <span>→</span>
                  </button>
                </form>
              )}
            </div>

            {/* Official Visiting Card Display below registration form */}
            <div className="card-content visiting-card-container">
              <div className="visiting-card-header">
                <span className="eyebrow-uppercase">OFFICIAL ACADEMY CARD</span>
                <span className="badge-chip badge-chip-red">REG. NO .307/2016/17</span>
              </div>
              <div className="visiting-card-frame">
                <img
                  src="/visiting-card.jpg"
                  alt="Krishna Martial Art Karate School Visiting Card"
                  className="visiting-card-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Footer (Clean White Mode full-width band) */}
      <footer className="dojo-global-footer">
        <div className="footer-content-strip">
          <div className="footer-brand-side">
            <div className="footer-logo-row">
              <img src="/logo.jpg" alt="Krishna Martial Art Logo" className="footer-logo-img" />
              <div>
                <span className="footer-brand-title">
                  <span className="brand-word-black">KRISHNA</span>{' '}
                  <span className="brand-word-red">MARTIAL ART KARATE</span>{' '}
                  <span className="brand-word-black">SCHOOL</span>
                </span>
                <span className="footer-reg-number caption">BIDAR · REG. NO .307/2016/17</span>
              </div>
            </div>
            <p className="footer-copy caption">
              © {new Date().getFullYear()} Krishna Martial Art Karate School · K.E.B Road, SBH Colony, Hanuman Mandir, Bidar 585401 · <em>"We Are The Best"</em>
            </p>
          </div>

          <div className="footer-links-side body-sm">
            <a href="#hero" className="footer-link">Home</a>
            <a href="#about" className="footer-link">About Founder</a>
            <a href="#gallery" className="footer-link">Class Gallery</a>
            <a href="#classes" className="footer-link">Classes & Fees</a>
            <a href="#tournaments" className="footer-link">Tournaments</a>
            <a href="#hall-of-fame" className="footer-link">Hall of Fame</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
