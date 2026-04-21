import { Page, expect } from '@playwright/test'

export class BasePage {
  constructor(public readonly page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url)
  }

  async getTitle() {
    return this.page.title()
  }

  async waitForUrl(urlOrPredicate: string | RegExp | ((url: URL) => boolean)) {
    await this.page.waitForURL(urlOrPredicate)
  }

  async expectVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible()
  }

  async clickElement(selector: string) {
    await this.page.locator(selector).click()
  }

  async fillInput(selector: string, text: string) {
    await this.page.locator(selector).fill(text)
  }
}
