function sentenceCase(text) {
  const regex = /(^\s*\p{L}{1}|[.?!]\s+\p{L}{1})/gu; // split into something approximating sentences
  text = text.toLowerCase();
  return text.replace(regex, (match) => match.toUpperCase());
}

exports.action = (input) => {
  popclip.pasteText(sentenceCase(input.text));
};

function test() {
  const data = [
    ["blah", "Blah"],
    ["BLAH. blah.", "Blah. Blah."],
    ["  BLAH blah? BHAL.\nff", "  Blah blah? Bhal.\nFf"],
    ["BLAH (blah-more", "Blah (blah-more"],
    ["élan fdf? написанная! OK", "Élan fdf? Написанная! Ok"],

    ["Nick's   best dog's fur", "Nick's   best dog's fur"],
  ];
  data.forEach((pair) => {
    const [input, output] = pair;
    const result = sentenceCase(input);
    print(
      `${
        output === result ? "pass  " : "fail *"
      } ${input} => ${result} (expected: ${output})`,
    );
  });
}
// test();
