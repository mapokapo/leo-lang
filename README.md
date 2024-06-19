# leo-lang

A simple ARM-inspired programming language which runs in JS.

## Installation

### npm

```sh
npx jsr add @mapokapo/leo-lang
```

### Deno

```sh
deno add @mapokapo/leo-lang
```

### Bun

```sh
bunx jsr add @mapokapo/leo-lang
```

## Usage

```ts
import { parseProgram } from "@mapokapo/leo-lang";
import Machine from "@mapokapo/leo-lang/machine";
// or in Deno
import { parseProgram } from "jsr:@mapokapo/leo-lang@^0.0.1";
import Machine from "jsr:@mapokapo/leo-lang/machine@^0.0.1";

const operations = parseProgram(`
	ldv r0, #1
	ldv r1, #2
	add r2, r0, r1
	st r2, #0
`);

const machine = new Machine(operations);

while (true) {
  if (machine.execute()) {
    break;
  }
}

machine.printRegisterTable();
machine.printFlagTable();
machine.printMemoryTable();
```
