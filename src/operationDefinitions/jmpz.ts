import type OperationDefinition from "../types/OperationDefinition";

/**
 * `jmpz` operation - jump if zero
 *
 * Resumes program execution at the specified label if the zero flag is set.
 *
 * Arguments:
 * - location: The label to jump to.
 *
 * Flags affected:
 * - None
 *
 * Examples:
 * jmpz @a % Jump to a label named "a" if the zero flag is set.
 */
export const jmpzOperation: OperationDefinition = {
  opcode: "jmpz",
  args: [
    {
      name: "location",
      acceptedTypes: ["label"],
    },
  ],
  execute: (machine, operands) => {
    if (machine.getFlag("zero")) {
      machine.jumpToLabel(operands[0].value as string);
    }
  },
};
