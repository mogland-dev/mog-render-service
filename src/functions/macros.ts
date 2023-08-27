import { safeEval } from "../utils/safe-eval.util";
import { replaceAsync } from "../utils/replace-async.util";


interface Variables {
  [key: string]: any;
}

interface Functions {
  [key: string]: (...args: any[]) => any;
}

const builtInFunctions: Functions = {
  dayjs: require("dayjs"),
  blur: (text: string) => {
    return `<span class="text blur">${text}</span>`;
  },
  case: (condition: boolean, trueValue: any, falseValue: any) => {
    return condition ? trueValue : falseValue;
  },
  join: (array: any[], separator: string) => {
    return array.join(separator);
  },
  concat: (...args: any[]) => {
    return args.join("");
  },
  slice: (text: string, start: number, end: number) => {
    return text.slice(start, end);
  },
  replace: (text: string, search: string, replace: string) => {
    return text.replace(search, replace);
  },
};

export async function textMacro(text: string, record: Variables) {
  const variables: Variables = record;

  const regex = /\[\[ ?(\$|#)(.*?) ?\]\]/g;
  return await replaceAsync(text, regex, async (match, type, value) => {
  // return text.replace(regex, async (match: string, type: string, value: string) => {
    if (type === "$") {
      return variables[value as keyof Variables] || "";
    } else if (type === "#") {
      if (value.startsWith("(") && value.endsWith(")")) {
        const [functionName, ..._args] = value.split("(");
        const func = builtInFunctions[functionName as keyof Functions] as any;
        if (func) {
          const values = value.replace(/\$(\w+)/g, (_: any, key: any) => {
            return `${key}`;
          });
          return await safeEval(
            `return ${values}`,
            { ...variables, ...builtInFunctions }
          );
        }
        try {
          const values = value
            .replace(/\$(\w+)/g, (_: any, key: any) => {
              return `${key}`;
            })
            .replace(/^\(|\)$/g, "");
          return await safeEval(values, { ...variables });
        } catch (error) {
          console.error(`Error evaluating JS expression: ${value}`);
          return match;
        }
      } else {
        const [functionName, ..._args] = value.split("(");
        const func = builtInFunctions[functionName as keyof Functions] as any;
        if (func) {
          const values = value.replace(/\$(\w+)/g, (_: any, key: any) => {
            return `${key}`;
          });
          return await safeEval(
            `return ${values}`,
            { ...variables, ...builtInFunctions },
          );
        }
      }
    }
    return match;
  });
}