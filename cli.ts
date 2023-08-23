import { Command } from "command/mod.ts";
import { App } from "./src/app.ts";

const app = new App();

const program = new Command()
  .name("aiscript-cli")
  .description("command line runtime for aiscript. ヽ(・o・)ノ")
  .action(async () => {
    await program.showHelp();
  });

program.command("run <file>", "run a script file")
  .action(async (_, file) => {
    const script = await Deno.readTextFile(file);

    app.evaluateString(script);
  });

if (import.meta.main) {
  await program.parse(Deno.args);
}
