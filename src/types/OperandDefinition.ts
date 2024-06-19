import type { Operand } from "./Operand";

export default interface OperandDefinition {
  acceptedTypes: Operand["type"][];
  name: string;
}
