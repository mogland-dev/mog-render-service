import { describe, expect, it } from 'vitest'
import { djotToHtml } from '../src/handlers/djotToHtml'
import { markdownToHtml } from '../src/handlers/markdownToHtml'

const _ = {
  id: 'test',
  data: {
    body: "# H1 \n **bold**",
  },
  pattern: '',
  isEmitter: false,
}

describe('djot', () => {
  it('should render raw content correctly', () => {
    expect(djotToHtml(_.id, _.data, _.pattern, _.isEmitter)).toBe("<section id=\"H1-bold\">\n<h1>H1 \n<strong><strong>bold</strong></strong></h1>\n</section>\n")
  })
})

describe("markdown", () => {
  it("should render raw content correctly", () => {
    expect(markdownToHtml(_.id, _.data, _.pattern, _.isEmitter)).toBe("<h1 id=\"h1\">H1</h1>\n<p> <strong>bold</strong></p>\n")
  })
})