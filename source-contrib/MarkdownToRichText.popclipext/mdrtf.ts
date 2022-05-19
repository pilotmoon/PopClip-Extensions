// import { marked } from './marked.js'

export const action: ActionFunction = (input, options, context) => {
  // first save the selection attributes so we match font, color etc.
  // const html = marked.parse(input.text)
  // const rs = new RichString(html, { format: 'html' })
  const sourceOptions: any = { format: 'markdown', paragraphSeparation: options.paras }
  if (input.rtf.length > 0) {
    // rs.applyFont(new RichString(input.rtf)?.font) // apply original font
    sourceOptions.baseFont = new RichString(input.rtf, { format: 'rtf' })?.font // TODO test if undefined
  }
  if (typeof input.content['public.html'] === 'string') {
    // rs.applyFont(new RichString(input.rtf)?.font) // apply original font
    sourceOptions.baseFont = new RichString(input.content['public.html'], { format: 'html' })?.font // TODO test if undefined
  }
  const rs = new RichString(input.text, sourceOptions)
  // const content = { 'public.rtf': rs.rtf, 'public.html': rs.html }
  const content = { 'public.rtf': rs.rtf }
  if (context.hasFormatting) {
    popclip.pasteContent(content)
  } else {
    popclip.copyContent(content)
  }
  return null
}
