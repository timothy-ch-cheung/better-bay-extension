import { NightwatchTests } from "nightwatch"

const BetterBayPopup: NightwatchTests = {
  beforeEach: function (browser) {
    browser.navigateTo(
      `chrome-extension://${browser.globals.extension_id}/popup.html`
    )
  },

  "Should go to github page": async function (browser) {
    await browser
      .waitForElementVisible("a[data-test='docs-link']")
      .click("a[data-test='docs-link']")

    const result = await browser.windowHandles()
    const handle = result[1]
    await browser
      .switchToWindow(handle)
      .assert.urlEquals(
        "https://github.com/timothy-ch-cheung/better-bay-extension"
      )
      .closeWindow()
      .end()
  },

  "Should control enabled toggle": async function (browser) {
    await browser
      .waitForElementVisible("label[data-test='enabled-toggle']")
      .assert.attributeEquals(
        "input[data-test='enabled-toggle']",
        "checked",
        "false"
      )
      .click("label[data-test='enabled-toggle']")
      .assert.attributeEquals(
        "input[data-test='enabled-toggle']",
        "checked",
        "true"
      )
      .click("label[data-test='enabled-toggle']")
      .assert.attributeEquals(
        "input[data-test='enabled-toggle']",
        "checked",
        "false"
      )
      .end()
  }
}

export default BetterBayPopup
