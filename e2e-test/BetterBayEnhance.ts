import { NightwatchTests } from "nightwatch"

const SEARCH_BAR_ARIA_LABEL = "Search for anything"
const SORT_BUTTON_ARIA_LABEL = "Sort selector"
const FIRST_CHILLI_TOOLTIP = "bb-tooltip-224840305405"
const FIRST_CHILLI_TOOLTIP_TEXT = "bb-tooltip-text-224840305405"

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
      .sendKeys(
        `input[aria-label*='${SEARCH_BAR_ARIA_LABEL}']`,
        "chilli seeds\n"
      )

    await browser.expect.element("button[data-test^='bb-tooltip']").to.not.be
      .present

    await browser.end()
  },

  "Should add tooltips when extension enabled": async function (browser) {
    await browser
      .click("label[data-test='enabled-toggle']")
      .navigateTo("https://www.ebay.co.uk/")
      .sendKeys(
        `input[aria-label*='${SEARCH_BAR_ARIA_LABEL}']`,
        "chilli seeds\n"
      )
      .click(`button[aria-label*='${SORT_BUTTON_ARIA_LABEL}']`)
      .click("link text", "Lowest price + P&P")

    await browser.expect.element("button[data-test^='bb-tooltip']").to.be
      .visible

    await browser
      .saveScreenshot("./screens/test.png")
      .waitForElementVisible(`button[data-test='${FIRST_CHILLI_TOOLTIP}']`)
      .moveToElement(`button[data-test='${FIRST_CHILLI_TOOLTIP}']`, 5, 5)
      .assert.textContains(
        `div[data-test='${FIRST_CHILLI_TOOLTIP_TEXT}']`,
        "1.18"
      )
      .assert.textContains(
        `div[data-test='${FIRST_CHILLI_TOOLTIP_TEXT}']`,
        'Pepper Type: 10 x 4" Seed Labels'
      )

    await browser
      .navigateTo(
        `chrome-extension://${browser.globals.extension_id}/popup.html`
      )
      .click("label[data-test='enabled-toggle']")
      .end()
  }
}

export default BetterBayEnhance
