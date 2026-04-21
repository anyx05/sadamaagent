import { Page, expect } from '@playwright/test'
import { BasePage } from './base-page'

export class DashboardPage extends BasePage {
  // Locators
  readonly headerTitle = this.page.locator('h1')
  readonly statsCards = this.page.locator('.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 > div')
  readonly bookingsTable = this.page.locator('table') // Assuming a standard table is rendered by BookingsTable
  readonly activityFeed = this.page.locator('.lg\\:col-span-1') // Targeting the column for ActivityFeed

  constructor(page: Page) {
    super(page)
  }

  async goto() {
    // English locale for testing
    await this.navigate('/en/dashboard')
    await this.waitForUrl(/\/en\/dashboard/)
  }

  async expectStatsCardsVisible(expectedCount: number = 4) {
    await expect(this.statsCards).toHaveCount(expectedCount)
    // Ensure at least the first one is visible
    await expect(this.statsCards.first()).toBeVisible()
  }

  async expectBookingsTableVisible() {
    // Wait for network requests or loading state to finish
    await expect(this.bookingsTable.first()).toBeVisible({ timeout: 10000 })
  }
}
