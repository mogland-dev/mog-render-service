interface Variables {
  title: string;
  created: string;
  slug: string;
  nid: number;
  _id: string;
}

interface Functions {
  [key: string]: (...args: any[]) => any;
}

function textMacro(text: string, record: Variables) {
  const variables: Variables = {
    title: record.title,
    created: record.created,
    slug: record.slug,
    nid: record.nid,
    _id: record._id,
  };
  const functions: Functions = {
    dayjs: require('dayjs'),
    blur: (text: string) => {
      // implementation of blur function
      return `<span class="text blur">${text}</span>`;
    },
  };
  const regex = /\[\[ ?(\$|#)(.*?) ?\]\]/g;
  return text.replace(regex, (match: string, type: string, value: string) => {
    if (type === '$') {
      return variables[value as keyof Variables] || '';
    } else if (type === '#') {
      const [functionName, ...args] = value.split('(');
      const func = functions[functionName as keyof Functions];
      if (func) {
        const argList = args.join('(').slice(0, -1).split(',');
        const processedArgs = argList.map((arg) => {
          if (arg.trim().startsWith('$')) {
            return variables[arg.slice(1) as keyof Variables];
          } else if (arg.trim().startsWith('#(')) {
            const expression = arg.trim().slice(2, -1);
            console.log(1999);
            return eval(expression);
          } else {
            return arg.trim();
          }
        });
        // eslint-disable-next-line prefer-spread
        return func.apply(null, processedArgs);
      }
    }
    return match;
  });
}
const record: Variables = {
  title: 'My First Blog Post',
  created: '2020-01-01T00:00:00.000Z',
  slug: 'my-first-blog-post',
  nid: 1,
  _id: 'abc123',
};

const text = `
[[ #blur($title) ]] was created on [[ #dayjs($created).format("MMMMDD, YYYY") ]]. The slug is [[ $slug ]] and the nid is [[ $nid ]].
if _id is abc123, then it will return "yes" [[ #($_id === "abc123" ? "yes" : "no") ]]
`;

console.log(textMacro(text, record));
