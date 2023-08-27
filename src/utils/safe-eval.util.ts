import { Isolate } from "isolated-vm";

export async function safeEval(
  code: string,
  context: { [key: string]: any } = {}
) {
  const isolate = new Isolate({ memoryLimit: 128 });

  const sandbox: {
    [key: string]: any;
  } = {};

  code = `((() => { ${code} })())`;

  if (context) {
    Object.keys(context).forEach((key) => {
      sandbox[key] = context[key];
    });
  }

  const contextGlobal = await isolate.createContext();
  Object.keys(sandbox).forEach((key) => {
    contextGlobal.global.set(key, sandbox[key]);
  });

  const script = await isolate.compileScript(code);
  const result = await script.run(contextGlobal, );

  isolate.dispose();

  return result;
}
