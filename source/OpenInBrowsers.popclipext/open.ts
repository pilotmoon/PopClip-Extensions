import { browsers } from './browsers.json'
interface BrowserDefinition {
  name: string
  bundleId: string
  icon: string
  link: string
  defaultEnabled?: boolean
}
function makeOption (browser: BrowserDefinition): Option {
  const option: Option = {
    identifier: browser.bundleId,
    label: browser.name,
    type: 'boolean',
    icon: browser.icon,
    defaultValue: browser.defaultEnabled === true
  }
  return option
}
function makeAction (browser: BrowserDefinition): Action {
  const action: Action = {
    title: 'Open in ' + browser.name,
    icon: browser.icon,
    code: input => {
      for (const url of input.data.urls) {
        popclip.openUrl(url, { app: browser.bundleId })
      }
      return null
    }
  }
  return action
}
function makeApp (browser: BrowserDefinition): AssociatedApp {
  const app: AssociatedApp = {
    name: browser.name,
    link: browser.link,
    bundleIdentifiers: [browser.bundleId],
    checkInstalled: true
  }
  return app
}

// return options with title
export const options: Option[] = [{
  identifier: 'heading',
  label: 'Enabled Browsers',
  type: 'heading'
}, ...browsers.map(makeOption)]
// return apps list
export const apps: AssociatedApp[] = browsers.map(makeApp)
// dynamically generate the actions
export const actions: PopulationFunction = (input, options, context) => {
  return browsers.filter(browser => {
    return options[browser.bundleId] === true && context.appIdentifier !== browser.bundleId
  }).map(makeAction)
}
