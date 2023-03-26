import { marked } from "marked";
import { Handler } from "../types/handler";


export const markdownToHtml: Handler = (
  _id,
  data,
  _pattern,
  _isEmitter,
) => {
  const markdownContent = typeof data === "string" ? data : data.body;
  const html = marked.parse(markdownContent);
  return html;
}