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
	// Negative numbers are always timestamps (Unix epoch can be before 1970)
	if (cleaned.startsWith('-') && /^-[\d\s]+$/.test(cleaned)) {
		return false;
	}
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
	
	// Unix timestamp standard: seconds since 1970-01-01 (Unix epoch)
	// Optimal detection algorithm combining digit count and date range validation
	// Based on industry standards (epochconverter.com, unixtimestamp.com) and
	// avoiding pitfalls from naive approaches (see Pydantic issue #7940)
	
	// Handle negative timestamps (before 1970) - always treat as seconds
	// Negative timestamps are rarely used in milliseconds in practice
	if (timestamp < 0) {
		return new Date(timestamp * 1000);
	}
	
	// Calculate digit count (handle edge case for 0)
	const digitCount = timestamp === 0 ? 1 : Math.floor(Math.log10(Math.abs(timestamp))) + 1;
	
	// Try both interpretations for ambiguous cases (11-12 digits: seconds vs milliseconds)
	if (digitCount === 11 || digitCount === 12) {
		const dateAsSeconds = new Date(timestamp * 1000);
		const dateAsMilliseconds = new Date(timestamp);
		
		// Validate date ranges: reasonable Unix epoch dates (1970-2300)
		// This prevents false positives for old timestamps in milliseconds
		// Extended to 2300 to handle edge cases like 2286 (max reasonable 10-digit seconds)
		const yearAsSeconds = dateAsSeconds.getFullYear();
		const yearAsMilliseconds = dateAsMilliseconds.getFullYear();
		
		const isValidYear = (year) => year >= 1970 && year <= 2300;
		
		const secondsValid = isValidYear(yearAsSeconds);
		const millisecondsValid = isValidYear(yearAsMilliseconds);
		
		if (millisecondsValid && !secondsValid) {
			// Only milliseconds gives valid date
			return dateAsMilliseconds;
		} else if (secondsValid && !millisecondsValid) {
			// Only seconds gives valid date
			return dateAsSeconds;
		} else if (millisecondsValid && secondsValid) {
			// Both valid - use magnitude heuristic:
			// Threshold: 1e10 (10 billion) - if timestamp is larger, prefer milliseconds
			// This handles cases like 10000000000 (10 billion) where both are valid
			// but milliseconds interpretation is more likely for 11-12 digit numbers > 10 billion
			if (timestamp >= 1e10) {
				return dateAsMilliseconds;
			} else {
				// Prefer seconds (Unix standard) for smaller values
				return dateAsSeconds;
			}
		}
		// Neither valid - fall through to digit count logic
		// If neither gives valid date, prefer milliseconds for 11-12 digits
		// (as they're more likely to be JavaScript timestamps)
		if (digitCount === 11 || digitCount === 12) {
			return dateAsMilliseconds;
		}
	}
	
	// Try both interpretations for ambiguous cases (14-15 digits: milliseconds vs microseconds)
	if (digitCount === 14 || digitCount === 15) {
		const dateAsMilliseconds = new Date(timestamp);
		const dateAsMicroseconds = new Date(timestamp / 1000);
		
		// Validate date ranges: reasonable Unix epoch dates (1970-2300)
		// Extended to 2300 to handle edge cases like 2286 (max reasonable 10-digit seconds)
		const yearAsMilliseconds = dateAsMilliseconds.getFullYear();
		const yearAsMicroseconds = dateAsMicroseconds.getFullYear();
		
		const isValidYear = (year) => year >= 1970 && year <= 2300;
		
		const millisecondsValid = isValidYear(yearAsMilliseconds);
		const microsecondsValid = isValidYear(yearAsMicroseconds);
		
		if (millisecondsValid && !microsecondsValid) {
			// Only milliseconds gives valid date
			return dateAsMilliseconds;
		} else if (microsecondsValid && !millisecondsValid) {
			// Only microseconds gives valid date
			return dateAsMicroseconds;
		} else if (millisecondsValid && microsecondsValid) {
			// Both valid - prefer milliseconds (more common in practice)
			return dateAsMilliseconds;
		}
		// Neither valid - prefer milliseconds for 14-15 digits
		if (digitCount === 14 || digitCount === 15) {
			return dateAsMilliseconds;
		}
	}
	
	// Clear cases based on digit count (industry standard)
	if (digitCount <= 10) {
		// Standard Unix timestamp in seconds
		return new Date(timestamp * 1000);
	} else if (digitCount === 13) {
		// Milliseconds (JavaScript Date format) - clear case
		return new Date(timestamp);
	} else if (digitCount === 16) {
		// Microseconds - convert to milliseconds - clear case
		return new Date(timestamp / 1000);
	} else if (digitCount > 16) {
		// Nanoseconds - convert to milliseconds
		return new Date(timestamp / 1000000);
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