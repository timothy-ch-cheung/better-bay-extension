import React from "react"

import "../styles.css"

import { Collapse } from "react-collapse"

import { useStorage } from "@plasmohq/storage/hook"

import Toggle from "./components/toggle"
import {
  BETA_ENABLED,
  BETTER_BAY_ENABLED,
  FALSE,
  GREY_LISTINGS_ENABLED,
  HIDE_LISTINGS_ENABLED,
  TRUE
} from "./util/constants"

function initStorage(
  name: string
): readonly [any, (setter: any) => Promise<void>, any] {
  return useStorage(name, async (v) => {
    return v === undefined ? FALSE : v
  })
}

function IndexPopup(): React.ReactElement {
  const [betterBayEnabled, setBetterBayEnabled] =
    initStorage(BETTER_BAY_ENABLED)
  const [betaEnabled, setBetaEnabled] = initStorage(BETA_ENABLED)
  const [greyListingsEnabled, setGreyListingsEnabled] = initStorage(
    GREY_LISTINGS_ENABLED
  )
  const [hideListingsEnabled, setHideListingsEnabled] = initStorage(
    HIDE_LISTINGS_ENABLED
  )

  const handleOnEnabledChange = (): void => {
    setBetterBayEnabled(betterBayEnabled === FALSE ? TRUE : FALSE).catch(
      (error: Error) => {
        console.log(`Failed to set ${BETTER_BAY_ENABLED} [${error.message}]`)
      }
    )
  }

  const handleOnBetaChange = (): void => {
    setBetaEnabled(betaEnabled === FALSE ? TRUE : FALSE).catch(
      (error: Error) => {
        console.log(`Failed to set ${BETA_ENABLED} [${error.message}]`)
      }
    )
  }

  const handleOnGreyChange = (): void => {
    if (greyListingsEnabled === FALSE) {
      setHideListingsEnabled(FALSE).catch((error: Error) => {
        console.log(`Failed to set ${HIDE_LISTINGS_ENABLED} [${error.message}]`)
      })
    }
    setGreyListingsEnabled(greyListingsEnabled === FALSE ? TRUE : FALSE).catch(
      (error: Error) => {
        console.log(`Failed to set ${GREY_LISTINGS_ENABLED} [${error.message}]`)
      }
    )
  }

  const handleOnHideChange = (): void => {
    if (hideListingsEnabled === FALSE) {
      setGreyListingsEnabled(FALSE).catch((error: Error) => {
        console.log(`Failed to set ${GREY_LISTINGS_ENABLED} [${error.message}]`)
      })
    }
    setHideListingsEnabled(hideListingsEnabled === FALSE ? TRUE : FALSE).catch(
      (error: Error) => {
        console.log(`Failed to set ${HIDE_LISTINGS_ENABLED} [${error.message}]`)
      }
    )
  }

  return (
    <div
      className="object-center"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: "240px"
      }}>
      <div>
        <img src={require("../assets/icon.png")} className="mx-auto" />
        <h1 className="text-center font-bold text-base">Better Bay</h1>
      </div>
      <hr className="my-2" />
      <Toggle
        label="Enabled"
        enabled={betterBayEnabled === TRUE}
        onChange={handleOnEnabledChange}
      />
      <hr className="my-2" />
      <Toggle
        label="Beta Features"
        enabled={betaEnabled === TRUE}
        onChange={handleOnBetaChange}
      />
      <Collapse isOpened={betaEnabled === TRUE}>
        <Toggle
          label="Grey unrelated listings"
          enabled={greyListingsEnabled === TRUE}
          onChange={handleOnGreyChange}
        />
        <Toggle
          label="Hide unrelated listings"
          enabled={hideListingsEnabled === TRUE}
          onChange={handleOnHideChange}
        />
      </Collapse>
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
