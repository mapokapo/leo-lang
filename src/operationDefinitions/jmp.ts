import type OperationDefinition from "../types/OperationDefinition";

/**
 * `jmp` operation - unconditional jump
 *
 * Resumes program execution at the specified label.
 *
 * Arguments:
 * - location: The label to jump to.
 *
 * Flags affected:
 * - None
 *
 * Examples:
 * jmp @a % Jump to a label named "a".
 */
export const jmpOperation: OperationDefinition = {
  opcode: "jmp",
  args: [
    {
      name: "location",
      acceptedTypes: ["label"],
    },
  ],
  execute: (machine, operands) => {
    machine.jumpToLabel(operands[0].value as string);
  },
};
