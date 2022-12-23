export {}
chrome.alarms.create("healthcheck", {
  periodInMinutes: 15
})

chrome.alarms.onAlarm.addListener(function () {
  fetch("https://better-bay-api.onrender.com/v1/healthcheck")
    .then(async (response) => response.json())
    .then((data) => console.log(data))
    .catch((error: Error) => {
      console.log(`Failed to call healthcheck [${error.message}]`)
    })
})
