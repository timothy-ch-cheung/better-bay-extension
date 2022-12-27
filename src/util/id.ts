export function toTestId(id: string): string {
  return id.toLowerCase().replace(" ", "-")
}
