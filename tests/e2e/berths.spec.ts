import { test, expect } from '@playwright/test'
import { testLogger } from '../helpers/logger'
import { loginWithTestUser } from '../helpers/auth'
import { BerthsPage } from '../helpers/berths-page'

test.describe('Berths Management @berths @regression', () => {
  let berthsPage: BerthsPage
  // Use a unique name for the test berth so it doesn't conflict
  const testBerthName = `Test Berth ${Date.now()}`
  const updatedBerthName = `${testBerthName} Updated`

  test.beforeEach(async ({ page }) => {
    await loginWithTestUser(page)
    berthsPage = new BerthsPage(page)
    await berthsPage.navigate()
  })

  test('should create, update, and delete a berth', async ({ page }) => {
    testLogger.log('Berths', 'Starting full CRUD lifecycle test for berths')

    // 1. Create
    await berthsPage.clickAddNewBerth()
    // The default name is "New Berth". We should find it and rename it so we can track it.
    await berthsPage.editBerth('New Berth', testBerthName, '75')
    
    // Verify it exists with the new name
    const newRow = await berthsPage.getBerthRowByName(testBerthName)
    await expect(newRow).toBeVisible()
    await expect(newRow).toContainText('€75')

    // 2. Update
    await berthsPage.editBerth(testBerthName, updatedBerthName, '120')
    
    const updatedRow = await berthsPage.getBerthRowByName(updatedBerthName)
    await expect(updatedRow).toBeVisible()
    await expect(updatedRow).toContainText('€120')

    // 3. Delete
    await berthsPage.deleteBerth(updatedBerthName)
    
    // Verify it's gone
    const deletedRow = await berthsPage.getBerthRowByName(updatedBerthName)
    await expect(deletedRow).not.toBeVisible()
  })
})
