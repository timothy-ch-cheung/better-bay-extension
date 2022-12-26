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

    await browser.expect.element("button[data-test$='bb-tooltip']").to.not.be
      .present

    await browser.end()
  },

  "Should add tooltips when extension enabled": async function (browser) {
    await browser
      .click("label[data-test='enabled-toggle']")
      .navigateTo("https://www.ebay.co.uk/")
      .sendKeys(`#${SEARCH_BAR_ID}`, "chilli seeds\n")

    await browser.expect.element("button[data-test$='bb-tooltip']").to.be
      .visible

    await browser
      .navigateTo(
        `chrome-extension://${browser.globals.extension_id}/popup.html`
      )
      .click("label[data-test='enabled-toggle']")
      .end()
  }
}

export default BetterBayEnhance
