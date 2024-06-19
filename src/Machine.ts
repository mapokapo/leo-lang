import { operationDefinitions } from "./operationDefinitions";
import type Operation from "./types/Operation";
import type { Register, Registers } from "./types/Register";

export default class Machine {
  private operations: Operation[];
  private pc = 0;
  private registers: Registers = [0, 0, 0, 0, 0, 0, 0, 0];
  private memory: number[] = new Array(256).fill(0);
  private flags = {
    zero: false,
    negative: false,
  };

  public constructor(operations: Operation[]) {
    this.operations = operations;
  }

  public execute() {
    if (this.pc >= this.operations.length) {
      return true;
    }

    const op = this.operations[this.pc];

    const definition = operationDefinitions.find(
      def => def.opcode === op.opcode
    );

    if (definition === undefined) {
      throw new Error("Unknown operation");
    }

    definition.execute(this, op.operands);

    this.pc++;

    return false;
  }

  public setRegister(register: Register, value: number) {
    this.registers[register] = value;
  }

  public getRegister(register: Register) {
    return this.registers[register];
  }

  public setMemory(address: number, value: number) {
    this.memory[address] = value;
  }

  public getMemory(address: number) {
    return this.memory[address];
  }

  public setFlag(flag: keyof typeof this.flags, value: boolean) {
    this.flags[flag] = value;
  }

  public getFlag(flag: keyof typeof this.flags) {
    return this.flags[flag];
  }

  public jumpToLabel(label: string) {
    const index = this.operations.findIndex(op => op.label === label) - 1;

    if (index < 0) {
      throw new Error(`Label '${label}' not found`);
    }

    this.pc = index;
  }

  public stop() {
    this.pc = this.operations.length;
  }

  public restart() {
    this.pc = 0;
    this.registers = [0, 0, 0, 0, 0, 0, 0, 0];
    this.memory = new Array(256).fill(0);
    this.flags = {
      zero: false,
      negative: false,
    };
  }

  public printRegisterTable() {
    console.log("Registers:");
    console.log("----------");
    for (let i = 0; i < this.registers.length; i++) {
      console.log(`r${i}: ${this.registers[i]}`);
    }
  }

  public printFlagTable() {
    console.log("Flags:");
    console.log("------");
    for (const flag in this.flags) {
      console.log(`${flag}: ${this.flags[flag as keyof typeof this.flags]}`);
    }
  }

  // Prints the memory as an 16x16	table
  public printMemoryTable() {
    const binaryOnly = this.memory.every(value => value === 0 || value === 1);

    console.log("Memory:");
    console.log("-------");
    for (let i = 0; i < 16; i++) {
      let row = "";
      for (let j = 0; j < 16; j++) {
        const value = this.memory[i * 16 + j];
        row += `${binaryOnly ? (value ? "@" : ".") : value}`.padEnd(
          binaryOnly ? 2 : 4,
          " "
        );
      }
      console.log(row);
    }
  }
}
