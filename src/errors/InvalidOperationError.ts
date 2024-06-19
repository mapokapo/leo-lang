export default class InvalidOperationError extends Error {
  constructor(operationName: string, reason: string) {
    super(`Invalid operation: ${operationName} (${reason})`);
    this.name = "InvalidOperationError";
  }
}
