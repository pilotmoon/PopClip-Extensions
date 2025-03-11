// #popclip
// name: Shuffle
// identifier: com.pilotmoon.popclip.extension.shuffle
// popclip version: 4688
// icon: Shuffle.png
// description: Randomize the order of the selected lines.

// require inputs with at least two lines
export const regex = /\n/s;

// the action
export const action: ActionFunction = (input) => {
  popclip.pasteText(shuffleLines(input.text));
};

// shuffle array in-place using Knuth-Fisher-Yates algorithm
function shuffleArray(array: unknown[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random integer in the range [0, i]
    const randomArray = new Uint32Array(1);
    util.getRandomValues(randomArray);
    const j = randomArray[0] % (i + 1);

    // Swap elements
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// return shuffled lines of the input string
function shuffleLines(text: string) {
  const lines = text.split(/\r?\n/);
  shuffleArray(lines);
  return lines.join("\n");
}

/*
Terminal command to run this test:
    /Applications/PopClip.app/Contents/MacOS/PopClip run Config.ts test
*/
export function test() {
  const inputs = [
    "",
    "Just one line",
    "Line 1\nLine 2\nLine 3",
    "Line A\r\nLine B",
    "Line C\n\nLine D\n",
  ];
  for (const input of inputs) {
    const output = shuffleLines(input);
    print({ input, output });
  }
}
