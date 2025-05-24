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
] as const;
type Options = InferOptions<typeof options>;

const mConv = createConverterMap({
  s2t: [s2tChar, s2tPhrase],
  t2s: [t2sChar, t2sPhrase],
});

function toSimplified(text: string) {
  return mConv.phrase(LangType.t2s, text);
}
function toTraditional(text: string) {
  return mConv.phrase(LangType.s2t, text);
}

export const actions: Action[] = [
  {
    icon: S_ICON,
    title: S_TITLE,
    requirements: ["option-showSimplified=1"],
    code(input) {
      popclip.pasteText(toSimplified(input.text));
    },
  },
  {
    icon: T_ICON,
    title: T_TITLE,
    requirements: ["option-showTraditional=1"],
    code(input) {
      popclip.pasteText(toTraditional(input.text));
    },
  },
];

const T_SAMPLE = `人人生而自由﹐在尊嚴和權利上一律平等。他們賦有理性和良心﹐並應以兄弟關係的精神互相對待。`;
const S_SAMPLE = `人人生而自由﹐在尊严和权利上一律平等。他们赋有理性和良心﹐并应以兄弟关系的精神互相对待。`;
export function test() {
  const s = toSimplified(T_SAMPLE);
  const t = toTraditional(S_SAMPLE);
  print({ s, t });
  print(s === S_SAMPLE, t === T_SAMPLE);
}
