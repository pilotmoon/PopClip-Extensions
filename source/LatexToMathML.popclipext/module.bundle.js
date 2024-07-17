"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/latextomathml/latextomathml.js
var require_latextomathml = __commonJS({
  "../../node_modules/latextomathml/latextomathml.js"(exports) {
    var LaTeX = [
      {
        type: "struct",
        Latex: /\\autorightleftharpoons<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<munderover><mo d='&#x21CC;'></mo><mrow>$4</mrow><mrow>$2</mrow></munderover>"
      },
      {
        type: "struct",
        Latex: /\\underleftrightarrow<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<munder accentunder='true'><mrow>$2</mrow><mo stretchy='true' d='&#x2194;'></mo></munder>"
      },
      {
        type: "struct",
        Latex: /\\autorightleftarrows<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<munderover><mo d='&#x21C4;'></mo><mrow>$4</mrow><mrow>$2</mrow></munderover>"
      },
      {
        type: "struct",
        Latex: /\\autoleftrightarrow<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<munderover><mo d='&#x2194;'></mo><mrow>$4</mrow><mrow>$2</mrow></munderover>"
      },
      {
        type: "struct",
        Latex: /\\overleftrightarrow<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mrow>$2</mrow><mo stretchy='true' d='&#x2194;'></mo></mover>"
      },
      {
        type: "struct",
        Latex: /\\Longleftrightarrow<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<munderover><mo d='&#x21C4;'></mo><mrow>$4</mrow><mrow>$2</mrow></munderover>"
      },
      {
        type: "struct",
        Latex: /\\longleftrightarrow<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<munderover><mo d='&#x2194;'></mo><mrow>$4</mrow><mrow>$2</mrow></munderover>"
      },
      {
        type: "struct",
        Latex: /\\overrightharpoonup<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mrow>$2</mrow><mo stretchy='true' d='&#x21C0;'></mo></mover>"
      },
      { Latex: /\\rightleftharpoons/g, xml: "<mo d='&#x21CC;'></mo>" },
      {
        type: "struct",
        Latex: /\\underrightarrow<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<munder accentunder='true'><mrow>$2</mrow><mo stretchy='true' d='&#x2192;'></mo></munder>"
      },
      {
        type: "struct",
        Latex: /\\underleftarrow<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<munder accentunder='true'><mrow>$2</mrow><mo stretchy='true' d='&#x2190;'></mo></munder>"
      },
      {
        type: "struct",
        Latex: /\\rightharpoonup<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mrow>$2</mrow><mo stretchy='true' d='&#x21C0;'></mo></mover>"
      },
      {
        type: "struct",
        Latex: /\\longrightarrow<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<munderover><mo d='&#x2192;'></mo><mrow>$4</mrow>$2</mrow></munderover>"
      },
      { Latex: /\\sphericalangle/g, xml: "<mo d='&#x2222;'></mo>" },
      { Latex: /\\leftrightarrow/g, xml: "<mo d='&#x2194;'></mo>" },
      { Latex: /\\Leftrightarrow/g, xml: "<mo d='&#x21D4;'></mo>" },
      {
        Latex: /\\begin<b(\d+)>array<\/b\1><b(\d+)>([lcr]+)<\/b\2>/g,
        xml: "<mtable><mtr><mtd>"
      },
      {
        Latex: /\\begin<b(\d+)>array<\/b\1>/g,
        xml: "<mtable><mtr><mtd>"
      },
      { Latex: /\\\\\\end<b(\d+)>array<\/b\1>/g, xml: "</mtable>" },
      { Latex: /\\end<b(\d+)>array<\/b\1>/g, xml: "</mtable>" },
      { Latex: /\\rightleftarrows/g, xml: "<mo d='&#x21C4;'></mo>" },
      {
        type: "struct",
        Latex: /\\overrightarrow<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mrow>$2</mrow><mo stretchy='true' d='&#x2192;'></mo></mover>"
      },
      {
        type: "struct",
        Latex: /\\overleftarrow<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mrow>$2</mrow><mo stretchy='true' d='&#x2190;'></mo></mover>"
      },
      {
        type: "struct",
        Latex: /\\autorightarrow<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<munderover><mo d='&#x2192;'></mo><mrow>$4</mrow><mrow>$2</mrow></munderover>"
      },
      {
        type: "struct",
        Latex: /\\autoleftarrow<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<munderover><mo d='&#x2190;'></mo><mrow>$4</mrow><mrow>$2</mrow></munderover>"
      },
      { Latex: /\\measuredangle/g, xml: "<mo d='&#x2221;'></mo>" },
      { Latex: /\\Parallelogram/g, xml: "<mo d='&#x25B1;'></mo>" },
      { Latex: /\\triangleright/g, xml: "<mo d='&#x22B3;'></mo>" },
      { Latex: /\\triangleleft/g, xml: "<mo d='&#x22B2;'></mo>" },
      { Latex: /\\right\\rfloor/g, xml: "</mrow><mo d='&#x230B;'></mo></mrow>" },
      { Latex: /\\left\\lfloor/g, xml: "<mrow><mo d='&#x230A;'></mo><mrow>" },
      { Latex: /\\right\\rangle/g, xml: "</mrow><mo d='&#x232A;'></mo></mrow>" },
      { Latex: /\\left\\langle/g, xml: "<mrow><mo d='&#x2329;'></mo><mrow>" },
      { Latex: /\\right\\rceil/g, xml: "</mrow><mo d='&#x2309;'></mo></mrow>" },
      { Latex: /\\left\\lceil/g, xml: "<mrow><mo d='&#x2308;'></mo><mrow>" },
      { Latex: /\\right\\\]/g, xml: "</mrow><mo d='&#x301B;'></mo></mrow>" },
      { Latex: /\\right\\\|/g, xml: "</mrow><mo d='&#x2016;'></mo></mrow>" },
      { Latex: /\\left\\\[/g, xml: "<mrow><mo d='&#x301A;'></mo><mrow>" },
      { Latex: /\\left\\\|/g, xml: "<mrow><mo d='&#x2016;'></mo><mrow>" },
      { Latex: /\\textlbrackdbl/g, xml: "<mo d='&#x301A;'></mo>" },
      { Latex: /\\textrbrackdbl/g, xml: "<mo d='&#x301B;'></mo>" },
      { Latex: /\\rectangular/g, xml: "<mo d='&#x25AD;'></mo>" },
      { Latex: /\\Updownarrow/g, xml: "<mo d='&#x21D5;'></mo>" },
      { Latex: /\\updownarrow/g, xml: "<mo d='&#x2195;'></mo>" },
      { Latex: /\\diamondsuit/g, xml: "<mo d='&#x22C4;'></mo>" },
      { Latex: /\\vartriangle/g, xml: "<mo d='&#x25B3;'></mo>" },
      {
        type: "struct",
        Latex: /\\underddddot<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<munder>$2<mo d='&#x20DC;'></mo></munder>"
      },
      {
        type: "struct",
        Latex: /\\underdddot<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<munder>$2<mo d='&#x20DB;'></mo></munder>"
      },
      {
        type: "struct",
        Latex: /\\under2line<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mover accent='true'>$2<mo stretchy='true' d='&#x00AF;'></mo></mover><mo stretchy='true' d='&#x00AF;'></mo></mover>"
      },
      {
        type: "struct",
        Latex: /\\underbrace<b(\d+)>(.*?)<\/b\1>\_<b(\d+)>(.*?)<\/b\3>/g,
        xml: "<munder><munder><mrow>$2</mrow><mo stretchy='true' d='&#xFE38;'></mo></munder><mrow>$4</mrow></munder>"
      },
      { Latex: /\\Rightarrow/g, xml: "<mo d='&#x21D2;'></mo>" },
      { Latex: /\\varepsilon/g, xml: "<mi d='&#x03B5;'></mi>" },
      { Latex: /\\triangleq/g, xml: "<mo d='&#x225C;'></mo>" },
      {
        type: "struct",
        Latex: /\\over2line<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mover accent='true'>$2<mo stretchy='true' d='&#x00AF;'></mo></mover><mo stretchy='true' d='&#x00AF;'></mo></mover>"
      },
      {
        type: "struct",
        Latex: /\\underline<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<munder accentunder='true'><mrow>$2</mrow><mo stretchy='true' d='_'></mo></munder>"
      },
      {
        type: "struct",
        Latex: /\\widefrown<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mrow>$2</mrow><mo stretchy='true' d='&#x2322;'></mo></mover>"
      },
      {
        type: "struct",
        Latex: /\\widetilde<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mrow>$2</mrow><mo stretchy='true' d='&#x02DC;'></mo></mover>"
      },
      {
        type: "struct",
        Latex: /\\underbrack<b(\d+)>(.*?)<\/b\1>\_<b(\d+)>(.*?)<\/b\3>/g,
        xml: "<munder><munder><mrow>$2</mrow><mo stretchy='true' d='&#x23B5;'></mo></munder><mrow>$4</mrow></munder>"
      },
      {
        type: "struct",
        Latex: /\\underbrak<b(\d+)>(.*?)<\/b\1>\_<b(\d+)>(.*?)<\/b\3>/g,
        xml: "<munder><munder><mrow>$2</mrow><mo stretchy='true' d='&#x23B5;'></mo></munder><mrow>$4</mrow></munder>"
      },
      {
        type: "struct",
        Latex: /\\overbrace<b(\d+)>(.*?)<\/b\1>\^<b(\d+)>(.*?)<\/b\3>/g,
        xml: "<mover><mover><mrow>$4</mrow><mo stretchy='true' d='&#xFE37;'></mo></mover><mrow>$2</mrow></mover>"
      },
      {
        type: "struct",
        Latex: /\\overbrack<b(\d+)>(.*?)<\/b\1>\^<b(\d+)>(.*?)<\/b\3>/g,
        xml: "<mover><mover><mrow>$4</mrow><mo stretchy='true' d='&#x23B4;'></mo></mover><mrow>$2</mrow></mover>"
      },
      { Latex: /\\therefore/g, xml: "<mo d='&#x2234;'></mo>" },
      { Latex: /\\Downarrow/g, xml: "<mo d='&#x21D3;'></mo>" },
      { Latex: /\\downarrow/g, xml: "<mo d='&#x2193;'></mo>" },
      { Latex: /\\neswarrow/g, xml: "<mo d='&#x2922;'></mo>" },
      { Latex: /\\nwsearrow/g, xml: "<mo d='&#x2921;'></mo>" },
      { Latex: /\\Leftarrow/g, xml: "<mo d='&#x21D0;'></mo>" },
      { Latex: /\\leftarrow/g, xml: "<mo d='&#x2190;'></mo>" },
      {
        type: "struct",
        Latex: /\\ointright((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><mrow><msub><mo d='&#x2232;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $62 + "</mrow></mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><mrow><munder><mo d='&#x2232;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $62 + "</mrow></mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\ointright<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x2232;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      { Latex: /\\notsubset/g, xml: "<mo d='&#x2284;'></mo>" },
      {
        type: "struct",
        Latex: /\\widebrack<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mrow>$2</mrow><mo stretchy='true' d='&#xFE39;'></mo></mover>"
      },
      {
        type: "struct",
        Latex: /\\widefrack<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mrow>$2</mrow><mo stretchy='true' d='&#xFE39;'></mo></mover>"
      },
      { Latex: /\\backslash/g, xml: "<mo d='&#x005C;'></mo>" },
      {
        type: "struct",
        Latex: /\\underddot<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<munder>$2<mo d='&#x00A8;'></mo></munder>"
      },
      {
        type: "struct",
        Latex: /\\underdot<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<munder>$2<mo d='&#x02D9;'></mo></munder>"
      },
      {
        type: "struct",
        Latex: /\\overline<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mrow>$2</mrow><mo stretchy='true' d='&#x00AF;'></mo></mover>"
      },
      {
        type: "struct",
        Latex: /\\overbrak<b(\d+)>(.*?)<\/b\1>\^<b(\d+)>(.*?)<\/b\3>/g,
        xml: "<mover><mover><mrow>$4</mrow><mo stretchy='true' d='&#x23B4;'></mo></mover><mrow>$2</mrow></mover>"
      },
      //{ Latex: /\\template/g,                         xml:"<template/>"},  
      { Latex: /\\varsigma/g, xml: "<mi d='&#x03C2;'></mi>" },
      { Latex: /\\vartheta/g, xml: "<mi d='&#x03D1;'></mi>" },
      { Latex: /\\smallint/g, xml: "<mo d='&#x222B;'></mo>" },
      { Latex: /\\parallel/g, xml: "<mo d='&#x2225;'></mo>" },
      { Latex: /\\emptyset/g, xml: "<mo d='&#x2205;'></mo>" },
      { Latex: /\\subseteq/g, xml: "<mo d='&#x2286;'></mo>" },
      { Latex: /\\supseteq/g, xml: "<mo d='&#x2287;'></mo>" },
      {
        type: "struct",
        Latex: /\\ointleft((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><mrow><msub><mo d='&#x2233;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $62 + "</mrow></mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><mrow><munder><mo d='&#x2233;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $62 + "</mrow></mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\ointleft<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x2233;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      { type: "struct", Latex: /\\stackrel<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g, xml: "<mover><mrow>$4</mrow><mrow>$2</mrow></mover>" },
      { type: "struct", Latex: /\\not\\equiv/g, xml: "<menclose notation='updiagonalstrike'><mo d='&#x2261;'></mo></menclose>" },
      { Latex: /\\smallcup/g, xml: "<mo d='&#x222A;'></mo>" },
      { Latex: /\\smallcap/g, xml: "<mo d='&#x2229;'></mo>" },
      { Latex: /\\nolimits/g, xml: "" },
      {
        type: "struct",
        Latex: /\\hfcancel<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<menclose notation='horizontalstrike'>$2</menclose>"
      },
      {
        type: "struct",
        Latex: /\\xfcancel<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<menclose notation='updiagonalstrike downdiagonalstrike'><mi d='x'></mi></menclose>"
      },
      {
        type: "struct",
        Latex: /\\bfcancel<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<menclose notation='downdiagonalstrike'>$2</menclose>"
      },
      {
        type: "struct",
        Latex: /\\fcancel<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<menclose notation='updiagonalstrike'>$2</menclose>"
      },
      { Latex: /\\lambdbar/g, xml: "<mi d='&#x019B;'></mi>" },
      {
        type: "struct",
        Latex: /\\widehat<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'><mrow>$2</mrow><mo stretchy='true' d='&#x005E;'></mo></mover>"
      },
      { Latex: /\\because/g, xml: "<mo d='&#x2235;'></mo>" },
      { Latex: /\\Upsilon/g, xml: "<mi d='&#x03D2;'></mi>" },
      { Latex: /\\upsilon/g, xml: "<mi d='&#x03C5;'></mi>" },
      { Latex: /\\swarrow/g, xml: "<mo d='&#x2199;'></mo>" },
      { Latex: /\\searrow/g, xml: "<mo d='&#x2198;'></mo>" },
      { Latex: /\\nwarrow/g, xml: "<mo d='&#x2196;'></mo>" },
      { Latex: /\\nearrow/g, xml: "<mo d='&#x2197;'></mo>" },
      { Latex: /\\Uparrow/g, xml: "<mo d='&#x21D1;'></mo>" },
      { Latex: /\\uparrow/g, xml: "<mo d='&#x2191;'></mo>" },
      { Latex: /\\partial/g, xml: "<mo d='&#x2202;'></mo>" },
      { Latex: /\\bigcirc/g, xml: "<mo d='&#x25CB;'></mo>" },
      { Latex: /\\right\)/g, xml: "</mrow><mo d=')'></mo></mrow>" },
      { Latex: /\\right\]/g, xml: "</mrow><mo d=']'></mo></mrow>" },
      { Latex: /\\right\}/g, xml: "</mrow><mo d='}'></mo></mrow>" },
      { Latex: /\\right\./g, xml: "</mrow></mrow>" },
      { Latex: /\\right\|/g, xml: "</mrow><mo d='|'></mo></mrow>" },
      { Latex: /\\right\[/g, xml: "</mrow><mo d=']'></mo></mrow>" },
      { Latex: /\\left\(/g, xml: "<mrow><mo d='('></mo><mrow>" },
      { Latex: /\\left\[/g, xml: "<mrow><mo d='['></mo><mrow>" },
      { Latex: /\\left\{/g, xml: "<mrow><mo d='{'></mo><mrow>" },
      { Latex: /\\left\|/g, xml: "<mrow><mo d='|'></mo><mrow>" },
      { Latex: /\\left\]/g, xml: "<mrow><mo d=']'></mo><mrow>" },
      { Latex: /\\left\./g, xml: "<mrow><mrow>" },
      //{ Latex: /\\Longeq/g,                           xml:"<stru p='2' d='Longeq'/>"},
      //{ Latex: /\\longeq/g,                           xml:"<stru p='2' d='longeq'/>"},
      { Latex: /\\mathbb<b(\d+)>R<\/b\1>/g, xml: "<mi d='&#x211D;'></mi>" },
      { Latex: /\\mathbb<b(\d+)>Z<\/b\1>/g, xml: "<mi d='&#x2124;'></mi>" },
      { Latex: /\\mathbb<b(\d+)>C<\/b\1>/g, xml: "<mi d='&#x2102;'></mi>" },
      { Latex: /\\mathbb<b(\d+)>Q<\/b\1>/g, xml: "<mi d='&#x211A;'></mi>" },
      { Latex: /\\mathbb<b(\d+)>N<\/b\1>/g, xml: "<mi d='&#x2115;'></mi>" },
      { Latex: /\\mathbb<b(\d+)>(.*?)<\/b\1>/g, xml: "<mi mathvariant='double-struck'>$2</mi>" },
      { Latex: /\\quotes/g, xml: "<mo d='&#x0023;'></mo>" },
      {
        type: "struct",
        Latex: /\\oiiint((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><mrow><msub><mo d='&#x2230;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $6 + "</mrow></mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><mrow><munder><mo d='&#x2230;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $6 + "</mrow></mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\oiiint<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x2230;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        type: "struct",
        Latex: /\\Mathop<b(\d+)>(.*?)<\/b\1>\\limits\_<b(\d+)>(.*?)<\/b\3>\^<b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          return "<munderover><mstyle mathsize='140%' displaystyle='true'><mrow>$4</mrow></mstyle><mrow>$6</mrow><mrow>$2</mrow></munderover>";
        }
      },
      {
        type: "struct",
        Latex: /\\Mathop<b(\d+)>(.*?)<\/b\1>\\limits\^<b(\d+)>(.*?)<\/b\3>/g,
        xml: function($0, $1, $2, $3, $4) {
          return "<munder><mstyle mathsize='140%' displaystyle='true'><mrow>$2</mrow></mstyle><mrow>$4</mrow></munder>";
        }
      },
      {
        type: "struct",
        Latex: /\\Mathop<b(\d+)>(.*?)<\/b\1>\\limits\_<b(\d+)>(.*?)<\/b\3>/g,
        xml: function($0, $1, $2, $3, $4) {
          return "<munder><mrow>$2</mrow><mrow>$4</mrow></munder>";
        }
      },
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        type: "struct",
        Latex: /\\Mathop<b(\d+)>(.*?)<\/b\1>\\nolimits\_<b(\d+)>(.*?)<\/b\3>\^<b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          return "<msubsup><mstyle mathsize='140%' displaystyle='true'><mrow>$2</mrow></mstyle><mrow>$4</mrow><mrow>$6</mrow></msubsup>";
        }
      },
      {
        type: "struct",
        Latex: /\\Mathop<b(\d+)>(.*?)<\/b\1>\\nolimits\_<b(\d+)>(.*?)<\/b\3>/g,
        xml: function($0, $1, $2, $3, $4) {
          return "<msub><mstyle mathsize='140%' displaystyle='true'><mrow>$2</mrow></mstyle><mrow>$4</mrow></msub>";
        }
      },
      {
        type: "struct",
        Latex: /\\Mathop<b(\d+)>(.*?)<\/b\1>\\nolimits\^<b(\d+)>(.*?)<\/b\3>/g,
        xml: function($0, $1, $2, $3, $4) {
          return "<msup><mstyle mathsize='140%' displaystyle='true'><mrow>$2</mrow></mstyle><mrow>$4</mrow></msup>";
        }
      },
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        type: "struct",
        Latex: /\\mathop<b(\d+)>(.*?)<\/b\1>\\limits\_<b(\d+)>(.*?)<\/b\3>\^<b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          return "<munderover><mrow>$4</mrow><mrow>$6</mrow><mrow>$2</mrow></munderover>";
        }
      },
      {
        type: "struct",
        Latex: /\\mathop<b(\d+)>(.*?)<\/b\1>\\limits\^<b(\d+)>(.*?)<\/b\3>/g,
        xml: function($0, $1, $2, $3, $4) {
          return "<mover><mrow>$4</mrow><mrow>$2</mrow></mover>";
        }
      },
      {
        type: "struct",
        Latex: /\\mathop<b(\d+)>(.*?)<\/b\1>\\limits\_<b(\d+)>(.*?)<\/b\3>/g,
        xml: function($0, $1, $2, $3, $4) {
          return "<munder><mrow>$2</mrow><mrow>$4</mrow></munder>";
        }
      },
      { Latex: /\\arccsc/g, xml: "<mi d='arcsin'></mi>" },
      { Latex: /\\arcsec/g, xml: "<mi d='arcsec'></mi>" },
      { Latex: /\\arccot/g, xml: "<mi d='arccot'></mi>" },
      { Latex: /\\arctan/g, xml: "<mi d='arctan'></mi>" },
      { Latex: /\\arccos/g, xml: "<mi d='arccos'></mi>" },
      { Latex: /\\arcsin/g, xml: "<mi d='arcsin'></mi>" },
      {
        type: "struct",
        Latex: /\\ddddot<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'>$2<mo d='&#x20DC;'></mo></mover>"
      },
      { Latex: /\\lambdabar/g, xml: "<mi>&#x019B;</mi>" },
      { Latex: /\\square/g, xml: "<mo d='&#x25A1;'></mo>" },
      { Latex: /\\propto/g, xml: "<mo d='&#x221D;'></mo>" },
      { Latex: /\\lambda/g, xml: "<mi d='&#x03BB;'></mi>" },
      { Latex: /\\Lambda/g, xml: "<mi d='&#x039B;'></mi>" },
      { Latex: /\\varphi/g, xml: "<mi d='&#x03C6;'></mi>" },
      { Latex: /\\forall/g, xml: "<mo d='&#x2200;'></mo>" },
      { Latex: /\\exists/g, xml: "<mo d='&#x2203;'></mo>" },
      //###################################################################################################
      {
        type: "struct",
        Latex: /\\coprod((\\limits)?)\_<b(\d+)>(.*?)<\/b\3>\^<b(\d+)>(.*?)<\/b\5><b(\d+)>(.*?)<\/b\7>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62, $7, $8) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><msubsup><mo d='&#x2210;'></mo><mrow>" + $4 + "</mrow><mrow>" + $62 + "</mrow></msubsup><mrow>" + $8 + "</mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><munderover><mo d='&#x2210;'></mo><mrow>" + $4 + "</mrow><mrow>" + $62 + "</mrow></munderover><mrow>" + $8 + "</mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\coprod((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><msub><mo d='&#x2210;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $62 + "</mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><munder><mo d='&#x2210;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $62 + "</mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\coprod<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x2210;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      //###################################################################################################
      {
        type: "struct",
        Latex: /\\bigcup((\\limits)?)\_<b(\d+)>(.*?)<\/b\3>\^<b(\d+)>(.*?)<\/b\5><b(\d+)>(.*?)<\/b\7>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62, $7, $8) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><msubsup><mo d='&#x222A;'></mo><mrow>" + $4 + "</mrow><mrow>" + $62 + "</mrow></msubsup><mrow>" + $8 + "</mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><munderover><mo d='&#x222A;'></mo><mrow>" + $4 + "</mrow><mrow>" + $62 + "</mrow></munderover><mrow>" + $8 + "</mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\bigcup((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><msub><mo d='&#x222A;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $62 + "</mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><munder><mo d='&#x222A;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $62 + "</mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\bigcup<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x222A;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      //###################################################################################################
      {
        type: "struct",
        Latex: /\\bigcap((\\limits)?)\_<b(\d+)>(.*?)<\/b\3>\^<b(\d+)>(.*?)<\/b\5><b(\d+)>(.*?)<\/b\7>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62, $7, $8) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><msubsup><mo d='&#x2229;'></mo><mrow>" + $4 + "</mrow><mrow>" + $62 + "</mrow></msubsup><mrow>" + $8 + "</mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><munderover><mo d='&#x2229;'></mo><mrow>" + $4 + "</mrow><mrow>" + $62 + "</mrow></munderover><mrow>" + $8 + "</mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\bigcap((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><msub><mo d='&#x2229;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $62 + "</mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><munder><mo d='&#x2229;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $62 + "</mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\bigcap<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x2229;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      { Latex: /\\supset/g, xml: "<mo d='&#x2283;'></mo>" },
      { Latex: /\\subset/g, xml: "<mo d='&#x2282;'></mo>" },
      { Latex: /\\otimes/g, xml: "<mo d='&#x2297;'></mo>" },
      { Latex: /\\bullet/g, xml: "<mo d='&#x2022;'></mo>" },
      { Latex: /\\approx/g, xml: "<mo d='&#x2248;'></mo>" },
      { Latex: /\\rangle/g, xml: "<mo d='&#x232A;'></mo>" },
      { Latex: /\\langle/g, xml: "<mo d='&#x2329;'></mo>" },
      { Latex: /\\Dollar/g, xml: "<mi d='&#x0024;'></mi>" },
      //{ Latex: /\\limits/g,                         xml:"<limits/>"},
      {
        type: "struct",
        Latex: /\\hcancel<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<menclose notation='horizontalstrike'><mrow>$2</mrow></menclose>"
      },
      {
        type: "struct",
        Latex: /\\xcancel<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<menclose notation='updiagonalstrike downdiagonalstrike'><mrow>$2</mrow></menclose>"
      },
      {
        type: "struct",
        Latex: /\\bcancel<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<menclose notation='downdiagonalstrike'><mrow>$2</mrow></menclose>"
      },
      {
        type: "struct",
        Latex: /\\cancel<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<menclose notation='updiagonalstrike'><mrow>$2</mrow></menclose>"
      },
      //{ Latex: /\\symbol/g,                           xml:"<symbol/>"}, 
      { Latex: /\\mathbf<b(\d+)>(.*?)<\/b\1>/g, xml: "<mstyle mathvariant='bold' mathsize='normal' d='$2'></mstyle>" },
      { Latex: /\\textbf<b(\d+)>(.*?)<\/b\1>/g, xml: "<mstyle mathvariant='bold' mathsize='normal' d='$2'></mstyle>" },
      { Latex: /\\mathrm<b(\d+)>(.*?)<\/b\1>/g, xml: "<mtext d='$2'></mtext>" },
      { Latex: /\\textrm<b(\d+)>(.*?)<\/b\1>/g, xml: "<mtext d='$2'></mtext>" },
      { Latex: /\\textit<b(\d+)>(.*?)<\/b\1>/g, xml: "$2" },
      { Latex: /\\mapsto/g, xml: "<mo d='&#x21A6;'></mo>" },
      { Latex: /\\slash/g, xml: "<mo d='&#x005C;'></mo>" },
      { Latex: /\\Prime/g, xml: "<mo d='&#x2033;'></mo>" },
      { Latex: /\\prime3/g, xml: "<mo d='&#x2034;'></mo>" },
      { Latex: /\\prime2/g, xml: "<mo d='&#x2033;'></mo>" },
      { Latex: /\\prime/g, xml: "<mo d='&#x2032;'></mo>" },
      { Latex: /\\vline/g, xml: "<mo d='|'></mo>" },
      {
        type: "struct",
        Latex: /\\tfrac<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<mstyle scriptlevel='+1'><mfrac><mrow>$2</mrow><mrow>$4</mrow></mfrac></mstyle>"
      },
      { Latex: /\\ddots/g, xml: "<mo d='&#x22F1;'></mo>" },
      { Latex: /\\xdots/g, xml: "<mo d='&#x22F0;'></mo>" },
      {
        type: "struct",
        Latex: /\\jstat<b(\d+)>(.*?)<\/b\2>/g,
        xml: "<mover accent='true'>$2<mo d='&#x005E;'></mo></mover>"
      },
      { Latex: /\\smile/g, xml: "<mo d='&#x2323;'></mo>" },
      { Latex: /\\frown/g, xml: "<mo d='&#x2322;'></mo>" },
      {
        type: "struct",
        Latex: /\\tilde<b(\d+)>(.*?)<\/b\2>/g,
        xml: "<mover accent='true'>$2<mo d='&#x02DC;'></mo></mover>"
      },
      {
        type: "struct",
        Latex: /\\iiint((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><mrow><msub><mo d='&#x222D;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $62 + "</mrow></mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><mrow><munder><mo d='&#x222D;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $62 + "</mrow></mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\iiint<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x222D;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      { Latex: /\\angle/g, xml: "<mo d='&#x2220;'></mo>" },
      { Latex: /\\idots/g, xml: "<mo d='&#x22F0;'></mo>" },
      { Latex: /\\vdots/g, xml: "<mo d='&#x22EE;'></mo>" },
      { Latex: /\\cdots/g, xml: "<mo d='&#x22EF;'></mo>" },
      { Latex: /\\ldots/g, xml: "<mo d='&#x2026;'></mo>" },
      { Latex: /\\Sigma/g, xml: "<mi d='&#x03A3;'></mi>" },
      { Latex: /\\sigma/g, xml: "<mi d='&#x03C3;'></mi>" },
      { Latex: /\\Gamma/g, xml: "<mi d='&#x0393;'></mi>" },
      { Latex: /\\gamma/g, xml: "<mi d='&#x03B3;'></mi>" },
      { Latex: /\\Theta/g, xml: "<mi d='&#x0398;'></mi>" },
      { Latex: /\\theta/g, xml: "<mi d='&#x03B8;'></mi>" },
      { Latex: /\\varpi/g, xml: "<mi d='&#x03D6;'></mi>" },
      { Latex: /\\kappa/g, xml: "<mi d='&#x03BA;'></mi>" },
      { Latex: /\\alpha/g, xml: "<mi d='&#x03B1;'></mi>" },
      { Latex: /\\wedge/g, xml: "<mo d='&#x2227;'></mo>" },
      { Latex: /\\Omega/g, xml: "<mi d='&#x03A9;'></mi>" },
      { Latex: /\\omega/g, xml: "<mi d='&#x03C9;'></mi>" },
      { Latex: /\\nabla/g, xml: "<mo d='&#x2207;'></mo>" },
      { Latex: /\\aleph/g, xml: "<mi d='&#x2135;'></mi>" },
      { Latex: /\\Delta/g, xml: "<mi d='&#x0394;'></mi>" },
      { Latex: /\\delta/g, xml: "<mi d='&#x03B4;'></mi>" },
      { Latex: /\\times/g, xml: "<mo d='&#x00D7;'></mo>" },
      { Latex: /\\equiv/g, xml: "<mo d='&#x2261;'></mo>" },
      { Latex: /\\notin/g, xml: "<mo d='&#x2209;'></mo>" },
      { Latex: /\\oplus/g, xml: "<mo d='&#x2295;'></mo>" },
      { Latex: /\\simeq/g, xml: "<mo d='&#x2243;'></mo>" },
      { Latex: /\\infty/g, xml: "<mi d='&#x221E;'></mi>" },
      {
        type: "struct",
        Latex: /\\oiint((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><mrow><msub><mo d='&#x222F;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $62 + "</mrow></mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><mrow><munder><mo d='&#x222F;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $62 + "</mrow></mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\oiint<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x222F;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      { Latex: /\\doteq/g, xml: "<mo d='&#x2250;'></mo>" },
      { Latex: /\\hateq/g, xml: "<mo d='&#x2259;'></mo>" },
      { type: "struct", Latex: /\\notto/g, xml: "<menclose notation='updiagonalstrike'><mo d='&#x2192;'></mo></menclose>" },
      { type: "struct", Latex: /\\not\\to/g, xml: "<menclose notation='updiagonalstrike'><mo d='&#x2192;'></mo></menclose>" },
      { Latex: /\\space/g, xml: "<mtext>&#x2009;</mtext>" },
      {
        type: "struct",
        Latex: /\\dddot<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'>$2<mo d='&#x20DB;'></mo></mover>"
      },
      { Latex: /\\squot/g, xml: "<mo d='&#x0027;'></mo>" },
      { Latex: /\\dquot/g, xml: "<mo d='&#x0023;'></mo>" },
      { Latex: /\\emph<b(\d+)>(.*?)<\/b\1>/g, xml: "$2" },
      { Latex: /\\text<b(\d+)>(.*?)<\/b\1>/g, xml: " <mtext>$2</mtext>" },
      {
        type: "struct",
        Latex: /\\oint((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><mrow><msub><mo d='&#x222E;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $62 + "</mrow></mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><mrow><munder><mo d='&#x222E;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $62 + "</mrow></mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\oint<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x222E;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      {
        type: "struct",
        Latex: /\\iint((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><mrow><msub><mo d='&#x222C;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $62 + "</mrow></mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><mrow><munder><mo d='&#x222C;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $62 + "</mrow></mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\iint<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x222C;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      //###################################################################################################
      {
        type: "struct",
        Latex: /\\prod((\\limits)?)\_<b(\d+)>(.*?)<\/b\3>\^<b(\d+)>(.*?)<\/b\5><b(\d+)>(.*?)<\/b\7>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62, $7, $8) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><msubsup><mo d='&#x220F;'></mo><mrow>" + $4 + "</mrow><mrow>" + $62 + "</mrow></msubsup><mrow>" + $8 + "</mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><munderover><mo d='&#x220F;'></mo><mrow>" + $4 + "</mrow><mrow>" + $62 + "</mrow></munderover><mrow>" + $8 + "</mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\prod((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><msub><mo d='&#x220F;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $62 + "</mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><munder><mo d='&#x220F;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $62 + "</mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\prod<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x220F;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      {
        type: "struct",
        Latex: /\\sqrt<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<msqrt><mrow>$2</mrow></msqrt>"
      },
      {
        type: "struct",
        Latex: /\\root<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<mroot><mrow>$4</mrow><mrow>$2</mrow></mroot>"
      },
      {
        type: "struct",
        Latex: /\\frac<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<mfrac><mrow>$2</mrow><mrow>$4</mrow></mfrac>"
      },
      { Latex: /\\kern<b(\d+)>(.*?)<\/b\1>/g, xml: "" },
      { Latex: /\\csch/g, xml: "<mtext>csch</mtext>" },
      { Latex: /\\sech/g, xml: "<mtext>sech</mtext>" },
      { Latex: /\\coth/g, xml: "<mtext>coth</mtext>" },
      { Latex: /\\tanh/g, xml: "<mtext>tanh</mtext>" },
      { Latex: /\\cosh/g, xml: "<mtext>cosh</mtext>" },
      { Latex: /\\sinh/g, xml: "<mtext>sinh</mtext>" },
      { type: "struct", Latex: /\\ddot<b(\d+)>(.*?)<\/b\1>/g, xml: "<mover accent='true'>$2<mo d='&#x02D9;'></mo></mover>" },
      { Latex: /\\zeta/g, xml: "<mi d='&#x03B6;'></mi>" },
      { Latex: /\\iota/g, xml: "<mi d='&#x03B9;'></mi>" },
      { Latex: /\\beta/g, xml: "<mi d='&#x03B2;'></mi>" },
      { Latex: /\\hbar/g, xml: "<mi d='&#x210F;'></mi>" },
      { Latex: /\\Cdot/g, xml: "<mo d='&#x00B7;'></mo>" },
      { Latex: /\\cdot/g, xml: "<mo d='&#x22C5;'></mo>" },
      { Latex: /\\circ/g, xml: "<mo d='&#x2218;'></mo>" },
      { Latex: /\\odot/g, xml: "<mo d='&#x2299;'></mo>" },
      { Latex: /\\cong/g, xml: "<mo d='&#x2245;'></mo>" },
      { Latex: /\\succ/g, xml: "<mo d='&#x227B;'></mo>" },
      { Latex: /\\prec/g, xml: "<mo d='&#x227A;'></mo>" },
      {
        type: "struct",
        Latex: /\\Vdiv<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<mtable><mtr><mtd columnalign='right'><mrow>$2</mrow></mtd></mtr><mtr><mtd columnalign='right'><menclose notation='longdiv'>$4</mrow></menclose></mtd></mtr></mtable>"
      },
      {
        type: "struct",
        Latex: /\\vdiv<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<menclose notation='longdiv'><mrow>$2</mrow></menclose>"
      },
      { Latex: /\\quot/g, xml: "<mo d='&#x0023;'></mo>" },
      { Latex: /\\qquad/g, xml: "<mspace width='2em'/>" },
      { Latex: /\\quad/g, xml: "<mspace width='1em'/>" },
      { Latex: /\\dlsh/g, xml: "<mo d='&#x21B5;'></mo>" },
      { Latex: /\\sub/g, xml: "<mo d='&#x2212;'></mo>" },
      { Latex: /\\add/g, xml: "<mo d='+'></mo>" },
      {
        type: "struct",
        Latex: /\\Box<b(\d+)>1010<\/b\1><b(\d+)>(.*?)<\/b\2>/g,
        xml: "<menclose notation='top left'><mrow>$3</mrow></menclose>"
      },
      {
        type: "struct",
        Latex: /\\Box<b(\d+)>1001<\/b\1><b(\d+)>(.*?)<\/b\2>/g,
        xml: "<menclose notation='actuarial'><mrow>$3</mrow></menclose>"
      },
      {
        type: "struct",
        Latex: /\\Box<b(\d+)>0110<\/b\1><b(\d+)>(.*?)<\/b\2>/g,
        xml: "<menclose notation='bottom left'><mrow>$3</mrow></menclose>"
      },
      {
        type: "struct",
        Latex: /\\Box<b(\d+)>0101<\/b\1><b(\d+)>(.*?)<\/b\2>/g,
        xml: "<menclose notation='bottom right'><mrow>$3</mrow></menclose>"
      },
      {
        type: "struct",
        Latex: /\\Box<b(\d+)>1111<\/b\1><b(\d+)>(.*?)<\/b\2>/g,
        xml: "<menclose notation='box'><mrow>$3</mrow></menclose>"
      },
      {
        type: "struct",
        Latex: /\\Box<b(\d+)>0111<\/b\1><b(\d+)>(.*?)<\/b\2>/g,
        xml: "<menclose notation='left bottom right'><mrow>$3</mrow></menclose>"
      },
      { Latex: /\\Box/g, xml: "<Box/>" },
      { Latex: /\\mho/g, xml: "<mi d='&#x2127;'></mi>" },
      {
        type: "struct",
        Latex: /\\hat<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'>$2<mo d='&#x005E;'></mo></mover>"
      },
      {
        type: "struct",
        Latex: /\\dot<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<mover accent='true'>$2<mo d='&#x02D9;'></mo></mover>"
      },
      { Latex: /\\cov/g, xml: "<mi d='cov'></mi>" },
      { Latex: /\\inf/g, xml: "<mi d='inf'></mi>" },
      { Latex: /\\sup/g, xml: "<mi d='sup'></mi>" },
      { Latex: /\\gcd/g, xml: "<mi d='gcd'></mi>" },
      { Latex: /\\dim/g, xml: "<mi d='dim'></mi>" },
      { Latex: /\\min/g, xml: "<mi d='min'></mi>" },
      { Latex: /\\max/g, xml: "<mi d='max'></mi>" },
      { Latex: /\\arg/g, xml: "<mi d='arg'></mi>" },
      { Latex: /\\ker/g, xml: "<mi d='ker'></mi>" },
      { Latex: /\\exp/g, xml: "<mi d='exp'></mi>" },
      { Latex: /\\log/g, xml: "<mi d='log'></mi>" },
      { Latex: /\\csc/g, xml: "<mi d='csc'></mi>" },
      { Latex: /\\sec/g, xml: "<mi d='sec'></mi>" },
      { Latex: /\\cot/g, xml: "<mi d='cot'></mi>" },
      { Latex: /\\tan/g, xml: "<mi d='tan'></mi>" },
      { Latex: /\\cos/g, xml: "<mi d='cos'></mi>" },
      { Latex: /\\sin/g, xml: "<mi d='sin'></mi>" },
      //###################################################################################################
      {
        type: "struct",
        Latex: /\\sum((\\limits)?)\_<b(\d+)>(.*?)<\/b\3>\^<b(\d+)>(.*?)<\/b\5><b(\d+)>(.*?)<\/b\7>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62, $7, $8) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><msubsup><mo d='&#x2211;'></mo><mrow>" + $4 + "</mrow><mrow>" + $62 + "</mrow></msubsup><mrow>" + $8 + "</mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><munderover><mo d='&#x2211;'></mo><mrow>" + $4 + "</mrow><mrow>" + $62 + "</mrow></munderover><mrow>" + $8 + "</mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\sum((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><msub><mo d='&#x2211;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $62 + "</mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><munder><mo d='&#x2211;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $62 + "</mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\sum<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x2211;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      { Latex: /\\cup/g, xml: "<mo d='&#x222A;'></mo>" },
      { Latex: /\\cap/g, xml: "<mo d='&#x2229;'></mo>" },
      { Latex: /\\ell/g, xml: "<mi d='&#x2113;'></mi>" },
      { Latex: /\\dag/g, xml: "<mo d='&#x2020;'></mo>" },
      { Latex: /\\Psi/g, xml: "<mi d='&#x03A8;'></mi>" },
      { Latex: /\\tau/g, xml: "<mi d='&#x03C4;'></mi>" },
      { Latex: /\\rho/g, xml: "<mi d='&#x03C1;'></mi>" },
      { Latex: /\\psi/g, xml: "<mi d='&#x03C8;'></mi>" },
      { Latex: /\\eta/g, xml: "<mi d='&#x03B7;'></mi>" },
      { Latex: /\\bot/g, xml: "<mo d='&#x22A5;'></mo>" },
      { Latex: /\\Phi/g, xml: "<mi d='&#x03A6;'></mi>" },
      { Latex: /\\phi/g, xml: "<mi d='&#x03D5;'></mi>" },
      { Latex: /\\chi/g, xml: "<mi d='&#x03C7;'></mi>" },
      { Latex: /\\neg/g, xml: "<mo d='&#x00AC;'></mo>" },
      { Latex: /\\vee/g, xml: "<mo d='&#x2228;'></mo>" },
      { Latex: /\\div/g, xml: "<mo d='&#x00F7;'></mo>" },
      {
        type: "struct",
        Latex: /\\Div<b(\d+)>(.*?)<\/b\1><b(\d+)>(.*?)<\/b\3>/g,
        xml: "<mrow><mrow>$2</mrow><mo>/</mo><mrow>$4</mrow></mrow>"
      },
      //###################################################################################################
      {
        type: "struct",
        Latex: /\\int((\\limits)?)\_<b(\d+)>(.*?)<\/b\3>\^<b(\d+)>(.*?)<\/b\5><b(\d+)>(.*?)<\/b\7>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62, $7, $8) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><msubsup><mo d='&#x222B;'></mo><mrow>" + $4 + "</mrow><mrow>" + $62 + "</mrow></msubsup><mrow>" + $8 + "</mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><munderover><mo d='&#x222B;'></mo><mrow>" + $4 + "</mrow><mrow>" + $62 + "</mrow></munderover><mrow>" + $8 + "</mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\int((\\limits)?)\_<b(\d+)>(.*?)<\/b\3><b(\d+)>(.*?)<\/b\5>/g,
        xml: function($0, $1, $2, $3, $4, $5, $62) {
          if ($1 == "") {
            return "<mstyle displaystyle='true'><msub><mo d='&#x222B;'></mo><mrow>" + $4 + "</mrow></msub><mrow>" + $62 + "</mrow></mstyle>";
          } else {
            return "<mstyle displaystyle='true'><munder><mo d='&#x222B;'></mo><mrow>" + $4 + "</mrow></munder><mrow>" + $62 + "</mrow></mstyle>";
          }
        }
      },
      {
        type: "struct",
        Latex: /\\int<b(\d+)>(.*?)<\/b\2>/g,
        xml: function($0, $1, $2) {
          return "<mstyle displaystyle='true'><mrow><mo d='&#x222B;'></mo><mrow>" + $2 + "</mrow></mrow></mstyle>";
        }
      },
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      { Latex: /\\sim/g, xml: "<mo d='&#x223C;'></mo>" },
      { Latex: /\\per/g, xml: "<mi d='&#x0025;'></mi>" },
      {
        type: "struct",
        Latex: /\\not<b(\d+)>(.*?)<\/b\1>/g,
        xml: "<menclose notation='updiagonalstrike'><mrow>$2</mrow></menclose>"
      },
      { Latex: /\\lim/g, xml: "<mi d='lim'></mi>" },
      { type: "struct", Latex: /\\bar<b(\d+)>(.*?)<\/b\1>/g, xml: "<mover accent='true'>$2<mo d='&#x00AF;'></mo></mover>" },
      { type: "struct", Latex: /\\vec<b(\d+)>(.*?)<\/b\1>/g, xml: "<mover accent='true'>$2<mo d='&#x2192;'></mo></mover>" },
      { Latex: /\\amp/g, xml: "<mo d='&#x0026;'></mo>" },
      { Latex: /\\sy/g, xml: "<mo d='&#x2208;'></mo>" },
      { Latex: /\\bf<b(\d+)>(.*?)<\/b\1>/g, xml: " <mstyle mathvariant='bold' mathsize='normal' d='$2'></mstyle>" },
      { Latex: /\\rm<b(\d+)>(.*?)<\/b\1>/g, xml: "<mtext d='$2'></mtext>" },
      { Latex: /\\lt/g, xml: "<mo d='&#x003C;'></mo>" },
      { Latex: /\\gt/g, xml: "<mo d='&#x003E;'></mo>" },
      { Latex: /\\lg/g, xml: "<mi d='lg'></mi>" },
      { Latex: /\\ln/g, xml: "<mi d='ln'></mi>" },
      { Latex: /\\Xi/g, xml: "<mi d='&#x039E;'></mi>" },
      { Latex: /\\Pi/g, xml: "<mi d='&#x03A0;'></mi>" },
      { Latex: /\\xi/g, xml: "<mi d='&#x03BE;'></mi>" },
      { Latex: /\\pi/g, xml: "<mi d='&#x03C0;'></mi>" },
      { Latex: /\\nu/g, xml: "<mi d='&#x03BD;'></mi>" },
      { Latex: /\\mu/g, xml: "<mi d='&#x03BC;'></mi>" },
      { Latex: /\\wp/g, xml: "<mi d='&#x2118;'></mi>" },
      { Latex: /\\Im/g, xml: "<mi d='&#x2111;'></mi>" },
      { Latex: /\\to/g, xml: "<mo d='&#x2192;'></mo>" },
      { Latex: /\\Re/g, xml: "<mi d='&#x211C;'></mi>" },
      { Latex: /\\ni/g, xml: "<mo d='&#x220D;'></mo>" },
      { Latex: /\\in/g, xml: "<mo d='&#x2208;'></mo>" },
      { Latex: /\\mp/g, xml: "<mo d='&#x2213;'></mo>" },
      { Latex: /\\pm/g, xml: "<mo d='&#x00B1;'></mo>" },
      { Latex: /\\ne/g, xml: "<mo d='&#x2260;'></mo>" },
      { Latex: /\\le/g, xml: "<mo d='&#x2264;'></mo>" },
      { Latex: /\\ge/g, xml: "<mo d='&#x2265;'></mo>" },
      { Latex: /\\ll/g, xml: "<mo d='&#x226A;'></mo>" },
      { Latex: /\\gg/g, xml: "<mo d='&#x226B;'></mo>" },
      { Latex: /\\,/g, xml: "<mspace width='0.167em'/>" },
      { Latex: /\\;/g, xml: "<mspace width='0.278em'/>" },
      { Latex: /\\:/g, xml: "<mspace width='0.222em'/>" },
      { Latex: /\\\^/g, xml: "<mo d='&#x005E;'></mo>" },
      { Latex: /\\\_/g, xml: "<mo d='&#x005F;'></mo>" },
      { Latex: /\\\%/g, xml: "<mi d='&#x0025;'></mi>" },
      { Latex: /\\\$/, xml: "<mi d='&#x0024;'></mi>" }
    ];
    function init(latex) {
      latex = latex.replace(/(\^|\_)(\d+\.\d+|\d+|[a-zA-Z])/g, "$1{$2}");
      latex = latex.replace(/\\and/g, "&");
      latex = latex.replace(/\\par/g, "\\\\");
      latex = latex.replace(/\\\\\\end\{array\}/g, "</mtd></mtr></mtable>");
      latex = latex.replace(/\\\\/g, "</mtd></mtr><mtr><mtd>");
      latex = latex.replace(/\\\{/g, "<mo d='&#x007B;'></mo>");
      latex = latex.replace(/\\\}/g, "<mo d='&#x007D;'></mo>");
      latex = latex.replace(/\\\[/g, "<mo stretchy='false' d='['></mo>");
      latex = latex.replace(/\\\]/g, "<mo stretchy='false' d=']'></mo>");
      latex = latex.replace(/\\\^/g, "<mo d='&#x005E;'></mo>");
      latex = latex.replace(/\\\_/g, "<mo d='&#x005F;'></mo>");
      latex = latex.replace(/\\\%/g, "<mi d='&#x0025;'></mi>");
      latex = latex.replace(/\\\$/g, "<mi d='&#x0024;'></mi>");
      latex = latex.replace(/\\\&/g, "<mo d='&#x0026;'></mo>");
      return latex;
    }
    String.prototype.reverse = function() {
      return this.split("").reverse().join("");
    };
    function SupSub(latex) {
      var sup = "";
      var sub = "";
      var str = "";
      while (latex.match(/^(.*?)<mo>\_<\/mo><(.*?)>(.*?)<\/\2><mo>\^<\/mo>/g)) {
        latex = latex.replace(/^(.*?)<mo>\_<\/mo><(.*?)>(.*?)<\/\2><mo>\^<\/mo><(.*?)>(.*?)<\/\4>/g, function($0, $1, $2, $3, $4, $5) {
          $1 = $1.reverse().replace(/^>(.*?)\/<(.*?)>\1</g, function(a, b, c) {
            str = a.reverse();
            return "";
          }).reverse();
          sub = "<" + $2 + ">" + $3 + "</" + $2 + ">";
          sup = "<" + $4 + ">" + $5 + "</" + $4 + ">";
          return $1 + "<msubsup><mrow>" + str + "</mrow><mrow>" + sub + "</mrow><mrow>" + sup + "</mrow></msubsup>";
        });
      }
      while (latex.match(/<mo>(\^|\_)<\/mo>/g)) {
        latex = latex.replace(/^(.*?)<mo>(\^|\_)<\/mo><(.*?)>(.*?)<\/\3>/g, function($0, $1, $2, $3, $4) {
          $1 = $1.reverse().replace(/^>(.*?)\/<(.*?)>\1</g, function(a, b, c) {
            str = a.reverse();
            return "";
          }).reverse();
          if ($2 == "^") {
            sup = "<" + $3 + ">" + $4 + "</" + $3 + ">";
            return $1 + "<msup><mrow>" + str + "</mrow><mrow>" + sup + "</mrow></msup>";
          } else if ($2 == "_") {
            sub = "<" + $3 + ">" + $4 + "</" + $3 + ">";
            return $1 + "<msub><mrow>" + str + "</mrow><mrow>" + sub + "</mrow></msub>";
          } else {
            return "";
          }
        });
      }
      return latex;
    }
    function LaTeXtoXML(latex) {
      latex = "<math>" + latex + "</math>";
      latex = init(latex);
      var N = 0;
      latex = latex.replace(/(\{|\})/g, function($0, $1) {
        if ($1 == "{") {
          return "<b" + ++N + ">";
        }
        if ($1 == "}") {
          return "</b" + N-- + ">";
        }
      });
      var L = LaTeX.length;
      var obj = null;
      for (var i = 0; i <= L - 1; i++) {
        obj = LaTeX[i];
        if (obj.type == "struct") {
          while (latex.match(obj.Latex)) {
            latex = latex.replace(obj.Latex, obj.xml);
          }
        } else {
          latex = latex.replace(obj.Latex, obj.xml);
        }
      }
      latex = latex.replace(/<b(\d+)>/g, "<mrow$1>");
      latex = latex.replace(/<\/b(\d+)>/g, "</mrow$1>");
      latex = latex.replace(/>(.*?)</g, function($0, str) {
        str = str.replace(/\*/g, "<mo d='&#x2217;'></mo>");
        str = str.replace(/\%/g, "<mi d='&#x0025;'></mi>");
        str = str.replace(/([a-zA-Z])/g, "<mi d='$1'></mi>");
        str = str.replace(/(\d+\.\d+|\d+)/g, "<mn d='$1'></mn>");
        return ">" + str + "<";
      });
      latex = latex.replace(/>(.*?)</g, function($0, str) {
        str = str.replace(/\&/g, "</mtd><mtd>");
        return ">" + str + "<";
      });
      latex = latex.replace(/>(.*?)</g, function($0, str) {
        str = str.replace(/([^a-zA-Z0-9])/g, "<mo d='$1'></mo>");
        return ">" + str + "<";
      });
      latex = latex.replace(/<(mi|mo|mn) d='(.*?)'><\/\1>/g, "<$1>$2</$1>");
      latex = SupSub(latex);
      latex = latex.replace(/<mrow\d+>/g, "<mrow>");
      latex = latex.replace(/<\/mrow\d+>/g, "</mrow>");
      return latex;
    }
    exports.LaTeXtoMathML = function(latex) {
      return LaTeXtoXML(latex);
    };
  }
});

// _module.ts
var module_exports = {};
__export(module_exports, {
  action: () => action,
  test: () => test
});
module.exports = __toCommonJS(module_exports);
var Translator = require_latextomathml();
var action = (input) => {
  popclip.pasteText(convert(input.text));
};
function convert(latex) {
  return Translator.LaTeXtoMathML(latex);
}
function test() {
  print(convert("x^2 + y^2 = z^2"));
}
