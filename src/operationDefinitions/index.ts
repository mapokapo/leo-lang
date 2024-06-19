import { addOperation } from "./add";
import { ldvOperation } from "./ldv";
import { ldaOperation } from "./lda";
import { stOperation } from "./st";
import { cmpOperation } from "./cmp";
import { jmpOperation } from "./jmp";
import { jmpneOperation } from "./jmpne";
import { jmpzOperation } from "./jmpz";
import { stopOperation } from "./stop";

export const operationDefinitions = [
  addOperation,
  ldvOperation,
  ldaOperation,
  stOperation,
  cmpOperation,
  jmpOperation,
  jmpneOperation,
  jmpzOperation,
  stopOperation,
];
