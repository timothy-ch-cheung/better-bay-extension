import type { PlasmoContentScript } from "plasmo"
import * as ReactDOM from "react-dom"

import Tooltip from "./components/tooltip"

import "../styles.css"

import { Storage } from "@plasmohq/storage"

import "flowbite"

import React from "react"

export const config: PlasmoContentScript = {
  matches: ["https://www.ebay.co.uk/sch/*"]
}

const itemRegex = /(?<=\/itm\/)\d+(?=\?)/

const storage = new Storage()

function getItemIdFromElement(element): string {
  const link: string = element.getElementsByClassName("s-item__link")[0].href
  const itemId: RegExpMatchArray | null = link.match(itemRegex)
  if (itemId != null) {
    return itemId[0]
  } else {
    console.log("Unable to extract item id from: " + link)
    return ""
  }
}

function addInfoButton(results): Element[] {
  const items = Array.from(results.getElementsByClassName("s-item"))
  return items.map(function (item: HTMLElement) {
    const price = item.getElementsByClassName("s-item__price")[0]
    if (price.childElementCount > 0) {
      const wrapper = document.createElement("div")
      wrapper.classList.add("inline-block")
      price.appendChild(wrapper)
      ReactDOM.render(<Tooltip itemId={getItemIdFromElement(item)} />, wrapper)
    }
    return price
  })
}

storage
  .get("betterBayEnabled")
  .then((betterBayEnabled) => {
    if (betterBayEnabled != null) {
      const searchResults = document.getElementsByClassName("srp-results")[0]
      console.log("Enhancing Page...")
      addInfoButton(searchResults)
    }
  })
  .catch((error: Error) => {
    console.log(`Failed to enhance page [${error.message}]`)
  })
