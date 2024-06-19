export default class InvalidOperandError extends Error {
  constructor(message: string) {
    super(`Invalid operand: ${message}`);
    this.name = "InvalidOperandError";
  }
}
