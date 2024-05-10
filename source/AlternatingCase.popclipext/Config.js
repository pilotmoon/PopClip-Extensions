// #popclip
// name: Alternating Case
// identifier: com.pilotmoon.popclip.extension.alternating-case
// description: Change the text to AlTeRnAtInG CaSe, with optional randomness.
// icon: noun_sponge_575115.svg
// popclipVersion: 4151

/**
 * Make characters alternately upper/lower case, with optional randomness sprinkled in.
 */
function alternatingCase(string, randomness) {
  function rnd() {
    return randomness ? Math.random() : 0;
  }
  function start() {
    return rnd() < 0.5 ? 0 : 1;
  }
  function step() {
    const x = rnd();
    if (x < 0.8) return 2;
    if (x < 0.9) return 3;
    return 1;
  }
  const characters = string.toLowerCase().split("");
  for (let item = start(); item < characters.length; item += step()) {
    characters[item] = characters[item].toUpperCase();
  }
  return characters.join("");
}

module.exports = {
  action: (selection, options) => {
    popclip.pasteText(
      alternatingCase(selection.text, options.randomness),
    );
  },
  options: [
    {
      identifier: "randomness",
      label: "Add Randomness",
      type: "boolean",
    },
  ],
};
