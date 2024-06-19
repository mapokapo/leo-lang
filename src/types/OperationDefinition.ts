import type Machine from "../Machine";
import type { Code } from "../types/Code";
import type { Operand } from "./Operand";
import type OperandDefinition from "./OperandDefinition";

export default interface OperationDefinition {
  opcode: Code;
  args: OperandDefinition[];
  execute: (machine: Machine, operands: Operand[]) => void;
}
