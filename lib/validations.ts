// ── Validation Utilities ─────────────────────────────────────────
// Shared between client and server. Returns structured errors per field.

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

// ── Email ────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address.";
  return null;
}

// ── Password ─────────────────────────────────────────────────────

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
  if (!/[0-9]/.test(password)) return "Password must include a number.";
  return null;
}

export function validatePasswordConfirm(password: string, confirm: string): string | null {
  if (!confirm) return "Please confirm your password.";
  if (password !== confirm) return "Passwords do not match.";
  return null;
}

// ── Name ─────────────────────────────────────────────────────────

export function validateName(name: string): string | null {
  if (!name.trim()) return "Name is required.";
  if (name.trim().length < 2) return "Name must be at least 2 characters.";
  if (name.trim().length > 100) return "Name must be less than 100 characters.";
  return null;
}

// ── Berth Fields ─────────────────────────────────────────────────

export function validateBerthName(name: string): string | null {
  if (!name.trim()) return "Berth name is required.";
  if (name.trim().length > 50) return "Berth name must be under 50 characters.";
  return null;
}

export function validatePositiveNumber(value: number, fieldLabel: string): string | null {
  if (isNaN(value) || value <= 0) return `${fieldLabel} must be greater than 0.`;
  return null;
}

export function validateNonNegativeNumber(value: number, fieldLabel: string): string | null {
  if (isNaN(value) || value < 0) return `${fieldLabel} cannot be negative.`;
  return null;
}

// ── Login Form ───────────────────────────────────────────────────

export function validateLoginForm(email: string, password: string): ValidationResult {
  const errors: Record<string, string> = {};
  
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  
  if (!password) errors.password = "Password is required.";
  
  return { valid: Object.keys(errors).length === 0, errors };
}

// ── Signup Form ──────────────────────────────────────────────────

export function validateSignupForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationResult {
  const errors: Record<string, string> = {};
  
  const nameErr = validateName(name);
  if (nameErr) errors.name = nameErr;
  
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  
  const passwordErr = validatePassword(password);
  if (passwordErr) errors.password = passwordErr;
  
  const confirmErr = validatePasswordConfirm(password, confirmPassword);
  if (confirmErr) errors.confirmPassword = confirmErr;
  
  return { valid: Object.keys(errors).length === 0, errors };
}

// ── Berth Form ───────────────────────────────────────────────────

export function validateBerthForm(
  name: string,
  length: number,
  draft: number,
  price: number,
  t: (key: string) => string
): ValidationResult {
  const errors: Record<string, string> = {};
  
  const nameErr = validateBerthName(name);
  if (nameErr) errors.name = nameErr;
  
  const lengthErr = validatePositiveNumber(length, t("lengthLabel"));
  if (lengthErr) errors.length = lengthErr;

  const draftErr = validatePositiveNumber(draft, t("draftLabel"));
  if (draftErr) errors.draft = draftErr;

  const priceErr = validateNonNegativeNumber(price, t("priceLabel"));
  if (priceErr) errors.price = priceErr;
  
  return { valid: Object.keys(errors).length === 0, errors };
}
