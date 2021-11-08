#!/usr/bin/env node
// convert "old style" JSON config to "new style"
/* eslint-disable @typescript-eslint/no-dynamic-delete */
import * as ca from 'case-anything'
import { mapping, prefixes, actionKeys, otherKeysBefore, otherKeysAfter } from './mapping.json'

// read all of stdin
const chunks: string[] = []
process.stdin.on('readable', () => {
  let chunk: string
  while ((chunk = process.stdin.read()) !== null) {
    chunks.push(chunk)
  }
})
process.stdin.on('end', () => {
  process.stdout.write(convert(chunks.join('')))
})

/**
 * Rename a single property name.
 * @param name Propert name to rename
 * @returns The renamed property name
 */
function rename (name: string): string {
  name = ca.spaceCase(ca.snakeCase(name))
  // remove defined prefixes
  for (const prefix of prefixes) {
    if (typeof prefix === 'string' && name.startsWith(prefix)) {
      name = name.substring(prefix.length, name.length)
    }
  }
  // perform defined renamings
  if (name in mapping) {
    name = mapping[name]
  }
  return name
}

/**
 * Rename an object's enumerable string keys using a given transform.
 * @param obj Object whose keys should be renamed
 * @param transform The renaming transform
 * @retutns New object with renamed keys.
 */
function renameKeys (obj: any, transform: (s: string) => string): any {
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    const newKey = transform(key)
    if (Array.isArray(value)) {
      const arr: any[] = []
      for (const member of value) {
        if (member !== null && typeof member === 'object' && !Array.isArray(member)) {
          arr.push(renameKeys(member, transform))
        } else {
          arr.push(member) // don't process arrays within arrays
        }
      }
      result[newKey] = arr
    } else if (value !== null && typeof value === 'object') {
      result[newKey] = renameKeys(value, transform)
    } else {
      result[newKey] = value
    }
  }
  return result
}

// remove localized strings with only en value
function replaceLocalizable (key: string, value: unknown): any {
  if (typeof value === 'object' && value !== null) {
    if ('en' in value && Object.keys(value).length === 1) { // of only en key
      value = (value as any).en
    }
  }
  return value
}

// remove null entries
function removeNull (key: string, value: unknown): any {
  return value === null ? undefined : value
}

function processSpecial (obj: any): any {
  if ('actions' in obj && Array.isArray(obj.actions) && obj.actions.length === 1) {
    const action = obj.actions[0]
    for (const key of actionKeys) {
      if (key in action && !(key in obj)) {
        obj[key] = action[key]
        delete action[key]
      }
    }
    if ('title' in action) {
      if (action.title !== obj.name) {
        obj.title = action.title
      }
      delete action.title
    }
    if (Object.keys(action).length === 0) {
      delete obj.actions
    }
  }
  if ('apps' in obj && Array.isArray(obj.apps) && obj.apps.length === 1) {
    obj.app = obj.apps[0]
    delete obj.apps
    if (typeof obj.app['bundle identifier'] === 'string') {
      obj.app['bundle identifiers'] = [obj.app['bundle identifier']]
      delete obj.app['bundle identifier']
    }
  }
  return obj
}

function convert (jsonConfig: string): string {
  let config = JSON.parse(jsonConfig)
  config = JSON.parse(JSON.stringify(config, replaceLocalizable))
  config = renameKeys(config, rename)
  config = processSpecial(config)

  const keyOrder = otherKeysBefore.concat(actionKeys, otherKeysAfter)
  const ordered = {}
  for (const key of keyOrder) {
    ordered[key] = null
  }
  Object.assign(ordered, config)
  return JSON.stringify(ordered, removeNull, 2) + '\n'
}
