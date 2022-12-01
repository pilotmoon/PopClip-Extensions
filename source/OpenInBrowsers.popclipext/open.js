"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.apps = exports.options = void 0;
const browsers_json_1 = require("./browsers.json");
function makeOption(browser) {
    const option = {
        identifier: browser.bundleId,
        label: browser.name,
        type: 'boolean',
        icon: browser.icon,
        defaultValue: browser.defaultEnabled === true
    };
    return option;
}
function makeAction(browser) {
    const action = {
        title: 'Open in ' + browser.name,
        icon: browser.icon,
        code: input => {
            for (const url of input.data.urls) {
                popclip.openUrl(url, { app: browser.bundleId });
            }
            return null;
        }
    };
    return action;
}
function makeApp(browser) {
    const app = {
        name: browser.name,
        link: browser.link,
        bundleIdentifiers: [browser.bundleId],
        checkInstalled: true
    };
    return app;
}
// return options with title
exports.options = [{
        identifier: 'heading',
        label: 'Enabled Browsers',
        type: 'heading'
    }, ...browsers_json_1.browsers.map(makeOption)];
// return apps list
exports.apps = browsers_json_1.browsers.map(makeApp);
// dynamically generate the actions
const actions = (input, options, context) => {
    return browsers_json_1.browsers.filter(browser => {
        return options[browser.bundleId] === true && context.appIdentifier !== browser.bundleId;
    }).map(makeAction);
};
exports.actions = actions;
