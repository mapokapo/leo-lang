import type OperationDefinition from "../types/OperationDefinition";

/**
 * `stop` operation - stop execution
 *
 * Stops the program execution.
 *
 * Arguments:
 * - None
 *
 * Flags affected:
 * - None
 *
 * Examples:
 * stop % Stop the program execution.
 */
export const stopOperation: OperationDefinition = {
  opcode: "stop",
  args: [],
  execute: (machine, _) => {
    machine.stop();
  },
};
