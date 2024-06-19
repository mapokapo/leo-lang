import type { Register } from "./Register";

export type Operand =
  | {
      type: "value";
      value: number;
    }
  | {
      type: "address";
      value: number;
    }
  | {
      type: "register";
      value: Register;
    }
  | {
      type: "label";
      value: string;
    };
