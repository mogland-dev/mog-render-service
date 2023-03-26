import { parse, renderHTML } from "@djot/djot";
import { Handler } from "../types/handler";

export const djotToHtml: Handler = (_id, data, _pattern, _isEmitter) => {
  const djotContent = typeof data === "string" ? data : data.body;
  const html = renderHTML(parse(djotContent));
  return html;
}
