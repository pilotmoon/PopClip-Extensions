var utils = require("../utils.js");
Object.keys(utils).forEach(function (key) {
    const f=utils[key]    
    print("* testing", f.name)
    if (typeof (f.test) === 'function') {
        f.test()
    }
});
