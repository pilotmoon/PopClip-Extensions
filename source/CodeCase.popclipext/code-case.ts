import 'core-js/es/string/match-all' // temporary until next popclip version
import * as ca from 'case-anything'

const config = [
  { icon: 'camel-case.svg', method: 'camelCase', title: 'camelCase' },
  { icon: 'pascal-case.svg', method: 'UpperCamelCase', title: 'UpperCamelCase' },
  { icon: 'kebab-case.svg', method: 'kebabCase', title: 'kebab-case' },
  { icon: 'snake-case.svg', method: 'snakeCase', title: 'snake_case' },
  { icon: 'const-case.svg', method: 'constantCase', title: 'CONSTANT_CASE' }
]

const actions = config.map(config => {
  const action: ActionObject = {
    code (input) {
      return ca[config.method](input.text)
    },
    requirements: ['text', `option-${config.method}=1`],
    title: config.title,
    icon: config.icon,
    after: 'paste-result'
  }
  return action
})

const options = config.map(config => {
  const action: Option = {
    identifier: config.method,
    label: config.title,
    type: 'boolean',
    icon: config.icon
  }
  return action
})

const extension: Extension = { actions, options }
export default extension
