import axios from "axios"
import React from "react"
import { useState } from "react"

import Spinner from "./spinner"

export interface TooltipProps {
  itemId: string
}

function createTooltipText(item): string {
  let descriptionText = ""
  for (const [key, value] of Object.entries(item.description)) {
    descriptionText += `${key}: ${value}\n`
  }
  return `${item.price}\n` + descriptionText
}

export default function (props: TooltipProps) {
  const [fetched, setFetched] = useState(false)
  const [tooltipContent, setTooltipContent] = useState(<Spinner />)
  const handleTooltipHover = () => {
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
        onMouseOver={handleTooltipHover}>
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
