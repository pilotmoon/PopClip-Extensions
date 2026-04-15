// #popclip
// name: Alphagram
// identifier: com.pilotmoon.popclip.extension.alphagram
// popclip version: 4688
// icon: square filled AZ
// description: Sort or scramble the letters of the selected text.

defineExtension({
  actions: [
    {
      title: "Alphagram",
      icon: "square filled AZ",
      code: (input) => {
        popclip.pasteText(makeAlphagram(input.text));
      },
    },
    {
      title: "Scramble",
      icon: "symbol:shuffle",
      code: (input) => {
        popclip.pasteText(scrambleText(input.text));
      },
    },
  ],
  test: runAlphagramTests,
});

function makeAlphagram(text: string): string {
  return transformGraphemes(text, (graphemes) =>
    graphemes.toSorted(compareCharacters),
  );
}

function scrambleText(text: string): string {
  return transformGraphemes(text, (graphemes) => {
    const shuffled = [...graphemes];
    shuffleCharacters(shuffled);
    return shuffled;
  });
}

function transformGraphemes(
  text: string,
  transform: (graphemes: string[]) => string[],
): string {
  const graphemes = segmentGraphemes(text);
  const output: string[] = [];
  let currentSet: string[] = [];

  for (const grapheme of graphemes) {
    if (isSetMarker(grapheme)) {
      output.push(transformSet(currentSet, transform), grapheme);
      currentSet = [];
    } else {
      currentSet.push(grapheme);
    }
  }

  output.push(transformSet(currentSet, transform));
  return output.join("");
}

function segmentGraphemes(text: string): string[] {
  return Array.from(
    new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text),
    ({ segment }) => segment,
  );
}

function transformSet(
  graphemes: string[],
  transform: (graphemes: string[]) => string[],
): string {
  const indices: number[] = [];
  const selected: string[] = [];

  graphemes.forEach((grapheme, index) => {
    if (isTransformable(grapheme)) {
      indices.push(index);
      selected.push(grapheme.toLocaleUpperCase());
    }
  });

  if (selected.length === 0) {
    return graphemes.join("");
  }

  const transformed = selected.length < 2 ? selected : transform(selected);
  const output = [...graphemes];
  indices.forEach((index, transformedIndex) => {
    output[index] = transformed[transformedIndex];
  });
  return output.join("");
}

function isSetMarker(grapheme: string): boolean {
  return grapheme === " " || /[\r\n]/u.test(grapheme);
}

function isTransformable(grapheme: string): boolean {
  return /\p{L}/u.test(grapheme);
}

function compareCharacters(a: string, b: string): number {
  return (
    a.localeCompare(b, undefined, {
      sensitivity: "base",
    }) || a.localeCompare(b)
  );
}

// Random integer in the range [0, 0xffffffff]
function alphagramRandomUint32(): number {
  const randomArray = new Uint32Array(1);
  util.getRandomValues(randomArray);
  return randomArray[0];
}

// Generate a random integer in the range [0, max] with uniform distribution
// avoiding modulo bias.
function alphagramRandomUniform(max: number): number {
  const uint32Max = 0xffffffff;
  if (!Number.isSafeInteger(max) || max < 0 || max > uint32Max) {
    throw new Error("max must be a non-negative 32-bit integer");
  }

  const upperBound = max + 1;
  const min = (uint32Max + 1) % upperBound;

  while (true) {
    const randomValue = alphagramRandomUint32();
    if (randomValue >= min) {
      return randomValue % upperBound;
    }
  }
}

function shuffleCharacters<T>(array: T[]): void {
  for (let index = array.length - 1; index > 0; index--) {
    const otherIndex = alphagramRandomUniform(index);
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]];
  }
}

/*
Terminal command to run this test:
    /Applications/PopClip.app/Contents/MacOS/PopClip run Config.ts test
*/
function runAlphagramTests() {
  assertEqual(makeAlphagram("for example"), "FOR AEELMPX", "alphagram by word");
  assertEqual(
    makeAlphagram("for\nexample"),
    "FOR\nAEELMPX",
    "alphagram by line",
  );
  assertEqual(
    makeAlphagram("e\u0301lan vital"),
    "AE\u0301LN AILTV",
    "grapheme clusters stay intact",
  );

  assertScramblePreservesSets("for example");
  assertScramblePreservesSets("for\nexample");

  const sampleInputs = [
    "",
    "a1",
    "tea",
    "tea time!",
    "élan vital",
    "e\u0301lan vital",
    "straße 2",
    "A1 B2",
    "line one\nline two",
    "for example",
    "for\nexample",
  ];

  for (const input of sampleInputs) {
    print({
      input,
      alphagram: makeAlphagram(input),
      scramble: scrambleText(input),
    });
  }
}

function assertScramblePreservesSets(input: string) {
  const output = scrambleText(input);
  const inputChunks = partitionBySetMarkers(input);
  const outputChunks = partitionBySetMarkers(output);

  assertEqual(
    String(outputChunks.length),
    String(inputChunks.length),
    `chunk count for ${JSON.stringify(input)}`,
  );

  inputChunks.forEach((inputChunk, index) => {
    const outputChunk = outputChunks[index];
    if (isSetMarker(inputChunk)) {
      assertEqual(
        outputChunk,
        inputChunk,
        `marker chunk ${index} for ${JSON.stringify(input)}`,
      );
      return;
    }
    assertEqual(
      letterSignature(outputChunk),
      letterSignature(inputChunk),
      `letter signature for chunk ${index} of ${JSON.stringify(input)}`,
    );
  });
}

function partitionBySetMarkers(text: string): string[] {
  const chunks: string[] = [];
  let currentChunk = "";
  let currentChunkIsMarker: boolean | undefined;

  for (const grapheme of segmentGraphemes(text)) {
    const graphemeIsMarker = isSetMarker(grapheme);
    if (
      currentChunkIsMarker === undefined ||
      graphemeIsMarker === currentChunkIsMarker
    ) {
      currentChunk += grapheme;
    } else {
      chunks.push(currentChunk);
      currentChunk = grapheme;
    }
    currentChunkIsMarker = graphemeIsMarker;
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

function letterSignature(text: string): string {
  return segmentGraphemes(text)
    .filter(isTransformable)
    .map((grapheme) => grapheme.toLocaleUpperCase())
    .toSorted(compareCharacters)
    .join("");
}

function assertEqual(actual: string, expected: string, label: string) {
  if (actual !== expected) {
    throw new Error(
      `${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(
        actual,
      )}`,
    );
  }
}
