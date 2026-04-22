import { test, expect } from '@playwright/test'
import { testLogger } from '../helpers/logger'

test.describe('Authentication Flows @auth @smoke', () => {
  const email = process.env.TEST_USER_EMAIL!
  const password = process.env.TEST_USER_PASSWORD!

  test.beforeEach(async ({ page }) => {
    await page.goto('/en/login')
  })

  test('should login successfully with valid credentials', async ({ page }) => {
    testLogger.log('Auth Flow', 'Testing valid login')
    await page.getByPlaceholder('captain@maritime.ee').fill(email)
    await page.getByPlaceholder('Enter your password').fill(password)
    await page.getByRole('button', { name: /sign in|authenticating/i }).click()

    await expect(page).toHaveURL(/\/en\/dashboard/)
    // Verify dashboard element
    await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible()
  })

  test('should show error with invalid credentials', async ({ page }) => {
    testLogger.log('Auth Flow', 'Testing invalid login')
    await page.getByPlaceholder('captain@maritime.ee').fill(email)
    await page.getByPlaceholder('Enter your password').fill('wrongpassword123')
    await page.getByRole('button', { name: /sign in|authenticating/i }).click()

    // Assuming the error toast appears with "Invalid login credentials"
    await expect(page.getByText(/invalid|error/i)).toBeVisible()
    await expect(page).not.toHaveURL(/\/en\/dashboard/)
  })

  test('should logout successfully from dashboard', async ({ page }) => {
    testLogger.log('Auth Flow', 'Testing logout')
    // Log in first
    await page.getByPlaceholder('captain@maritime.ee').fill(email)
    await page.getByPlaceholder('Enter your password').fill(password)
    await page.getByRole('button', { name: /sign in|authenticating/i }).click()
    await page.waitForURL(/\/en\/dashboard/)

    // Click Sign Out
    await page.getByRole('button', { name: /sign out/i }).click()

    // Should redirect to login or landing page
    await expect(page).toHaveURL(/\/en\/login/)
    // Verify auth session is actually destroyed by trying to go to dashboard again
    await page.goto('/en/dashboard')
    await expect(page).toHaveURL(/\/en\/login/)
  })
})
