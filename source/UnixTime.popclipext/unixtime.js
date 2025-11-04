// const { LOCALES, TIMEZONES } = require("./constants")
// NM: remove the additional constants list
const LOCALES = new Map();
const TIMEZONES = new Map();

const defaultTimezone = ["UTC", "Coordinated Universal Time"];
// This is Zulu; there isn't really an ISO locale. But it gets us YYYY-MM-DD HH:MM:SS
const defaultLocale = ["zu", "International Standard"];

// Used to unset params if it's chosen, allowing environment defaults to be used.
const systemSetting = ["", "System"];

// Detect if input is a date string or Unix timestamp
const isDateString = (input) => {
	const cleaned = input.trim();
	// If it contains date separators or is clearly a date format
	if (/[-\/]/.test(cleaned) || /^\+\d+-\d+-\d+/.test(cleaned) || /^\d{4}-\d+-\d+/.test(cleaned)) {
		return true;
	}
	// If it's all digits (possibly with spaces), treat as Unix timestamp
	return !/^[\d\s+-]+$/.test(cleaned);
}

// Parse date string to Date object
const parseDateString = (dateString) => {
	// Remove UTC timezone indicator if present
	let cleaned = dateString.trim().replace(/\s*UTC\s*$/i, '');
	
	// Handle extended year format with + sign (e.g., +057813-12-18 13:41:53)
	if (cleaned.startsWith('+')) {
		// Remove the + sign for parsing
		cleaned = cleaned.substring(1);
	}
	
	// Try to parse the date string
	const date = new Date(cleaned);
	
	// Validate the date
	if (isNaN(date.getTime())) {
		throw new Error(`Invalid date string: ${dateString}`);
	}
	
	return date;
}

const process = (selection, options) => {
	const trimmed = selection.trim();
	
	let date;
	
	// Detect if input is a date string or Unix timestamp
	if (isDateString(trimmed)) {
		// Parse as date string
		date = parseDateString(trimmed);
	} else {
		// Parse as Unix timestamp
		const unixTime = trimmed.replace(/\s/g, ''); // remove spaces
		date = convert(unixTime);
	}

	// Validate date
	if (isNaN(date.getTime())) {
		throw new Error(`Invalid input: ${trimmed}`);
	}

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
	// Remove any non-numeric characters except +, -, and spaces
	const cleaned = unixTime.replace(/[^\d\s+-]/g, '').replace(/\s/g, '');
	const timestamp = parseFloat(cleaned);
	
	if (isNaN(timestamp)) {
		throw new Error(`Invalid Unix timestamp: ${unixTime}`);
	}
	
	// Auto-detect if timestamp is in seconds or milliseconds
	// Unix timestamps in seconds are typically 10 digits (up to year 2286)
	// Unix timestamps in milliseconds are typically 13 digits (up to year 2286)
	// If timestamp is >= 1e12 (1 trillion), it's likely in milliseconds
	// If timestamp is < 1e12, it's likely in seconds
	const isMilliseconds = timestamp >= 1e12;
	
	if (isMilliseconds) {
		// Already in milliseconds, use directly
		return new Date(timestamp);
	} else {
		// Convert seconds to milliseconds
		return new Date(timestamp * 1000);
	}
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
		try {
			const result = process(selection.text, options);
			popclip.copyText(result);
			popclip.showText(result);
		} catch (error) {
			popclip.showText(`Error: ${error.message}`);
		}
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