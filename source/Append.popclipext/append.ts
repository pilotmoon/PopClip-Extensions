export const action: ActionFunction = (selection) => {
  const separator = popclip.modifiers.option ? '' : '\n'
  if (popclip.modifiers.option) {
    pasteboard.text = selection.text.trim() + separator + pasteboard.text.trim()
  } else {
    pasteboard.text = pasteboard.text.trim() + separator + selection.text.trim()
  }
  return null
}
