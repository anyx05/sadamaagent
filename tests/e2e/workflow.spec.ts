import { test, expect } from '@playwright/test'
import { testLogger } from '../helpers/logger'
import { DashboardPage } from '../helpers/dashboard-page'
import { BerthsPage } from '../helpers/berths-page'

test.describe('End-to-End User Journey @workflow @regression', () => {
  const email = process.env.TEST_USER_EMAIL!
  const password = process.env.TEST_USER_PASSWORD!
  const testBerthName = `Workflow Berth ${Date.now()}`
  const updatedBerthName = `${testBerthName} Updated`

  test('Complete platform workflow', async ({ page }) => {
    // We use a single continuous page context for the entire journey.
    testLogger.log('Workflow', 'Starting E2E Journey')
    
    const dashboardPage = new DashboardPage(page)
    const berthsPage = new BerthsPage(page)

    await test.step('1. Navigate to login and test incorrect credentials', async () => {
      testLogger.log('Workflow', 'Testing invalid login')
      await page.goto('/en/login')
      await page.getByPlaceholder('captain@maritime.ee').fill(email)
      await page.getByPlaceholder('Enter your password').fill('wrongpassword123')
      await page.getByRole('button', { name: /sign in|authenticating/i }).click()

      // Should show an error and not redirect
      await expect(page.getByText(/invalid|error/i)).toBeVisible()
      await expect(page).not.toHaveURL(/\/en\/dashboard/)
    })

    await test.step('2. Login with correct credentials', async () => {
      testLogger.log('Workflow', 'Testing valid login')
      await page.getByPlaceholder('Enter your password').fill('') // Clear previous
      await page.getByPlaceholder('Enter your password').fill(password)
      await page.getByRole('button', { name: /sign in|authenticating/i }).click()

      await expect(page).toHaveURL(/\/en\/dashboard/)
      await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible()
    })

    await test.step('3. Test Dashboard Components', async () => {
      testLogger.log('Workflow', 'Verifying Dashboard')
      await expect(dashboardPage.headerTitle).toBeVisible()
      await dashboardPage.expectStatsCardsVisible(4)
      await expect(dashboardPage.activityFeed).toBeVisible()
    })

    await test.step('4. CRUD for Berth', async () => {
      testLogger.log('Workflow', 'Testing Berth CRUD')
      await berthsPage.navigate()
      
      // Create
      await berthsPage.clickAddNewBerth()
      await berthsPage.editBerth('New Berth', testBerthName, '75')
      
      const newRow = await berthsPage.getBerthRowByName(testBerthName)
      await expect(newRow).toBeVisible()
      await expect(newRow).toContainText('€75')

      // Update
      await berthsPage.editBerth(testBerthName, updatedBerthName, '120')
      
      const updatedRow = await berthsPage.getBerthRowByName(updatedBerthName)
      await expect(updatedRow).toBeVisible()
      await expect(updatedRow).toContainText('€120')

      // Delete
      await berthsPage.deleteBerth(updatedBerthName)
      
      const deletedRow = await berthsPage.getBerthRowByName(updatedBerthName)
      await expect(deletedRow).not.toBeVisible()
    })

    await test.step('5. Logout test', async () => {
      testLogger.log('Workflow', 'Testing logout')
      // Wait for network/DOM to settle before clicking sign out to avoid lock issues
      await page.waitForTimeout(500)
      await page.getByRole('button', { name: /sign out/i }).click()

      // Verify redirect to login
      await expect(page).toHaveURL(/\/en\/login/)

      // Verify auth session is actually destroyed by trying to go to dashboard again
      await page.goto('/en/dashboard')
      await expect(page).toHaveURL(/\/en\/login/)
      
      testLogger.log('Workflow', 'E2E Journey Completed Successfully')
    })
  })
})
