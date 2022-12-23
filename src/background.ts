export {}
chrome.alarms.create("healthcheck", {
  periodInMinutes: 15
})

chrome.alarms.onAlarm.addListener(function () {
  fetch("https://better-bay-api.onrender.com/v1/healthcheck")
    .then((response) => response.json())
    .then((data) => console.log(data))
})
