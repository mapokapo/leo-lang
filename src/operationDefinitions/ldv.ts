import type OperationDefinition from "../types/OperationDefinition";
import type { Register } from "../types/Register";

/**
 * `ldv` operation - load value
 *
 * Loads an immediate value or the value of another register into a register.
 *
 * Arguments:
 * - destination: The register to load the value into.
 * - source: The value to load into the register.
 *
 * Flags affected:
 * - None
 *
 * Examples:
 * ldv r0 #10 % Load the value 10 into register 0.
 */
export const ldvOperation: OperationDefinition = {
  opcode: "ldv",
  args: [
    {
      name: "destination",
      acceptedTypes: ["register"],
    },
    {
      name: "source",
      acceptedTypes: ["value", "register"],
    },
  ],
  execute: (machine, operands) => {
    let value = 0;

    if (operands[1].type === "register") {
      value = machine.getRegister(operands[1].value);
    } else {
      value = operands[1].value as number;
    }

    machine.setRegister(operands[0].value as Register, value);
  },
};
