import { describe, expect, test } from "@jest/globals"
import { render } from "@testing-library/react"

import Tooltip from "./tooltip"

describe("Tooltip", () => {
  test("Snapshot", () => {
    const tree = render(<Tooltip itemId="123" />)
    expect(tree).toMatchSnapshot()
  })
})
