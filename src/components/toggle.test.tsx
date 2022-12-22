import { describe, expect, test } from "@jest/globals"
import { render } from "@testing-library/react"

import Toggle from "./toggle"

describe("Toggle", () => {
  test("Snapshot", () => {
    const tree = render(
      <Toggle label="Test Toggle" enabled={true} onClick={jest.fn()} />
    )
    expect(tree).toMatchSnapshot()
  })
})
