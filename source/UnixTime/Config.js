const defaultTimezone = 'UTC';

const convert = (selection) => {
	const seconds = selection.replace(/\s/g, ''); // remove spaces;
	const milliseconds = 1000;
	const [date, time] = new Date(seconds * milliseconds).toISOString().split(/[.T]/);

	return `${date} ${time} ${defaultTimezone}`
}

module.exports = {
	action(selection) {
		popclip.showText(convert(selection.text))
	},
	icon: "UnixTime.png",
	test: convert
}