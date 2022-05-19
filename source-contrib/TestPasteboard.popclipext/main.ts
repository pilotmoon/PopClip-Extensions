export const action: ActionFunction = () => {
  print(pasteboard.content)
  pasteboard.content = { 'public.utf8-plain-text': 'fish', 'public.html': '<b>fish</b>' }
  return null
}
