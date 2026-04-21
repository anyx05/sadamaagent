import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword, validateBerthName } from '@/lib/validations'

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should return null for valid email', () => {
      expect(validateEmail('test@example.com')).toBeNull()
    })

    it('should return error for invalid email', () => {
      expect(validateEmail('invalid-email')).toBe('Please enter a valid email address.')
    })
  })

  describe('validatePassword', () => {
    it('should return null for strong password', () => {
      expect(validatePassword('StrongPass123')).toBeNull()
    })

    it('should return error for short password', () => {
      expect(validatePassword('Short1')).toBe('Password must be at least 8 characters.')
    })
  })

  describe('validateBerthName', () => {
    it('should return null for valid berth name', () => {
      expect(validateBerthName('Berth A1')).toBeNull()
    })

    it('should return error if name is missing', () => {
      expect(validateBerthName('  ')).toBe('Berth name is required.')
    })
  })
})
