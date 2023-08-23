import { Interpreter, Parser, values } from "@syuilo/aiscript/";
import { FsLib } from "./aiscript/stdlib/Fs.ts";
import { WebLib } from "./aiscript/stdlib/Web.ts";

export class App {
  static installLibrary(
    interpreter: Interpreter,
    lib: { [k: string]: values.Value },
  ) {
    for (const k in lib) {
      interpreter.scope.add(k, lib[k]);
    }
  }

  static initInterpreter() {
    const interpreter = new Interpreter({}, {
      async in(q: string) {
        return prompt(q);
      },
      async out(value: values.Value) {
        const to_str = interpreter.scope.get("Core:to_str") as values.VFn;

        const res = to_str.native!([value], {
          call: interpreter.execFn,
          registerAbortHandler: interpreter.registerAbortHandler,
          unregisterAbortHandler: interpreter.unregisterAbortHandler,
        }) as values.VStr;

        await Deno.stdout.write(new TextEncoder().encode(res.value + "\n"));
      },
    });

    App.installLibrary(interpreter, FsLib);
    App.installLibrary(interpreter, WebLib);

    return interpreter;
  }

  constructor(
    private interpreter: Interpreter = App.initInterpreter(),
    private parser: Parser = new Parser(),
  ) {}

  async evaluateString(code: string) {
    return await this.interpreter.exec(this.parser.parse(code));
  }
}
