import type OperationDefinition from "../types/OperationDefinition";

/**
 * `jmpne` operation - jump if negative
 *
 * Resumes program execution at the specified label if the negative flag is set.
 *
 * Arguments:
 * - location: The label to jump to.
 *
 * Flags affected:
 * - None
 *
 * Examples:
 * jmpne @a % Jump to a label named "a" if the negative flag is set.
 */
export const jmpneOperation: OperationDefinition = {
  opcode: "jmpne",
  args: [
    {
      name: "location",
      acceptedTypes: ["label"],
    },
  ],
  execute: (machine, operands) => {
    if (machine.getFlag("negative")) {
      machine.jumpToLabel(operands[0].value as string);
    }
  },
};
