import type { Operand } from "./types/Operand";
import type { Register } from "./types/Register";
import type RawOperation from "./types/RawOperation";
import InvalidOperandError from "./errors/InvalidOperandError";
import InvalidOperationError from "./errors/InvalidOperationError";
import { operationDefinitions } from "./operationDefinitions";
import type Operation from "./types/Operation";

export function parseOperand(operandStr: string, line: string): Operand {
  if (operandStr.startsWith("r")) {
    return { type: "register", value: Number(operandStr[1]) as Register };
  } else if (operandStr.startsWith("#")) {
    return { type: "value", value: Number(operandStr.slice(1)) };
  } else if (operandStr.startsWith("@")) {
    return { type: "label", value: operandStr.slice(1) };
  } else {
    const char = operandStr[0];

    if (char < "0" || char > "9") {
      throw new InvalidOperandError(`'${operandStr}' in '${line}'`);
    }

    return { type: "address", value: Number(operandStr) };
  }
}

export function parseOperation(
  line: string,
  label: string | null
): RawOperation {
  if (line.startsWith("%")) {
    return {
      opcode: "",
      operands: [],
      isComment: true,
      label: null,
    };
  }

  const [opcodeStr, ...operandStrs] = line.split(" ");

  const operands: Operand[] = operandStrs.map(s => parseOperand(s, line));

  return {
    opcode: opcodeStr,
    operands,
    isComment: false,
    label,
  };
}

export function validateOperation(op: RawOperation): Operation {
  const operation = op.opcode;

  const definition = operationDefinitions.find(def => def.opcode === operation);

  if (definition === undefined) {
    throw new InvalidOperationError(op.opcode, "Unknown operation");
  }

  if (definition.args.length !== op.operands.length) {
    throw new InvalidOperationError(
      op.opcode,
      `Invalid number of operands (got ${op.operands.length}, expected ${definition.args.length})`
    );
  }

  // Check if the operand types match
  for (let i = 0; i < definition.args.length; i++) {
    const expectedTypes = definition.args[i].acceptedTypes;
    const actualType = op.operands[i].type;

    if (!expectedTypes.includes(actualType)) {
      throw new InvalidOperationError(
        op.opcode,
        `Invalid operand type for operand ${i + 1} (got ${actualType}, expected ${expectedTypes.join(" or ")})`
      );
    }
  }

  return {
    opcode: definition.opcode,
    operands: op.operands,
    label: op.label,
  };
}
