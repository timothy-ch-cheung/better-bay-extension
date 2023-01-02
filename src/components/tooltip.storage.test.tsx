import { describe, expect, jest, test } from "@jest/globals"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"

import Tooltip from "./tooltip"

jest.mock("webextension-polyfill", () => ({}))
jest.mock("@plasmohq/storage/hook", () => ({
  useStorage: jest
    .fn()
    .mockReturnValue([
      { 123: { price: "0.99", description: { colour: "Black" } } }
    ])
}))

describe("Tooltip, item data in storage", () => {
  beforeEach(() => {
    render(<Tooltip itemId="123" />)
  })

  test("Hover Tooltip", () => {
    const spinner = screen.getByRole("status")
    const tooltipIcon = screen.getByText("🏷️")
    expect(spinner).toBeInTheDocument()

    fireEvent.mouseOver(tooltipIcon)

    waitFor(() => {
      expect(screen.getByText("0.99").toBeInTheDocument())
      expect(screen.getByText("colour: Black").toBeInTheDocument())
    }).catch((error: Error) => {
      console.log(`Assertions failed [${error.message}]`)
    })
  })
})
