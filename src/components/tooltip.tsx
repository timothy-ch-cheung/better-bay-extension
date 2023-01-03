import axios from "axios"
import type { BetterBayItemResponse } from "better-bay-common"
import React, { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { BETTER_BAY_ITEMS } from "../util/constants"
import { toTestId } from "../util/id"
import Spinner from "./spinner"

export interface TooltipProps {
  itemId: string
}

function createTooltipText(item: BetterBayItemResponse): string {
  let descriptionText = ""
  for (const [key, value] of Object.entries(item.description)) {
    descriptionText += `${key}: ${value}\n`
  }
  return `${item.price}\n` + descriptionText
}

export default function Tooltip(props: TooltipProps): React.ReactElement {
  const [items] = useStorage(BETTER_BAY_ITEMS)
  const [fetched, setFetched] = useState(false)
  const [tooltipContent, setTooltipContent] = useState(<Spinner />)

  const updateTooltip = (betterBayItem: BetterBayItemResponse): void => {
    setTooltipContent(
      <div className="whitespace-pre-line">
        {createTooltipText(betterBayItem)}
      </div>
    )
    setFetched(true)
  }

  const handleTooltipHover = (): void => {
    if (fetched) {
      return
    }
    const item = items[props.itemId]
    if (item !== undefined) {
      updateTooltip(item)
    } else {
      axios
        .get(
          `https://better-bay-api.onrender.com/v1/items/cheapest?ids=${props.itemId}`
        )
        .then((response) => updateTooltip(response.data[props.itemId]))
        .catch((error: Error) => {
          console.log(`Failed to get cheapest item [${error.message}]`)
        })
    }
  }

  const tooltipId = "bb-tooltip-text-" + props.itemId

  return (
    <>
      <button
        data-tooltip-target={tooltipId}
        type="button"
        data-tooltip-placement="bottom"
        className="px-0.5 py-1 text-white hover:bg-slate-300 focus:outline-none rounded-lg text-center"
        onMouseOver={handleTooltipHover}
        data-test={`bb-tooltip-${toTestId(props.itemId)}`}>
        🏷️
      </button>
      <div
        id={tooltipId}
        role="tooltip"
        className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
        data-test={tooltipId}>
        {tooltipContent}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </>
  )
}
