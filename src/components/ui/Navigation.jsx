import React, { useState, useEffect } from 'react';
import './Navigation.css';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Classes & Fees', href: '#classes' },
    { label: 'Tournaments', href: '#tournaments' },
    { label: 'Hall of Fame', href: '#hall-of-fame' }
  ];

  return (
    <header className={`navbar-header-wrap ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#hero" className="navbar-brand">
          <img src="/logo.jpg" alt="Krishna Martial Art Logo" className="navbar-logo-img" />
          <div className="navbar-brand-copy">
            <span className="brand-name">
              <span className="brand-word-black">KRISHNA</span>{' '}
              <span className="brand-word-red">KARATE</span>
            </span>
            <span className="brand-loc">ESTD 2012 · BIDAR</span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="navbar-links-desktop" aria-label="Main Navigation">
          {navLinks.map((link, idx) => (
            <a key={idx} href={link.href} className="nav-item-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA / Mobile Trigger */}
        <div className="navbar-right-actions">
          <a href="#contact" className="btn-primary navbar-cta-btn">
            <span>Free Trial</span>
            <span className="cta-arrow-small">→</span>
          </a>

          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`toggle-icon ${mobileMenuOpen ? 'is-open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          <nav className="mobile-nav-links">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="mobile-link-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="button-primary mobile-cta-button"
              onClick={() => setMobileMenuOpen(false)}
            >
              Free Trial
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
