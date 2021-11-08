var utils = require("./utils.js");
if (typeof print === 'undefined') {
    globalThis.print = console.log
}
Object.keys(utils).forEach(function (key) {
    const f=utils[key]    
    print("* testing", f.name)
    if (typeof (f.test) === 'function') {
        f.test()
    }
});
