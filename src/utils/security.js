/**
 * Security Utilities for Krishna Karate Academy
 * Includes SHA-256 PIN hashing, Brute-Force Rate Limiting, Input Sanitization, and Schema Validation.
 */

const SALT_PREFIX = 'kka_sensei_security_salt_2012_';

/**
 * Computes a SHA-256 hash of a PIN/Password using Web Crypto API.
 */
export async function hashPin(pin, customSalt = 'bidar_dojo') {
  const encoder = new TextEncoder();
  const data = encoder.encode(SALT_PREFIX + customSalt + '_' + String(pin).trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verifies if an entered PIN matches a target SHA-256 hash.
 */
export async function verifyPin(enteredPin, targetHash, customSalt = 'bidar_dojo') {
  const computedHash = await hashPin(enteredPin, customSalt);
  return computedHash === targetHash;
}

/**
 * Sanitizes generic user input to prevent XSS, HTML injection, and control characters.
 */
export function sanitizeInput(str, maxLen = 150) {
  if (str === null || str === undefined) return '';
  return String(str)
    .trim()
    .replace(/[<>'"`;(){}[\]\\]/g, '') // remove dangerous syntax characters
    .slice(0, maxLen);
}

/**
 * Checks client-side brute force rate limit.
 * Lockout triggers if attempts exceed maxAttempts within windowMs.
 */
export function checkRateLimit(storageKey = 'kka_admin_auth_attempts', maxAttempts = 5, lockoutDurationMs = 30000) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return { allowed: true, remaining: maxAttempts, lockoutMs: 0 };

    const data = JSON.parse(raw);
    const now = Date.now();

    if (data.lockedUntil && now < data.lockedUntil) {
      return {
        allowed: false,
        remaining: 0,
        lockoutMs: data.lockedUntil - now,
        lockoutSeconds: Math.ceil((data.lockedUntil - now) / 1000)
      };
    }

    // Reset if window has elapsed
    if (data.firstAttempt && now - data.firstAttempt > 60000) {
      localStorage.removeItem(storageKey);
      return { allowed: true, remaining: maxAttempts, lockoutMs: 0 };
    }

    const remaining = Math.max(0, maxAttempts - (data.count || 0));
    return { allowed: remaining > 0, remaining, lockoutMs: 0 };
  } catch {
    return { allowed: true, remaining: maxAttempts, lockoutMs: 0 };
  }
}

/**
 * Records a failed authentication attempt and locks if threshold is reached.
 */
export function recordFailedAttempt(storageKey = 'kka_admin_auth_attempts', maxAttempts = 5, lockoutDurationMs = 30000) {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(storageKey);
    const data = raw ? JSON.parse(raw) : { count: 0, firstAttempt: now };

    data.count = (data.count || 0) + 1;
    if (!data.firstAttempt) data.firstAttempt = now;

    if (data.count >= maxAttempts) {
      data.lockedUntil = now + lockoutDurationMs;
    }

    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch {}
}

/**
 * Clears rate limiting on successful login.
 */
export function clearRateLimit(storageKey = 'kka_admin_auth_attempts') {
  try {
    localStorage.removeItem(storageKey);
  } catch {}
}

/**
 * Validates Phone numbers (Indian 10-digit mobile or standard international format)
 */
export function validatePhone(phone) {
  const clean = String(phone).replace(/[\s\-+()]/g, '');
  return /^[0-9]{10,14}$/.test(clean);
}

/**
 * Validates Email addresses safely
 */
export function validateEmail(email) {
  if (!email) return true; // optional in free trial
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}
