import type { PlasmoContentScript } from "plasmo"
import * as ReactDOM from 'react-dom';
import Tooltip from "./components/tooltip"
import "../styles.css"

export const config: PlasmoContentScript = {
    matches: ["https://www.ebay.co.uk/sch/*"]
}

const itemRegex = new RegExp(/(?<=\/itm\/)\d+(?=\?)/);

import { Storage } from "@plasmohq/storage"
import 'flowbite';

const storage = new Storage()

function getItemIdFromElement(element) {
    let link = element.getElementsByClassName("s-item__link")[0].href;
    let itemId = link.match(itemRegex);
    if (itemId) {
        return itemId[0];
    } else {
        console.log("Unable to extract item id from: " + link)
        return null;
    }
}

function addInfoButton(results) {
    let items = Array.from(results.getElementsByClassName("s-item"));
    return items.map(function (item: HTMLElement) {
        let price = item.getElementsByClassName("s-item__price")[0];
        if (price.childElementCount > 0) {
            let wrapper = document.createElement("div")
            wrapper.classList.add("inline-block")
            price.appendChild(wrapper)
            ReactDOM.render(<Tooltip itemId={getItemIdFromElement(item)} />, wrapper)
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