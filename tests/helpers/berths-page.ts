import { Page, Locator } from '@playwright/test'
import { BasePage } from './base-page'

export class BerthsPage extends BasePage {
  readonly addNewBerthButton: Locator
  readonly berthsTable: Locator
  readonly berthRows: Locator
  readonly newBerthNameInput: Locator
  readonly berthLengthInput: Locator
  readonly berthDraftInput: Locator
  readonly berthPriceInput: Locator
  readonly saveEditButton: Locator
  readonly cancelEditButton: Locator

  constructor(page: Page) {
    super(page)
    this.addNewBerthButton = page.getByRole('button', { name: /add new/i })
    this.berthsTable = page.getByRole('table')
    this.berthRows = this.berthsTable.locator('tbody tr')
    // Inputs that appear during edit
    this.newBerthNameInput = page.locator('input[type="text"]').first()
    this.berthLengthInput = page.locator('input[type="number"]').nth(0)
    this.berthDraftInput = page.locator('input[type="number"]').nth(1)
    this.berthPriceInput = page.locator('input[type="number"]').nth(2)
    // Actions during edit
    this.saveEditButton = page.locator('.text-emerald-600').filter({ hasText: '' }) // Using the color class and check icon
    this.cancelEditButton = page.locator('.text-muted-foreground').locator('.lucide-x')
  }

  async navigate() {
    await this.page.goto('/en/dashboard/berths')
    await this.page.waitForLoadState('networkidle')
  }

  async clickAddNewBerth() {
    await this.addNewBerthButton.click()
  }

  async getBerthRowByName(name: string): Promise<Locator> {
    return this.berthRows.filter({ hasText: name }).first()
  }

  async editBerth(oldName: string, newName: string, newPrice: string) {
    const row = await this.getBerthRowByName(oldName)
    // Click edit pencil icon
    await row.locator('.lucide-pencil').click()
    
    // Fill new values
    // Using page.locator because the inputs replace the text in the row
    await this.page.locator('input[type="text"]').fill(newName)
    // Assuming price is the 3rd number input (length, draft, price)
    const numberInputs = this.page.locator('input[type="number"]')
    await numberInputs.nth(2).fill(newPrice)

    // Save
    await this.page.locator('button').filter({ has: this.page.locator('.lucide-check') }).click()
  }

  async deleteBerth(name: string) {
    const row = await this.getBerthRowByName(name)
    
    // Listen for dialog to auto-accept it
    this.page.once('dialog', async dialog => {
      await dialog.accept()
    })
    
    // Click delete trash icon
    await row.locator('.lucide-trash-2').click()
  }
}
