"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var superagent = require("superagent");
var starIcon = "svg:\n<svg enable-background=\"new 0 0 510 510\" version=\"1.1\" viewBox=\"0 0 510 510\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\">\n<polygon points=\"255 402.21 412.59 497.25 370.9 318.01 510 197.47 326.63 181.74 255 12.75 183.37 181.74 0 197.47 139.1 318.01 97.41 497.25\"/>\n</svg>\n";
defineExtension({
    icon: starIcon,
    name: {
        en: 'Test the JS plz',
        fr: 'Test SVP',
        pt: 'test pt',
        'pt-BR': 'test BRAZIL',
        'en-GB': 'alright guvna',
        'zh-Hans': '你好'
    },
    // options: [
    //   {
    //     identifier: 'test',
    //     type: 'boolean',
    //     label: 'useless'
    //   }
    // ],
    actions: [
        {
            title: 'Show Success',
            icon: 'symbol:checkmark',
            code: function (selection) {
                popclip.showSuccess();
            }
        }, {
            title: 'Show Success Async',
            icon: 'symbol:checkmark.circle',
            code: function (selection) {
                setTimeout(function () {
                    popclip.showSuccess();
                }, 1000);
            }
        }, {
            title: 'Timer 5s',
            icon: 'text:(5s)',
            code: function (selection) {
                setTimeout(function () {
                    print('5s timer fired');
                }, 5000);
            }
        }, {
            title: 'HTTP',
            icon: 'symbol:hand.raised',
            code: function (selection) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = print;
                                return [4 /*yield*/, axios_1.default.get('http://sabnzbd.org/tests/internetspeed/10MB.bin')];
                            case 1:
                                _a.apply(void 0, [(_b.sent()).statusText]);
                                return [2 /*return*/];
                        }
                    });
                });
            }
        }, {
            title: 'Large File',
            icon: 'symbol:bus.fill',
            code: function (selection) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = popclip).showText;
                                return [4 /*yield*/, axios_1.default.get('https://sabnzbd.org/tests/internetspeed/10MB.bin')];
                            case 1:
                                _b.apply(_a, [(_c.sent()).statusText]);
                                return [2 /*return*/];
                        }
                    });
                });
            }
        }, {
            title: 'Large File with timeout',
            icon: 'symbol:clock',
            code: function (selection) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                // https://stackoverflow.com/questions/100841/artificially-create-a-connection-timeout-error
                                _b = (_a = popclip).showText;
                                return [4 /*yield*/, axios_1.default.get('https://10.255.255.1/')];
                            case 1:
                                // https://stackoverflow.com/questions/100841/artificially-create-a-connection-timeout-error
                                _b.apply(_a, [(_c.sent()).statusText]);
                                return [2 /*return*/];
                        }
                    });
                });
            }
        }, {
            title: 'Example.com',
            icon: 'symbol:seal',
            code: function (selection) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = print;
                                return [4 /*yield*/, axios_1.default.get('https://example.com/')];
                            case 1:
                                _a.apply(void 0, [(_b.sent()).statusText]);
                                return [2 /*return*/];
                        }
                    });
                });
            }
        }, {
            title: 'Example.com 404',
            icon: 'symbol:nosign',
            code: function (selection) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = print;
                                return [4 /*yield*/, axios_1.default.get('https://example.com/sdkfjhdkjf')];
                            case 1:
                                _a.apply(void 0, [(_b.sent()).statusText]);
                                return [2 /*return*/];
                        }
                    });
                });
            }
        }, {
            title: '301 Redirect',
            icon: 'symbol:arrowshape.bounce.right',
            code: function (selection) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = print;
                                return [4 /*yield*/, axios_1.default.get('https://pilotmoon.com/link/popclip')];
                            case 1:
                                _a.apply(void 0, [(_b.sent()).statusText]);
                                return [2 /*return*/];
                        }
                    });
                });
            }
        }, {
            title: 'JSON',
            icon: 'symbol:number',
            code: function (selection) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = print;
                                return [4 /*yield*/, axios_1.default.get('https://dog.ceo/api/breeds/image/random')];
                            case 1:
                                _a.apply(void 0, [(_b.sent()).statusText]);
                                return [2 /*return*/];
                        }
                    });
                });
            }
        }, {
            title: 'Settings',
            icon: 'symbol:gear',
            code: function (selection) {
                popclip.showSettings();
            }
        }, {
            title: 'POST JSON',
            icon: 'symbol:signpost.right',
            code: function (selection) {
                return __awaiter(this, void 0, void 0, function () {
                    var info, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                info = {
                                    name: 'zzzzz',
                                    job: 'ZZ66'
                                };
                                _a = print;
                                return [4 /*yield*/, axios_1.default.post('https://reqres.in/api/users', info)];
                            case 1:
                                _a.apply(void 0, [(_b.sent()).statusText]);
                                return [2 /*return*/];
                        }
                    });
                });
            }
        }, {
            title: 'POST superagent',
            icon: 'symbol:signpost.left',
            code: function (selection) {
                return __awaiter(this, void 0, void 0, function () {
                    var info, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                info = {
                                    name: 'yyyyy',
                                    job: 'QY77'
                                };
                                return [4 /*yield*/, superagent.post('https://reqres.in/api/users').send(info)];
                            case 1:
                                res = _a.sent();
                                print(res);
                                print({ myFunc: function () { } });
                                return [2 /*return*/];
                        }
                    });
                });
            }
        }
    ]
});
// var xhr = new XMLHttpRequest()
// xhr.onreadystatechange = function handleLoad () {
//   if (!this.xhr || this.xhr.readyState !== 4) {
//     return
//   }
//   print(this.xhr.responseText)
//   //xhr = null
// }
// xhr.open('GET', 'https://www.example.org/example.txt')
// xhr.send()
// superagent
//   .get('https://xkcd.com/')
//   .end((err, res) => {
//     if (err) {
//       print('errrorrrr')
//     } else {
//       //print(res.text)
//       print('gotit')
//     }
//   })
// promise with async/await
// (async () => {
//   try {
//     const res = await superagent.get('https://xkcd.com/')
//     print(res)
//   } catch (err) {
//     print(err)
//   }
// })().catch(error => {
//   print('onrs', error)
// })c
// (async () => {
//   try {
//     const response = await axios.get('https://sabnzbd.org/tests/internetspeed/50MB.bin')
//     print(response.request.status)
//   } catch (err) {
//     print(err)
//   }
// })().catch(error => {
//   print('onra', error)
// })
// http().then(value => {
//   print('ok', value)
// }, error => {
//   print('error', error)
// })
// let hello = require('hello');
// let cj = require('./Config.json');
// let turndown = require('turndown');
// const to = 5000
// print('setting timeout', to)
// const id = setTimeout(() => {
//   print('second')
// }, to)
// setTimeout(() => {
//   print('first')
// }, 2000)
// }
