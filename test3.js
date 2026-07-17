const regex = /(?:^|[^A-Z])([A-Z]{3})(?=$|[^A-Z])/i;
console.log("100JPY:", "100JPY".match(regex)[1]);
console.log("USD 100:", "USD 100".match(regex)[1]);
console.log("TOTAL 100:", "TOTAL 100".match(regex));
