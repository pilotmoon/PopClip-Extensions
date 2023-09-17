export const actions: PopulationFunction = (selection, options, context) => {
  const result: Action[] = []
  const emails = selection.data.emails
  if (options['enable-at'] as boolean && emails.length > 0) {
    result.push({
      title: emails.length === 1 ? `New email to ${emails[0]}` : `New email to ${emails.length} addresses`,
      icon: 'at.png',
      code: function () {
        if (popclip.modifiers.shift) {
          // multiple recipients
          popclip.openUrl('mailto:' + emails.join())
        } else {
          // one email to each address
          emails.forEach((email) => popclip.openUrl('mailto:' + email))
        }
      }
    })
  }
  if (options['enable-body'] as boolean && selection.text.length > 0) {
    result.push({
      title: 'New email with text',
      icon: 'envelope.png',
      code: function () {
        let body = selection.markdown
        if (options.source as boolean) {
          body += '\n\n' + context.browserUrl
        }
        popclip.openUrl('mailto:' + (options.default as string) + '?body=' + encodeURIComponent(body))
      },
      captureHtml: true
    })
  }
  return result
}
