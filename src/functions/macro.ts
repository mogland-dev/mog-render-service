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
        const functionName = value.slice(0, value.indexOf("("));
        const argList = value.slice(value.indexOf("(") + 1, -1).split(",");
        const func = functions[functionName as keyof Functions];
        if (func) {
          const processedArgs = argList.map((arg) => {
            return arg.trim().startsWith("$")
              ? variables[arg.slice(1) as keyof Variables]
              : arg;
          });
          // eslint-disable-next-line prefer-spread
          return func.apply(null, processedArgs);
        }
        try {
          const values = value.slice(1, -1).replace(/\$(\w+)/g, (_, key) => {
            return `\`${String(variables[key as keyof Variables])}\``;
          })
          return eval(values).toString();
        } catch (error) {
          console.error(`Error evaluating JS expression: ${value}`);
          return match;
        }
      } else {
        const [functionName, ...args] = value.split("(");
        const func = functions[functionName as keyof Functions];
        if (func) {
          const argList = args.join("(").slice(0, -1).split(",");
          const processedArgs = argList.map((arg) => {
            if (arg.trim().startsWith("$")) {
              return variables[arg.slice(1) as keyof Variables];
            } else {
              return arg.trim();
            }
          });
          // eslint-disable-next-line prefer-spread
          return func.apply(null, processedArgs);
        }
      }
    }
    return match;
  });
}