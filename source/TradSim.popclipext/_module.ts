import s2tChar from "./dict/s2t-char.json";
import s2tPhrase from "./dict/s2t-phrase.json";
import t2sChar from "./dict/t2s-char.json";
import t2sPhrase from "./dict/t2s-phrase.json";

// We import these separately as the `tongwen-core` package exports
// constants from the "walker" component, which references NodeFilter from the browser
// environment and this causes an error when loaded into PopClip.
import { createConverterMap } from "tongwen-core/esm/converter";
import { LangType } from "tongwen-core/esm/dictionary";

const S_ICON = "简";
const S_TITLE = "Convert to Simplified";
const T_ICON = "繁";
const T_TITLE = "Convert to Traditional";
const MODE_LABEL = "Conversion Mode";

export const options = [
  {
    identifier: "showSimplified",
    label: S_TITLE,
    icon: S_ICON,
    type: "boolean",
  },
  {
    identifier: "showTraditional",
    label: T_TITLE,
    icon: T_ICON,
    type: "boolean",
  },
  {
    identifier: "conversionMode",
    label: MODE_LABEL,
    type: "multiple",
    values: ["phrase", "char"],
    "value labels": ["Phrase", "Character"],
    "default value": "phrase",
  },
] as const;
type Options = InferOptions<typeof options>;

const mConv = createConverterMap({
  s2t: [s2tChar, s2tPhrase],
  t2s: [t2sChar, t2sPhrase],
});

function convertText(type: LangType, text: string, options: Options) {
  return options.conversionMode === "char"
    ? mConv.char(type, text)
    : mConv.phrase(type, text);
}

function toSimplified(text: string, options: Options) {
  return convertText(LangType.t2s, text, options);
}
function toTraditional(text: string, options: Options) {
  return convertText(LangType.s2t, text, options);
}

export const actions: Action[] = [
  {
    icon: S_ICON,
    title: S_TITLE,
    requirements: ["option-showSimplified=1"],
    code(input, options) {
      popclip.pasteText(toSimplified(input.text, options));
    },
  },
  {
    icon: T_ICON,
    title: T_TITLE,
    requirements: ["option-showTraditional=1"],
    code(input, options) {
      popclip.pasteText(toTraditional(input.text, options));
    },
  },
];

const T_SAMPLE = `人人生而自由﹐在尊嚴和權利上一律平等。他們賦有理性和良心﹐並應以兄弟關係的精神互相對待。`;
const S_SAMPLE = `人人生而自由﹐在尊严和权利上一律平等。他们赋有理性和良心﹐并应以兄弟关系的精神互相对待。`;
export function test() {
  const options = { showSimplified: true, showTraditional: true, conversionMode: "phrase" } as const;
  const s = toSimplified(T_SAMPLE, options);
  const t = toTraditional(S_SAMPLE, options);
  print({ s, t });
  print(s === S_SAMPLE, t === T_SAMPLE);
}
