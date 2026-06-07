import { TerminalController } from "./controllers/TerminalController";

async function main() {
  const terminal = new TerminalController();
  await terminal.start();
}

main();