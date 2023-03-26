import { djotToHtml } from './handlers/djotToHtml';
import { markdownToHtml } from './handlers/markdownToHtml';
import { textFromServer } from './handlers/textFromServer';
import { Handler } from './types/handler';
import { generatePattern } from './utils';

export const PATTERNS = {
  MARKDOWN_TO_HTML: generatePattern('render.markdown.to.html'),
  DJOT_TO_HTML: generatePattern('render.djot.to.html'),
  FROM_SERVER: generatePattern('render.from.server'),
};

export const HANDLERS: {
  [key: string]: Handler
} = {
  MARKDOWN_TO_HTML: markdownToHtml,
  DJOT_TO_HTML: djotToHtml,
  FROM_SERVER: textFromServer,
};
