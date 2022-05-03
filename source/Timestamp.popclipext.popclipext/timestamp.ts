export const action: ActionFunction = (input, options) => {
  return timeStamp(new Date(), options)
}

const timeStamp = (dateObj: Date, options?: any): string => {
  if (options?.format === 'iso8601') {
    return dateObj.toISOString()
  } else if (options?.format === 'intl') {
    const timeSpecifier = options?.includeTime === false ? undefined : '2-digit'
    const timeZoneSpecifier = options?.includeTimeZone === false ? undefined : 'short'
    const tfOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: timeSpecifier,
      minute: timeSpecifier,
      second: timeSpecifier,
      timeZoneName: timeZoneSpecifier
    }
    return new Intl.DateTimeFormat(['zu'], tfOptions).format(dateObj)
  } else {
    const tfOptions: Intl.DateTimeFormatOptions = {
      dateStyle: 'medium',
      timeStyle: options?.includeTime === false ? undefined : (options?.includeTimeZone === false ? 'medium' : 'long')
    }
    return new Intl.DateTimeFormat([], tfOptions).format(dateObj)
  }
}

export const options = (() => {
  const now = new Date()
  return [
    {
      identifier: 'format',
      label: 'Date/Time Format',
      type: 'multiple',
      values: ['system', 'intl', 'iso8601'],
      valueLabels: [
        `System (${timeStamp(now)})`,
        `International (${timeStamp(now, { format: 'intl' })})`,
        `ISO 8601 (${timeStamp(now, { format: 'iso8601' })})`
      ]
    },
    {
      identifier: 'includeTime',
      label: 'Include Time',
      type: 'boolean'
    },
    {
      identifier: 'includeTimeZone',
      label: 'Include Time Zone',
      type: 'boolean'
    }
  ]
})()
