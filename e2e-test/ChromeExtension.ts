import { NightwatchTests } from "nightwatch"

const ChromeExtension: NightwatchTests = {
  "Go to Chrome extension page": async function (browser) {
    await browser
      .navigateTo("chrome://system/")
      .pause(5000)
      .saveScreenshot("./screens/extensions.png")
  }
}

export default ChromeExtension
