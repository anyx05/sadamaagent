import { test, expect } from '@playwright/test'
import { DashboardPage } from '../helpers/dashboard-page'
import { testLogger } from '../helpers/logger'
import { loginWithTestUser } from '../helpers/auth'

test.describe('Dashboard Page @dashboard @smoke', () => {
  let dashboardPage: DashboardPage

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page)
    await loginWithTestUser(page)
  })

  test('should load the dashboard and display correct components', async () => {
    testLogger.start('Dashboard Load Test')
    
    try {
      await dashboardPage.goto()
      
      // Verify Header
      await expect(dashboardPage.headerTitle).toBeVisible()
      
      // Verify Stats Cards
      await dashboardPage.expectStatsCardsVisible(4)

      // Verify main content areas
      await expect(dashboardPage.activityFeed).toBeVisible()
      
      testLogger.pass('Dashboard Load Test')
    } catch (error) {
      testLogger.fail('Dashboard Load Test', error)
      throw error
    }
  })
})
