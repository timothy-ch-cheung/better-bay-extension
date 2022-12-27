import React from "react"

import "../styles.css"

import { useStorage } from "@plasmohq/storage/hook"

import Toggle from "./components/toggle"
import { BETTER_BAY_ENABLED, FALSE, TRUE } from "./util/constants"

function IndexPopup(): React.ReactElement {
  const [betterBayEnabled, setBetterBayEnabled] = useStorage(
    BETTER_BAY_ENABLED,
    async (v) => {
      return v === undefined ? FALSE : v
    }
  )

  const handleOnChange = (): void => {
    setBetterBayEnabled(betterBayEnabled === FALSE ? TRUE : FALSE).catch(
      (error: Error) => {
        console.log(`Failed to set ${BETTER_BAY_ENABLED} [${error.message}]`)
      }
    )
  }

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
      <Toggle
        label="Enabled"
        enabled={betterBayEnabled === TRUE}
        onChange={handleOnChange}
      />
      <hr className="my-2" />
      <a
        href="https://github.com/timothy-ch-cheung/better-bay-extension"
        target="_blank"
        rel="noreferrer"
        data-test="docs-link">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
