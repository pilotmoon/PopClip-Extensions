export const action: ActionFunction = (input, options, context) => {
  const rs = new RichString(input.text, { format: 'markdown' })
  popclip.copyContent({ 'public.rtf': rs.rtf })
}
