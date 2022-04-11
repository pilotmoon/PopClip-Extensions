import { marked } from './marked.js'

export const action: ActionFunction = (input) => {
  // first save the selection attributes so we match font, color etc.
  const html = marked.parse(input.text)
  const rs = new RichString(html, { format: 'html' })
  if (input.rtf.length > 0) {
    rs.applyFont(new RichString(input.rtf)?.font) // apply original font
  }
  popclip.pasteContent({ 'public.rtf': rs.rtf, 'public.html': rs.html })
}
