export class IllegalStateError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "IllegalStateError"
  }
}