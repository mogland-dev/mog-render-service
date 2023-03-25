import { textMacro } from "../src/functions/macro";
import { textMacro as mxTextMacro } from "./mx";

const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();

const record = {
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
`;

suite
  .add("textMacro (Mog)", () => {
    textMacro(text, record);
  })
  .add("textMacro (Mix)", () => {
    mxTextMacro(text, record);
  })
  .on("cycle", (event: { target: any; }) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    // @ts-ignore
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
