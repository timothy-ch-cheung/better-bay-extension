import axios from "axios"
import type { BetterBayItem } from "better-bay-common"
import React, { useState } from "react"

import { toTestId } from "../util/id"
import Spinner from "./spinner"

export interface TooltipProps {
  itemId: string
}

function createTooltipText(item: BetterBayItem): string {
  let descriptionText = ""
  for (const [key, value] of Object.entries(item.description)) {
    descriptionText += `${key}: ${value}\n`
  }
  return `${item.price}\n` + descriptionText
}

export default function Tooltip(props: TooltipProps): React.ReactElement {
  const [fetched, setFetched] = useState(false)
  const [tooltipContent, setTooltipContent] = useState(<Spinner />)
  const handleTooltipHover = (): void => {
    if (!fetched) {
      axios
        .get(
          `https://better-bay-api.onrender.com/v1/items/cheapest?ids=${props.itemId}`
        )
        .then((response) => {
          setTooltipContent(
            <div className="whitespace-pre-line">
              {createTooltipText(response.data[props.itemId])}
            </div>
          )
          setFetched(true)
        })
        .catch((error: Error) => {
          console.log(`Failed to get cheapest item [${error.message}]`)
        })
    }
  }
  const tooltipId = "tooltip-text-" + props.itemId

  return (
    <>
      <button
        data-tooltip-target={tooltipId}
        type="button"
        data-tooltip-placement="bottom"
        className="px-0.5 py-1 text-white hover:bg-slate-300 focus:outline-none rounded-lg text-center"
        onMouseOver={handleTooltipHover}
        data-test={`${toTestId(props.itemId)}-bb-tooltip`}>
        🏷️
      </button>
      <div
        id={tooltipId}
        role="tooltip"
        className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
        {tooltipContent}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </>
  )
}
