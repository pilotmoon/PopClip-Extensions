"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.action = void 0;
const action = (input, options) => {
    return timeStamp(new Date(), options);
};
exports.action = action;
const timeStamp = (dateObj, options) => {
    if ((options === null || options === void 0 ? void 0 : options.format) === 'iso8601') {
        return dateObj.toISOString();
    }
    else {
        const localeSpecifier = (options === null || options === void 0 ? void 0 : options.format) === 'intl' ? ['zu'] : [];
        const timeSpecifier = (options === null || options === void 0 ? void 0 : options.includeTime) === false ? undefined : '2-digit';
        const timeZoneSpecifier = (options === null || options === void 0 ? void 0 : options.includeTimeZone) === false ? undefined : 'short';
        const tfOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: timeSpecifier,
            minute: timeSpecifier,
            second: timeSpecifier,
            timeZoneName: timeZoneSpecifier
        };
        return new Intl.DateTimeFormat(localeSpecifier, tfOptions).format(dateObj);
    }
};
exports.options = (() => {
    const now = new Date();
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
    ];
})();
