function capitalizeWord(text) {
  text = text.toLowerCase(); // first letter uppercase, others lowercase
  return text.substr(0, 1).toUpperCase() + text.substr(1);
}

function capitalizeAll(text) {
  const regex = /(\p{L}+['’]\p{L}+|\p{L}+)/gu; // split into something approximating words
  return text.replace(regex, (match) => capitalizeWord(match));
}

exports.action = (input) => {
  popclip.pasteText(capitalizeAll(input.text));
};

function test() {
  const data = [
    ["blah", "Blah"],
    ["BLAH", "Blah"],
    ["'BLAH-blah'", "'Blah-Blah'"],
    ["\"BLAH-blah'", "\"Blah-Blah'"],
    ["  BLAH (blah-more", "  Blah (Blah-More"],
    ["élan güt написанная!", "Élan Güt Написанная!"],
    ["\"Nick's best dog's fur\"", "\"Nick's Best Dog's Fur\""],
    ["Nick's   best dog's fur", "Nick's   Best Dog's Fur"],
    ["😀nick's   best dog’s fur", "😀Nick's   Best Dog’s Fur"],
  ];
  data.forEach((pair) => {
    const [input, output] = pair;
    const result = capitalizeAll(input);
    print(
      `${
        output === result ? "pass  " : "fail *"
      } ${input} => ${result} (expected: ${output})`,
    );
  });
}
// test();
