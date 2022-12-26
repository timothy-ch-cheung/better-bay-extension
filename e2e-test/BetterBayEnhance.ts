import { NightwatchTests } from "nightwatch"

const SEARCH_BAR_ID = "gh-ac"

const BetterBayEnhance: NightwatchTests = {
  beforeEach: function (browser) {
    browser
      .navigateTo(
        `chrome-extension://${browser.globals.extension_id}/popup.html`
      )
      .assert.not.selected(
        "input[data-test='enabled-toggle']",
        "Extension state has not been reset after test"
      )
  },

  "Should not add tooltips when extension disabled": async function (browser) {
    await browser
      .navigateTo("https://www.ebay.co.uk/")
      .sendKeys(`#${SEARCH_BAR_ID}`, "chilli seeds\n")
      .not.isVisible("button[id$='bb-tooltip']")
  },

  "Should add tooltips when extension enabled": async function (browser) {
    await browser
      .click("label[data-test='enabled-toggle']")
      .navigateTo("https://www.ebay.co.uk/")
      .sendKeys(`#${SEARCH_BAR_ID}`, "chilli seeds\n")
      .isVisible("button[id$='bb-tooltip']")
      .navigateTo(
        `chrome-extension://${browser.globals.extension_id}/popup.html`
      )
      .click("label[data-test='enabled-toggle']")
  }
}

export default BetterBayEnhance
