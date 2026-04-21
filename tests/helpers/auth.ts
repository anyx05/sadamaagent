import { Page, expect } from '@playwright/test'

/**
 * Performs a UI login using the test user credentials defined in .env.test
 */
export async function loginWithTestUser(page: Page) {
  const email = process.env.TEST_USER_EMAIL
  const password = process.env.TEST_USER_PASSWORD

  if (!email || !password) {
    throw new Error('TEST_USER_EMAIL and TEST_USER_PASSWORD must be defined in .env.test')
  }

  // Navigate to login page
  await page.goto('/en/login')

  // Wait for the form to be ready
  await expect(page.locator('#email')).toBeVisible()

  // Fill in credentials
  await page.locator('#email').fill(email)
  await page.locator('#password').fill(password)

  // Submit form
  await page.locator('button[type="submit"]').click()

  // Wait for successful navigation to the dashboard
  await page.waitForURL(/\/en\/dashboard/)
}
