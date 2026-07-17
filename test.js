const fs = require('fs');
const code = fs.readFileSync('/Users/tnl-loso/Desktop/PopClip-Extensions/contrib/CurrencyConverter.popclipext/currency-converter.js', 'utf8');

// evaluate the functions
eval(code.replace('exports.actions = ', 'const actions = '));

console.log("TEST 1:", parseCurrency("122,850JPY"));
console.log("TEST 2:", parseCurrency("122,850 JPY"));
