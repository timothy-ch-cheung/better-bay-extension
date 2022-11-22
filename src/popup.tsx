import { useState } from "react"
import "../styles.css"
import Toggle from "./components/toggle"

function IndexPopup() {
  const [betterBayEnabld, set] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <div>
        <img src={require("../assets/icon.png")} />
        <h1 className="text-center font-bold text-base">Better Bay</h1>
      </div>
      <hr className="my-2" />
      <Toggle label="Enabled" enabled={true} />
      <hr className="my-2" />
      <a href="https://github.com/timothy-ch-cheung/better-bay-extension" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
