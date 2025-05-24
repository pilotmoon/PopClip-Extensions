import Translator = require("latextomathml");

export const action: ActionFunction = (input) => {
  popclip.pasteText(convert(input.text));
};

function convert(latex: string) {
  return Translator.LaTeXtoMathML(latex);
}

export function test() {
  print(convert("x^2 + y^2 = z^2"));
}
