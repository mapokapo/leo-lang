import type { Operand } from "./Operand";

export default interface RawOperation {
  opcode: string;
  operands: Operand[];
  isComment: boolean;
  label: string | null;
}
