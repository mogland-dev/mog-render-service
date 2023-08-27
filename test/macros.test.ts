import { describe, it, expect } from 'vitest'
import { textMacro } from '../src/functions/macros';

describe('test macros function', () => {
  it('should running correctly', async () => {
      const text = 'test mog-render-service.textMacro [[ $title ]] [[#blur($title)]]';
      const record = {
          title: 'TITLE',
          created: 'CREATED',
          slug: 'SLUG',
          nid: 'NID',
          _id: '_ID',
      };
      const result = await textMacro(text, record);
      expect(result).toBe('test mog-render-service.textMacro TITLE <span class="text blur">TITLE</span>');
  })
})