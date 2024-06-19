import type OperationDefinition from "../types/OperationDefinition";
import type { Register } from "../types/Register";

/**
 * `lda` operation - load from address
 *
 * Loads a value from a memory address into a register.
 *
 * Arguments:
 * - destination: The register to load the value into.
 * - source: The memory address to load the value from.
 *
 * Flags affected:
 * - None
 *
 * Examples:
 * lda r0 10 % Load the value at memory address 10 into register 0.
 */
export const ldaOperation: OperationDefinition = {
  opcode: "ldv",
  args: [
    {
      name: "destination",
      acceptedTypes: ["register"],
    },
    {
      name: "source",
      acceptedTypes: ["address"],
    },
  ],
  execute: (machine, operands) => {
    const address = operands[1].value as number;
    const value = machine.getMemory(address);
    const resultRegister = operands[0].value as Register;

    machine.setRegister(resultRegister, value);
  },
};
