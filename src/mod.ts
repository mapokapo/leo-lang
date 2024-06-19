import { parseOperation, validateOperation } from "./operations";
import type Operation from "./types/Operation";

export function parseProgram(programText: string) {
  const operations: Operation[] = [];
  const lines = programText.split("\n");

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    let label: string | null = null;

    if (line.length === 0) {
      continue;
    }

    // Label handling
    if (line.startsWith("@")) {
      label = line.slice(1);
      i++;
      line = lines[i].trim();
    }

    const rawOperation = parseOperation(line, label);

    if (rawOperation.isComment) {
      continue;
    }

    try {
      const op = validateOperation(rawOperation);

      operations.push(op);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  return operations;
}
