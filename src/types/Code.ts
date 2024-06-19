export const definedCodes = [
  "add",
  "sub",
  "ldv",
  "lda",
  "st",
  "cmp",
  "jmp",
  "jmpne",
  "jmpz",
  "stop",
] as const;

export type Code = (typeof definedCodes)[number];
