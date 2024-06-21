"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// _module.ts
var module_exports = {};
__export(module_exports, {
  actions: () => actions,
  test: () => test
});
module.exports = __toCommonJS(module_exports);
var import_s2t_char = __toESM(require("./dict/s2t-char.json"));
var import_s2t_phrase = __toESM(require("./dict/s2t-phrase.json"));
var import_t2s_char = __toESM(require("./dict/t2s-char.json"));
var import_t2s_phrase = __toESM(require("./dict/t2s-phrase.json"));

// ../../node_modules/tongwen-core/esm/dictionary/shared/to-esmap.js
var toEsMap = function(dic) {
  return new Map(Object.entries(dic));
};

// ../../node_modules/tongwen-core/esm/dictionary/map/index-pack-map.js
var indexMulti = function(multi) {
  return Object.entries(multi).reduce(function(list, _a) {
    var key = _a[0], value = _a[1];
    var index = key.substring(0, 2);
    var indexed = list.get(index) || (list.set(index, { max: 0, indies: /* @__PURE__ */ new Map() }), list.get(index));
    key.length > indexed.max && (indexed.max = key.length);
    indexed.indies.set(key, value);
    return list;
  }, /* @__PURE__ */ new Map());
};
var indexSuit = function(_a) {
  var single = _a.single, multi = _a.multi;
  return {
    single: toEsMap(single),
    multi: indexMulti(multi)
  };
};
var indexPackMap = function(_a) {
  var s2t = _a.s2t, t2s = _a.t2s;
  return {
    s2t: indexSuit(s2t),
    t2s: indexSuit(t2s)
  };
};

// ../../node_modules/tongwen-core/esm/dictionary/shared/group-pack.js
var __spreadArray = function(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
    to[j] = from[i];
  return to;
};
var mergeList = function(list) {
  return Object.assign.apply(Object, __spreadArray([{}], list));
};
var group = function(words) {
  return Object.entries(words).reduce(function(grouped, _a) {
    var key = _a[0], value = _a[1];
    return key.length > 1 ? (grouped.multi[key] = value, grouped) : (grouped.single[key] = value, grouped);
  }, { single: {}, multi: {} });
};
var groupPack = function(src) {
  return {
    s2t: group(mergeList(src.s2t)),
    t2s: group(mergeList(src.t2s))
  };
};

// ../../node_modules/tongwen-core/esm/dictionary/create-dic.js
var createDicMap = function(src) {
  return indexPackMap(groupPack(src));
};

// ../../node_modules/tongwen-core/esm/converter/shared/is-empty.js
var isNotString = function(v) {
  return typeof v !== "string";
};
var isEmptyString = function(str) {
  return str.trim() === "";
};
var isEmpty = function(v) {
  return isNotString(v) || isEmptyString(v);
};

// ../../node_modules/tongwen-core/esm/converter/map/convert-char.js
var convert = function(dic, text) {
  var converted = "";
  for (var pointer = 0; pointer < text.length; pointer++) {
    converted += dic.get(text[pointer]) || text[pointer];
  }
  return converted;
};
var convertChar = function(_a, text) {
  var single = _a.single;
  return isEmpty(text) ? "" : convert(single, text);
};

// ../../node_modules/tongwen-core/esm/converter/map/convert-phrase.js
var convert2 = function(_a, text) {
  var single = _a.single, multi = _a.multi;
  var converted = "";
  var textLength = text.length;
  for (var pointer = 0; pointer < textLength; pointer++) {
    var index = text.substring(pointer, pointer + 2);
    var indexed = multi.get(index);
    var isFound = false;
    if (indexed) {
      var sliceLength = Math.min(textLength - pointer, indexed.max);
      for (; sliceLength > 1; sliceLength--) {
        var toMap = text.substring(pointer, pointer + sliceLength);
        if (indexed.indies.has(toMap)) {
          converted += indexed.indies.get(toMap);
          pointer += sliceLength - 1;
          isFound = true;
          break;
        }
      }
      !isFound && (converted += single.get(text[pointer]) || text[pointer]);
    } else {
      converted += single.get(text[pointer]) || text[pointer];
    }
  }
  return converted;
};
var convertPhrase = function(pack, text) {
  return isEmpty(text) ? "" : convert2(pack, text);
};

// ../../node_modules/tongwen-core/esm/converter/map/create-converter-map.js
var createConverterMap = function(src) {
  var dic = createDicMap(src || { s2t: [], t2s: [] });
  var set = function(src2) {
    return dic = createDicMap(src2), void 0;
  };
  var char = function(type, text) {
    return convertChar(dic[type], text);
  };
  var phrase = function(type, text) {
    return convertPhrase(dic[type], text);
  };
  return { set, char, phrase };
};

// ../../node_modules/tongwen-core/esm/dictionary/type.js
var LangType;
(function(LangType2) {
  LangType2["s2t"] = "s2t";
  LangType2["t2s"] = "t2s";
})(LangType || (LangType = {}));

// _module.ts
var mConv = createConverterMap({
  s2t: [import_s2t_char.default, import_s2t_phrase.default],
  t2s: [import_t2s_char.default, import_t2s_phrase.default]
});
function toSimplified(text) {
  return mConv.phrase(LangType.t2s, text);
}
function toTraditional(text) {
  return mConv.phrase(LangType.s2t, text);
}
var actions = [
  {
    icon: "\u7B80",
    title: "Convert to Simplified Chinese",
    code(input) {
      popclip.pasteText(toSimplified(input.text));
    }
  },
  {
    icon: "\u7E41",
    title: "Convert to Traditional Chinese",
    code(input) {
      popclip.pasteText(toTraditional(input.text));
    }
  }
];
var T_SAMPLE = `\u4EBA\u4EBA\u751F\u800C\u81EA\u7531\uFE50\u5728\u5C0A\u56B4\u548C\u6B0A\u5229\u4E0A\u4E00\u5F8B\u5E73\u7B49\u3002\u4ED6\u5011\u8CE6\u6709\u7406\u6027\u548C\u826F\u5FC3\uFE50\u4E26\u61C9\u4EE5\u5144\u5F1F\u95DC\u4FC2\u7684\u7CBE\u795E\u4E92\u76F8\u5C0D\u5F85\u3002`;
var S_SAMPLE = `\u4EBA\u4EBA\u751F\u800C\u81EA\u7531\uFE50\u5728\u5C0A\u4E25\u548C\u6743\u5229\u4E0A\u4E00\u5F8B\u5E73\u7B49\u3002\u4ED6\u4EEC\u8D4B\u6709\u7406\u6027\u548C\u826F\u5FC3\uFE50\u5E76\u5E94\u4EE5\u5144\u5F1F\u5173\u7CFB\u7684\u7CBE\u795E\u4E92\u76F8\u5BF9\u5F85\u3002`;
function test() {
  const s = toSimplified(T_SAMPLE);
  const t = toTraditional(S_SAMPLE);
  print({ s, t });
  print(s === S_SAMPLE, t === T_SAMPLE);
}
