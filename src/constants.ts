import { djotToHtml } from './handlers/djotToHtml';
import { markdownToHtml } from './handlers/markdownToHtml';
import { generatePattern } from './utils';

export const PATTERNS = {
  MARKDOWN_TO_HTML: generatePattern('render.markdown.to.html'),
  DJOT_TO_HTML: generatePattern('render.djot.to.html'),
};

export const HANDLERS: {
  [key: string]: (
    id: string,
    data: string,
    pattern: string,
    isEmitter: boolean,
  ) => string;
} = {
  MARKDOWN_TO_HTML: markdownToHtml,
  DJOT_TO_HTML: djotToHtml,
};
