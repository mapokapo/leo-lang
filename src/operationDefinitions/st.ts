import type OperationDefinition from "../types/OperationDefinition";

/**
 * `st` operation - store a value into memory
 *
 * Stores an immediate value or the value of another register into memory at the specified address (as provided like a raw address or through a register).
 *
 * Arguments:
 * - source: The value to store into memory.
 * - destination: The memory address to store the value at, either as a raw address or through a register.
 *
 * Flags affected:
 * - None
 *
 * Examples:
 * st r0 10 % Store the value in register 0 into memory address 10.
 * st r0 r1 % Store the value in register 0 into the memory address stored in register 1.
 */
export const stOperation: OperationDefinition = {
  opcode: "st",
  args: [
    {
      name: "source",
      acceptedTypes: ["register", "value"],
    },
    {
      name: "destination",
      acceptedTypes: ["address", "register"],
    },
  ],
  execute: (machine, operands) => {
    let value = 0;
    let address = 0;

    if (operands[0].type === "register") {
      value = machine.getRegister(operands[0].value);
    } else {
      value = operands[0].value as number;
    }

    if (operands[1].type === "register") {
      address = machine.getRegister(operands[1].value);
    } else {
      address = operands[1].value as number;
    }

    machine.setMemory(address, value);
  },
};
