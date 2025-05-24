// const { LOCALES, TIMEZONES } = require("./constants")
// NM: remove the additional constants list
const LOCALES = new Map();
const TIMEZONES = new Map();

const defaultTimezone = ["UTC", "Coordinated Universal Time"];
// This is Zulu; there isn't really an ISO locale. But it gets us YYYY-MM-DD HH:MM:SS
const defaultLocale = ["zu", "International Standard"];

// Used to unset params if it's chosen, allowing environment defaults to be used.
const systemSetting = ["", "System"];

const process = (selection, options) => {
	const unixTime = selection.replace(/\s/g, ''); // remove spaces;
	const date = convert(unixTime);

	const custom_settings = (options.timeZone !== defaultTimezone[0] || options.locale !== defaultLocale[0])
	if (custom_settings) {
		const formatOptions = Object.fromEntries([["timeZone", options.timeZone]].filter(([k, v]) => v !== ""));
		const localeOptions = [options.locale].filter(v => v !== "");
		const custom = buildFormat(localeOptions, formatOptions);

		return custom.format(date)
	}

	return standardize(date, true)
}

const convert = (unixTime) => {
	const seconds = unixTime;
	const milliseconds = 1000;
	return new Date(seconds * milliseconds)
}

const standardize = (date, clean = false) => {
	const standardDate = date.toISOString();
	if (clean) {
		const [date, time] = standardDate.split(/[.T]/);
		return `${date} ${time} ${defaultTimezone[0]}`
	}
	return standardDate
}

const buildFormat = (locales = [], custom_options = {}) => {
	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZoneName: 'short',
	};
	Object.entries(custom_options).forEach(([key, value]) => options[key] = value);
	return new Intl.DateTimeFormat(locales, options)
}

module.exports = {
	action(selection, context, options) {
		popclip.showText(process(selection.text, options))
	},
	icon: "UnixTime.png",
	options: [
		{
			identifier: 'locale',
			label: 'Date & Time Format',
			type: 'multiple',
			values: [defaultLocale[0], systemSetting[0]].concat(Array.from(LOCALES.keys())),
			valueLabels: [defaultLocale[1], systemSetting[1]].concat(Array.from(LOCALES.values()))
		},
		{
			identifier: 'timeZone',
			label: 'Time Zone',
			type: 'multiple',
			values: [defaultTimezone[0], systemSetting[0]].concat(Array.from(TIMEZONES.values())),
			valueLabels: [defaultTimezone[1], systemSetting[1]].concat(Array.from(TIMEZONES.keys()))
		}
	],
	test: process
}