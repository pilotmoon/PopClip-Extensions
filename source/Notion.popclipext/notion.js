"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const access_json_1 = require("./access.json");
const axios_1 = require("axios");
const martian_1 = require("@tryfabric/martian");
// Notion api root
const notion = axios_1.default.create({ baseURL: 'https://api.notion.com/v1/' });
/*
 Implement authorization flow described in docs:
 https://developers.notion.com/docs/authorization
 */
const auth = async (info, flow) => {
    const { client_id, client_secret } = util.clarify(access_json_1.access);
    const redirect_uri = info.redirect;
    const { code } = await flow(notion.defaults.baseURL + 'oauth/authorize', {
        client_id, redirect_uri, response_type: 'code', owner: 'user'
    }, ['code']);
    const response = await notion.post('oauth/token', { grant_type: 'authorization_code', code, redirect_uri }, { auth: { username: client_id, password: client_secret } });
    return JSON.stringify(response.data);
};
const action = async (input, options, context) => {
    var _a, _b, _c, _d;
    // set up for calling api
    const auth = JSON.parse(options.authsecret);
    notion.defaults.headers.common.Authorization = `Bearer ${auth.access_token}`;
    notion.defaults.headers.common['Notion-Version'] = '2022-06-28';
    const pageName = options.page;
    if (typeof pageName !== 'string' || pageName.length < 1) {
        throw new Error('empty page name specified');
    }
    // search for our page
    let pageId = '';
    const response = await notion.post('search', { query: pageName, filter: { value: 'page', property: 'object' } });
    const pages = response.data.results;
    if (response.data.object === 'list') {
        for (const page of pages) {
            const foundPageName = (_d = (_c = (_b = (_a = page === null || page === void 0 ? void 0 : page.properties) === null || _a === void 0 ? void 0 : _a.title) === null || _b === void 0 ? void 0 : _b.title) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.plain_text;
            print('foundPageName', foundPageName, pageName);
            if (foundPageName === pageName) {
                pageId = page.id;
                print('found', pageId);
            }
        }
    }
    if (pageId === '') {
        throw new Error('could not get a page to add to');
    }
    // append source reference to clipped markdown
    const markdown = popclip.input.markdown + `\n\n— *${makeReference(popclip.context)}* (${timeStamp()})`;
    // convert in to Notion block format
    const blocks = (0, martian_1.markdownToBlocks)(markdown);
    await notion.patch(`blocks/${pageId}/children`, {
        children: blocks
    });
    popclip.showSuccess();
};
// a markdown fragment to represent the clip's source
function makeReference(context) {
    let ref = context.appName.length > 0 ? context.appName : 'unknown source';
    if (context.browserUrl.length > 0) {
        ref = `[${context.browserTitle.length > 0 ? context.browserTitle : context.browserUrl}](${context.browserUrl})`;
    }
    return ref;
}
// current date & time in current locale's format
function timeStamp() {
    return new Intl.DateTimeFormat([], { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date());
}
exports.default = { auth, action };
