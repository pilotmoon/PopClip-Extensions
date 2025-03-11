// #popclip
// name: Shuffle
// identifier: com.pilotmoon.popclip.extension.shuffle
// popclip version: 4688
// icon: Shuffle.png
// description: Randomize the order of the selected lines.

defineExtension({
  regex: /\n/s, // require inputs with at least two lines
  action: (input) => popclip.pasteText(shuffleLines(input.text)),
  test,
});

// Random integer in the range [0, 0xffffffff]
function randomUint32(): number {
  const randomArray = new Uint32Array(1);
  util.getRandomValues(randomArray);
  return randomArray[0];
}

// Generate a random integer in the range [0, upperBound) with uniform distribution
// avoiding "modulo bias".
// Adapted from https://github.com/openbsd/src/blob/master/lib/libc/crypt/arc4random_uniform.c
function randomUniform(upperBound: number): number {
  if (
    !Number.isSafeInteger(upperBound) ||
    upperBound < 0 ||
    upperBound > 0xffffffff
  ) {
    throw new Error("upper bound must be non-negative 32-bit integer");
  }

  // Short-circuit for degenerate cases
  if (upperBound < 2) {
    return 0;
  }

  // Calculate minimum acceptable value to ensure uniform distribution
  const min = 0x100000000 % upperBound;

  // Keep generating random numbers until we get one in acceptable range
  while (true) {
    const r = randomUint32();
    if (r >= min) {
      return r % upperBound;
    }
  }
}

// Shuffle array in-place using Knuth-Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomUniform(i + 1);
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Split string into lines, shuffle them, and join back into a string
function shuffleLines(text: string) {
  const lines = text.split(/\r?\n/);
  shuffleArray(lines);
  return lines.join("\n");
}

/*
Terminal command to run this test:
    /Applications/PopClip.app/Contents/MacOS/PopClip run Config.ts test
*/
function test() {
  testShuffle();
  testRandomUniform();
}

function testShuffle() {
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

function testRandomUniform() {
  const counts = new Map<number, number>();
  for (let i = 0; i < 1000000; i++) {
    const r = randomUniform(10);
    counts.set(r, (counts.get(r) || 0) + 1);
  }
  // sort by value
  const sortedCounts = Array.from(counts.entries()).sort((a, b) => a[0] - b[0]);
  for (const [value, count] of sortedCounts) {
    print(`${value}: ${count}`);
  }
}
