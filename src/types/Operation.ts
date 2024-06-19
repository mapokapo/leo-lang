import type { Code } from "./Code";
import type { Operand } from "./Operand";

export default interface Operation {
  /**
   * The opcode of the operation. The opcode is a string that represents the operation to be performed.
   */
  opcode: Code;
  /**
   * The operands of the operation. The operands are the values that the operation will be performed on or where the result of the operation will be stored.
   */
  operands: Operand[];
  /**
   * A label associated with this operation. This is used for jumps to specify the location to jump to or call. The operation just after the label is the one that will be executed.
   */
  label: string | null;
}
