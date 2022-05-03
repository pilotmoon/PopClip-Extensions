// Knuth-Fisher-Yates shuffle algorithm.
// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// see also https://blog.codinghorror.com/the-danger-of-naivete/
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const lines = popclip.input.text.match(/[^\r\n]+/g)
shuffleArray(lines)
popclip.pasteText(lines.join('\n'))
