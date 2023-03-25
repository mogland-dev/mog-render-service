import { describe, it, expect } from 'vitest'
import { textMacro } from '../src/functions/macro';

describe('test mog_render_service', () => {
  it('test mog-render-service.textMacro', () => {
      const text = 'test mog-render-service.textMacro [[ $title ]] [[#blur($title)]]';
      const record = {
          title: 'title',
          created: 'created',
          slug: 'slug',
          nid: 'nid',
          _id: '_id',
      };
      const result = textMacro(text, record);
      expect(result).toBe('test mog-render-service.textMacro title <span class="text blur">title</span>');
  })
})