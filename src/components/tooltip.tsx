import { useState } from "react"
import axios from 'axios';

export interface TooltipProps {
    itemId: string
}

export default function (props: TooltipProps) {
    const [fetched, setFetched] = useState(false)
    const handleTooltipHover = () => {
        if (!fetched) {
            axios.get(`https://better-bay-api.onrender.com/v1/items/cheapest?ids=${props.itemId}`)
        }
    }

    return <div className="px-0.5" onMouseOver={handleTooltipHover}>
        🏷️
    </div>
}