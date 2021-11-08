#!/usr/bin/env node
const stdin = process.stdin;
// const args = process.argv.slice(2)
const chunks = [];
stdin.on('readable', () => {
    let chunk;
    while ((chunk = stdin.read()) !== null) {
        chunks.push(chunk);
    }
});
stdin.on('end', () => {
    convert(chunks.join(''));
});
function convert(jsonConfig) {
    console.log(jsonConfig);
    return '';
}
