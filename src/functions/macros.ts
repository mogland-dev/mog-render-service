import { safeEval } from "../utils/safe-eval.util";

interface Variables {
  title: string;
  created: string;
  slug: string;
  nid: string;
  _id: string;
}

interface Functions {
  [key: string]: (...args: any[]) => any;
}

export function textMacro(text: string, record: Variables) {
  const variables: Variables = {
    title: record.title,
    created: record.created,
    slug: record.slug,
    nid: record.nid,
    _id: record._id,
  };
  const functions: Functions = {
    dayjs: require("dayjs"),
    blur: (text: string) => {
      // implementation of blur function
      return `<span class="text blur">${text}</span>`;
    },
  };
  const regex = /\[\[ ?(\$|#)(.*?) ?\]\]/g;
  return text.replace(regex, (match: string, type: string, value: string) => {
    if (type === "$") {
      return variables[value as keyof Variables] || "";
    } else if (type === "#") {
      if (value.startsWith("(") && value.endsWith(")")) {
        const [functionName, ..._args] = value.split("(");
        const func = functions[functionName as keyof Functions] as any;
        if (func) {
          const values = value.replace(/\$(\w+)/g, (_, key) => {
            return `${key}`;
          });
          return safeEval(
            `return ${values}`,
            { ...variables, ...functions },
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
        const func = functions[functionName as keyof Functions] as any;
        if (func) {
          const values = value.replace(/\$(\w+)/g, (_, key) => {
            return `${key}`;
          });
          return safeEval(
            `return ${values}`,
            { ...variables, ...functions },
            { timeout: 1000 }
          );
        }
      }
    }
    return match;
  });
}

// const record: Variables = {
//   title: "My First Blog Post",
//   created: "2020-01-01T00:00:00.000Z",
//   slug: "my-first-blog-post",
//   nid: "1",
//   _id: "abc123",
// };

// const text = `
// [[ #blur($title) ]] was created on [[ #dayjs($created).format("MMMMDD, YYYY") ]]. The slug is [[ $slug ]] and the nid is [[ $nid ]].
// [[ #($slug.slice(0, 5)) ]]
// if _id is abc123, then it will return "yes" [[ #($_id === "abc123" ? "yes" : "no") ]]
// `;

// console.log(textMacro(text, record));
