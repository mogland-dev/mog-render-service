import { marked } from "marked";


export function markdownToHtml(
  _id: string,
  data: any,
  _pattern: string,
  _isEmitter: boolean,
) {
  const markdownContent = data.body;
  const html = marked.parse(markdownContent);
  return html;
}