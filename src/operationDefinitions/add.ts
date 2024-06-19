import type OperationDefinition from "../types/OperationDefinition";
import type { Register } from "../types/Register";

/**
 * `add` operation - adds two values together
 *
 * Adds any combination of registers and immediate values together and stores the result in a register.
 *
 * Arguments:
 * - result: The register to store the result in.
 * - a: The first value to add.
 * - b: The second value to add.
 *
 * Flags affected:
 * - None
 *
 * Examples:
 * add r0 r1 r2 % Add the values in registers 1 and 2 together and store the result in register 0.
 */
export const addOperation: OperationDefinition = {
  opcode: "add",
  args: [
    {
      name: "result",
      acceptedTypes: ["register"],
    },
    {
      name: "a",
      acceptedTypes: ["register", "value"],
    },
    {
      name: "b",
      acceptedTypes: ["register", "value"],
    },
  ],
  execute: (machine, operands) => {
    let aValue = 0;
    let bValue = 0;

    if (operands[1].type === "register") {
      aValue = machine.getRegister(operands[1].value);
    } else {
      aValue = operands[1].value as number;
    }

    if (operands[2].type === "register") {
      bValue = machine.getRegister(operands[2].value);
    } else {
      bValue = operands[2].value as number;
    }

    const resultRegister = operands[0].value as Register;

    machine.setRegister(resultRegister, aValue + bValue);
  },
};
