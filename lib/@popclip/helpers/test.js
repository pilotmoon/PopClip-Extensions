"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("./index");
Object.keys(utils).forEach(function (key) {
    const f = utils[key];
    if (typeof (f.test) === 'function') {
        print('* testing', f.name);
        f.test();
    }
});
