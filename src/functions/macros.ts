import { safeEval } from "../utils/safe-eval.util";

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

export function textMacro(text: string, record: Variables) {
  const variables: Variables = record;

  const regex = /\[\[ ?(\$|#)(.*?) ?\]\]/g;
  return text.replace(regex, (match: string, type: string, value: string) => {
    if (type === "$") {
      return variables[value as keyof Variables] || "";
    } else if (type === "#") {
      if (value.startsWith("(") && value.endsWith(")")) {
        const [functionName, ..._args] = value.split("(");
        const func = builtInFunctions[functionName as keyof Functions] as any;
        if (func) {
          const values = value.replace(/\$(\w+)/g, (_, key) => {
            return `${key}`;
          });
          return safeEval(
            `return ${values}`,
            { ...variables, ...builtInFunctions },
            { timeout: 1000 }
          );
        }
        try {
          const values = value
            .replace(/\$(\w+)/g, (_, key) => {
              return `${key}`;
            })
            .replace(/^\(|\)$/g, "");
          return safeEval(values, { ...variables }, { timeout: 1000 });
        } catch (error) {
          console.error(`Error evaluating JS expression: ${value}`);
          return match;
        }
      } else {
        const [functionName, ..._args] = value.split("(");
        const func = builtInFunctions[functionName as keyof Functions] as any;
        if (func) {
          console.log("func", func);
          
          const values = value.replace(/\$(\w+)/g, (_, key) => {
            return `${key}`;
          });
          return safeEval(
            `return ${values}`,
            { ...variables, ...builtInFunctions },
            { timeout: 1000 }
          );
        }
      }
    }
    return match;
  });
}

const record: Variables = {
  title: "My First Blog Post",
  created: "2020-01-01T00:00:00.000Z",
  slug: "my-first-blog-post",
  nid: "1",
  _id: "abc123",
};

const text = `
[[ #blur($title) ]] was created on [[ #dayjs($created).format("MMMMDD, YYYY") ]]. The slug is [[ $slug ]] and the nid is [[ $nid ]].
[[ #($slug.slice(0, 5)) ]]
if _id is abc123, then it will return "yes" [[ #($_id === "abc123" ? "yes" : "no") ]]
[[ #join(["a", "b", "c"], ", ") ]]
`;

console.log(textMacro(text, record));
