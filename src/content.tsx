import type { PlasmoContentScript } from "plasmo"
import * as ReactDOM from 'react-dom';
import Tooltip from "./components/tooltip"

export const config: PlasmoContentScript = {
    matches: ["https://www.ebay.co.uk/sch/*"]
}

const itemRegex = new RegExp(/(?<=\/itm\/)\d+(?=\?)/);

import { Storage } from "@plasmohq/storage"

const storage = new Storage()

function addInfoButton(results) {
    let items = Array.from(results.getElementsByClassName("s-item"));
    return items.map(function (item: HTMLElement) {
        let price = item.getElementsByClassName("s-item__price")[0];
        if (price.childElementCount > 0) {
            let wrapper = document.createElement("div")
            price.appendChild(wrapper)
            ReactDOM.render(<Tooltip />, wrapper)
        }
        return price;
    })
}

storage.get("betterBayEnabled").then(betterBayEnabled => {
    if (betterBayEnabled) {
        let searchResults = document.getElementsByClassName("srp-results")[0];
        console.log("Enhancing Page...")
        addInfoButton(searchResults);
    }
})