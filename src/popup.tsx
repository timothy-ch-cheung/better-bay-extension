import { useEffect, useState } from "react"

import "../styles.css"

import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import Toggle from "./components/toggle"

function IndexPopup() {
  const [betterBayEnabled, setBetterBayEnabled] = useStorage(
    "betterBayEnabled",
    async (v) => (v === undefined ? false : v)
  )

  const handleOnClick = () => {
    console.log(!betterBayEnabled)
    setBetterBayEnabled(!betterBayEnabled)
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
        enabled={betterBayEnabled}
        onClick={handleOnClick}
      />
      <hr className="my-2" />
      <a
        href="https://github.com/timothy-ch-cheung/better-bay-extension"
        target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
