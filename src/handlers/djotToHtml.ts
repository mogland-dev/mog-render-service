import { parse, renderHTML } from "@djot/djot";

export function djotToHtml(
  _id: string,
  data: any,
  _pattern: string,
  _isEmitter: boolean,
) {
  const djotContent = data.body;
  const html = renderHTML(parse(djotContent));
  return html;
}
