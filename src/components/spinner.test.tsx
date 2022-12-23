import { describe, expect, test } from "@jest/globals"
import { render } from "@testing-library/react"
import React from "react"

import Spinner from "./spinner"

describe("Spinner", () => {
  test("Snapshot", () => {
    const tree = render(<Spinner />)
    expect(tree).toMatchSnapshot()
  })
})
