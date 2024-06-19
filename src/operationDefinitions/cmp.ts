import type OperationDefinition from "../types/OperationDefinition";
import type { Register } from "../types/Register";

/**
 * `cmp` operation - compare values
 *
 * Compares two values and sets flags based on the result.
 *
 * Arguments:
 * - operand: The register to compare the value of.
 * - comparator: The value or register to compare the operand to.
 *
 * Flags affected:
 * - zero: Set if the values are equal.
 * - negative: Set if the operand is less than the comparator.
 *
 * Examples:
 * cmp r0 r1 % Compare the value in register 0 to the value in register 1.
 */
export const cmpOperation: OperationDefinition = {
  opcode: "cmp",
  args: [
    {
      name: "operand",
      acceptedTypes: ["register"],
    },
    {
      name: "comparator",
      acceptedTypes: ["register", "value"],
    },
  ],
  execute: (machine, operands) => {
    const operandRegister = operands[0].value as Register;
    const operandValue = machine.getRegister(operandRegister);
    let comparatorValue = 0;

    if (operands[1].type === "register") {
      comparatorValue = machine.getRegister(operands[1].value);
    } else {
      comparatorValue = operands[1].value as number;
    }

    machine.setFlag("zero", operandValue === comparatorValue);
    machine.setFlag("negative", operandValue < comparatorValue);
  },
};
