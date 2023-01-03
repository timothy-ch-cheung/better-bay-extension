import axios from "axios"
import type { PlasmoContentScript } from "plasmo"
import * as ReactDOM from "react-dom"

import Tooltip from "./components/tooltip"
import {
  BETA_ENABLED,
  BETTER_BAY_ENABLED,
  BETTER_BAY_ITEMS,
  GREY_LISTINGS_ENABLED,
  HIDE_LISTINGS_ENABLED,
  TRUE
} from "./util/constants"

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

function addInfoButton(items): Element[] {
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
  .get(BETTER_BAY_ITEMS)
  .then(async (betterBayItems) => {
    if (betterBayItems === undefined) {
      return storage.set(BETTER_BAY_ITEMS, {})
    }
  })
  .catch((error: Error) => {
    console.log(`Failed initialise item store [${error.message}]`)
  })

async function greyListings(items: HTMLElement[]): Promise<void> {
  items.map(async (item) => {
    const itemId = getItemIdFromElement(item)
    const response = await axios.get(
      `https://better-bay-api.onrender.com/v1/items/cheapest?ids=${itemId}&analyse=true`
    )
    if (response.data[itemId].isRelevant === false) {
      item.style.opacity = "0.2"
    }
  })
}

async function hideListings(items: HTMLElement[]): Promise<void> {
  items.map(async (item) => {
    const itemId = getItemIdFromElement(item)
    const response = await axios.get(
      `https://better-bay-api.onrender.com/v1/items/cheapest?ids=${itemId}&analyse=true`
    )
    if (response.data[itemId].isRelevant === false) {
      item.style.display = "none"
    }
  })
}

storage
  .get(BETTER_BAY_ENABLED)
  .then((betterBayEnabled) => {
    if (betterBayEnabled === TRUE) {
      const searchResults = document.getElementsByClassName("srp-results")[0]
      const items: HTMLElement[] = Array.from(
        searchResults.getElementsByClassName("s-item")
      ) as HTMLElement[]
      console.log("Enhancing Page...")
      addInfoButton(items)

      storage
        .get(BETA_ENABLED)
        .then(async (betaEnabled) => {
          const greyListingsEnabled = await storage.get(GREY_LISTINGS_ENABLED)
          const hideListingsEnabled = await storage.get(HIDE_LISTINGS_ENABLED)

          if (betaEnabled === TRUE && greyListingsEnabled === TRUE) {
            return greyListings(items)
          } else if (betaEnabled === TRUE && hideListingsEnabled === TRUE) {
            return hideListings(items)
          }
        })
        .catch((error: Error) => {
          console.log(`Failed to enhance page [${error.message}]`)
        })
    }
  })
  .catch((error: Error) => {
    console.log(`Failed to enhance page [${error.message}]`)
  })
