import { describe, expect, jest, test } from "@jest/globals"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import axios from "axios"
import React from "react"

import Tooltip from "./tooltip"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

jest.mock("webextension-polyfill", () => ({}))
jest.mock("@plasmohq/storage/hook", () => ({
  useStorage: jest.fn().mockReturnValue([{}])
}))

describe("Tooltip", () => {
  let tooltip

  beforeEach(() => {
    tooltip = render(<Tooltip itemId="123" />)
  })

  test("Snapshot", () => {
    expect(tooltip).toMatchSnapshot()
  })

  test("Hover Tooltip - API call successful", async () => {
    const spinner = screen.getByRole("status")
    const tooltipIcon = screen.getByText("🏷️")
    expect(spinner).toBeInTheDocument()

    mockedAxios.get.mockResolvedValue({
      data: {
        123: { price: "0.99", description: { colour: "Black" } }
      }
    })
    fireEvent.mouseOver(tooltipIcon)

    waitFor(() => {
      expect(screen.getByText("0.99").toBeInTheDocument())
      expect(screen.getByText("colour: Black").toBeInTheDocument())
    }).catch((error: Error) => {
      console.log(`Assertions failed [${error.message}]`)
    })
  })

  test("Hover Tooltip - API call unsuccessful", async () => {
    const spinner = screen.getByRole("status")
    const tooltipIcon = screen.getByText("🏷️")
    expect(spinner).toBeInTheDocument()

    mockedAxios.get.mockRejectedValue(new Error("Failed to call API"))
    fireEvent.mouseOver(tooltipIcon)

    expect(spinner).toBeInTheDocument()
  })
})
