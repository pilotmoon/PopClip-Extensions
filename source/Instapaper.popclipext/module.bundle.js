"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/oauth-1.0a/oauth-1.0a.js
var require_oauth_1_0a = __commonJS({
  "../../node_modules/oauth-1.0a/oauth-1.0a.js"(exports, module2) {
    if (typeof module2 !== "undefined" && typeof exports !== "undefined") {
      module2.exports = OAuth2;
    }
    function OAuth2(opts) {
      if (!(this instanceof OAuth2)) {
        return new OAuth2(opts);
      }
      if (!opts) {
        opts = {};
      }
      if (!opts.consumer) {
        throw new Error("consumer option is required");
      }
      this.consumer = opts.consumer;
      this.nonce_length = opts.nonce_length || 32;
      this.version = opts.version || "1.0";
      this.parameter_seperator = opts.parameter_seperator || ", ";
      this.realm = opts.realm;
      if (typeof opts.last_ampersand === "undefined") {
        this.last_ampersand = true;
      } else {
        this.last_ampersand = opts.last_ampersand;
      }
      this.signature_method = opts.signature_method || "PLAINTEXT";
      if (this.signature_method == "PLAINTEXT" && !opts.hash_function) {
        opts.hash_function = function(base_string, key) {
          return key;
        };
      }
      if (!opts.hash_function) {
        throw new Error("hash_function option is required");
      }
      this.hash_function = opts.hash_function;
      this.body_hash_function = opts.body_hash_function || this.hash_function;
    }
    OAuth2.prototype.authorize = function(request, token) {
      var oauth_data = {
        oauth_consumer_key: this.consumer.key,
        oauth_nonce: this.getNonce(),
        oauth_signature_method: this.signature_method,
        oauth_timestamp: this.getTimeStamp(),
        oauth_version: this.version
      };
      if (!token) {
        token = {};
      }
      if (token.key !== void 0) {
        oauth_data.oauth_token = token.key;
      }
      if (!request.data) {
        request.data = {};
      }
      if (request.includeBodyHash) {
        oauth_data.oauth_body_hash = this.getBodyHash(request, token.secret);
      }
      oauth_data.oauth_signature = this.getSignature(request, token.secret, oauth_data);
      return oauth_data;
    };
    OAuth2.prototype.getSignature = function(request, token_secret, oauth_data) {
      return this.hash_function(this.getBaseString(request, oauth_data), this.getSigningKey(token_secret));
    };
    OAuth2.prototype.getBodyHash = function(request, token_secret) {
      var body = typeof request.data === "string" ? request.data : JSON.stringify(request.data);
      if (!this.body_hash_function) {
        throw new Error("body_hash_function option is required");
      }
      return this.body_hash_function(body, this.getSigningKey(token_secret));
    };
    OAuth2.prototype.getBaseString = function(request, oauth_data) {
      return request.method.toUpperCase() + "&" + this.percentEncode(this.getBaseUrl(request.url)) + "&" + this.percentEncode(this.getParameterString(request, oauth_data));
    };
    OAuth2.prototype.getParameterString = function(request, oauth_data) {
      var base_string_data;
      if (oauth_data.oauth_body_hash) {
        base_string_data = this.sortObject(this.percentEncodeData(this.mergeObject(oauth_data, this.deParamUrl(request.url))));
      } else {
        base_string_data = this.sortObject(this.percentEncodeData(this.mergeObject(oauth_data, this.mergeObject(request.data, this.deParamUrl(request.url)))));
      }
      var data_str = "";
      for (var i = 0; i < base_string_data.length; i++) {
        var key = base_string_data[i].key;
        var value = base_string_data[i].value;
        if (value && Array.isArray(value)) {
          value.sort();
          var valString = "";
          value.forEach(function(item, i2) {
            valString += key + "=" + item;
            if (i2 < value.length) {
              valString += "&";
            }
          }.bind(this));
          data_str += valString;
        } else {
          data_str += key + "=" + value + "&";
        }
      }
      data_str = data_str.substr(0, data_str.length - 1);
      return data_str;
    };
    OAuth2.prototype.getSigningKey = function(token_secret) {
      token_secret = token_secret || "";
      if (!this.last_ampersand && !token_secret) {
        return this.percentEncode(this.consumer.secret);
      }
      return this.percentEncode(this.consumer.secret) + "&" + this.percentEncode(token_secret);
    };
    OAuth2.prototype.getBaseUrl = function(url) {
      return url.split("?")[0];
    };
    OAuth2.prototype.deParam = function(string) {
      var arr = string.split("&");
      var data = {};
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i].split("=");
        item[1] = item[1] || "";
        if (data[item[0]]) {
          if (!Array.isArray(data[item[0]])) {
            data[item[0]] = [data[item[0]]];
          }
          data[item[0]].push(decodeURIComponent(item[1]));
        } else {
          data[item[0]] = decodeURIComponent(item[1]);
        }
      }
      return data;
    };
    OAuth2.prototype.deParamUrl = function(url) {
      var tmp = url.split("?");
      if (tmp.length === 1)
        return {};
      return this.deParam(tmp[1]);
    };
    OAuth2.prototype.percentEncode = function(str) {
      return encodeURIComponent(str).replace(/\!/g, "%21").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
    };
    OAuth2.prototype.percentEncodeData = function(data) {
      var result = {};
      for (var key in data) {
        var value = data[key];
        if (value && Array.isArray(value)) {
          var newValue = [];
          value.forEach(function(val) {
            newValue.push(this.percentEncode(val));
          }.bind(this));
          value = newValue;
        } else {
          value = this.percentEncode(value);
        }
        result[this.percentEncode(key)] = value;
      }
      return result;
    };
    OAuth2.prototype.toHeader = function(oauth_data) {
      var sorted = this.sortObject(oauth_data);
      var header_value = "OAuth ";
      if (this.realm) {
        header_value += 'realm="' + this.realm + '"' + this.parameter_seperator;
      }
      for (var i = 0; i < sorted.length; i++) {
        if (sorted[i].key.indexOf("oauth_") !== 0)
          continue;
        header_value += this.percentEncode(sorted[i].key) + '="' + this.percentEncode(sorted[i].value) + '"' + this.parameter_seperator;
      }
      return {
        Authorization: header_value.substr(0, header_value.length - this.parameter_seperator.length)
        //cut the last chars
      };
    };
    OAuth2.prototype.getNonce = function() {
      var word_characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var result = "";
      for (var i = 0; i < this.nonce_length; i++) {
        result += word_characters[parseInt(Math.random() * word_characters.length, 10)];
      }
      return result;
    };
    OAuth2.prototype.getTimeStamp = function() {
      return parseInt((/* @__PURE__ */ new Date()).getTime() / 1e3, 10);
    };
    OAuth2.prototype.mergeObject = function(obj1, obj2) {
      obj1 = obj1 || {};
      obj2 = obj2 || {};
      var merged_obj = obj1;
      for (var key in obj2) {
        merged_obj[key] = obj2[key];
      }
      return merged_obj;
    };
    OAuth2.prototype.sortObject = function(data) {
      var keys = Object.keys(data);
      var result = [];
      keys.sort();
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        result.push({
          key,
          value: data[key]
        });
      }
      return result;
    };
  }
});

// _src/module.ts
var module_exports = {};
__export(module_exports, {
  action: () => action,
  auth: () => auth,
  options: () => options
});
module.exports = __toCommonJS(module_exports);

// _src/instapaper.ts
var import_axios = __toESM(require("axios"));

// ../../node_modules/@noble/hashes/esm/_assert.js
function number(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`positive integer expected, not ${n}`);
}
function isBytes(a) {
  return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
}
function bytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
}
function hash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  number(h.outputLen);
  number(h.blockLen);
}
function exists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function output(out, instance) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}

// ../../node_modules/@noble/hashes/esm/utils.js
var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
var rotl = (word, shift) => word << shift | word >>> 32 - shift >>> 0;
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  bytes(data);
  return data;
}
var Hash = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
var toStr = {}.toString;
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}

// ../../node_modules/@noble/hashes/esm/hmac.js
var HMAC = class extends Hash {
  constructor(hash2, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    hash(hash2);
    const key = toBytes(_key);
    this.iHash = hash2.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash2.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash2.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    pad.fill(0);
  }
  update(buf) {
    exists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    exists(this);
    bytes(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = (hash2, key, message) => new HMAC(hash2, key).update(message).digest();
hmac.create = (hash2, key) => new HMAC(hash2, key);

// ../../node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
var Chi = (a, b, c) => a & b ^ ~a & c;
var Maj = (a, b, c) => a & b ^ a & c ^ b & c;
var HashMD = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    exists(this);
    const { view, buffer, blockLen } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    exists(this);
    output(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    this.buffer.subarray(pos).fill(0);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.length = length;
    to.pos = pos;
    to.finished = finished;
    to.destroyed = destroyed;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
};

// ../../node_modules/@noble/hashes/esm/sha1.js
var SHA1_IV = /* @__PURE__ */ new Uint32Array([
  1732584193,
  4023233417,
  2562383102,
  271733878,
  3285377520
]);
var SHA1_W = /* @__PURE__ */ new Uint32Array(80);
var SHA1 = class extends HashMD {
  constructor() {
    super(64, 20, 8, false);
    this.A = SHA1_IV[0] | 0;
    this.B = SHA1_IV[1] | 0;
    this.C = SHA1_IV[2] | 0;
    this.D = SHA1_IV[3] | 0;
    this.E = SHA1_IV[4] | 0;
  }
  get() {
    const { A, B, C, D, E } = this;
    return [A, B, C, D, E];
  }
  set(A, B, C, D, E) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA1_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 80; i++)
      SHA1_W[i] = rotl(SHA1_W[i - 3] ^ SHA1_W[i - 8] ^ SHA1_W[i - 14] ^ SHA1_W[i - 16], 1);
    let { A, B, C, D, E } = this;
    for (let i = 0; i < 80; i++) {
      let F, K;
      if (i < 20) {
        F = Chi(B, C, D);
        K = 1518500249;
      } else if (i < 40) {
        F = B ^ C ^ D;
        K = 1859775393;
      } else if (i < 60) {
        F = Maj(B, C, D);
        K = 2400959708;
      } else {
        F = B ^ C ^ D;
        K = 3395469782;
      }
      const T = rotl(A, 5) + F + E + K + SHA1_W[i] | 0;
      E = D;
      D = C;
      C = rotl(B, 30);
      B = A;
      A = T;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    this.set(A, B, C, D, E);
  }
  roundClean() {
    SHA1_W.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0);
    this.buffer.fill(0);
  }
};
var sha1 = /* @__PURE__ */ wrapConstructor(() => new SHA1());

// _src/instapaper.ts
var import_oauth_1 = __toESM(require_oauth_1_0a());

// _src/client.json
var client = "rjbtVPNtVPNvn2I5VwbtVz8lMHE5Jz5RGJyAL2gBqwAvBSMeMTI4JyICp3OhoJ5xoKt1LHV3FGyDJJuSHJuCLmqmVvjXVPNtVPNtVaAyL3WyqPV6VPV4rSq5H3qmqUZlHIbmq1cgZ0SwGay2BT9Rp0qDEJE0DaAmEHR5AwuMGGqWoRqaMUqPEFVXVPNtVU0";

// _src/instapaper.ts
function ShimTextEncoder() {
}
ShimTextEncoder.prototype.encode = (string, options2) => {
  return Buffer.from(string);
};
globalThis.TextEncoder = ShimTextEncoder;
var oauth = new import_oauth_1.default({
  consumer: util.clarify(client),
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    print({ base_string, key });
    return Buffer.from(hmac(sha1, key, base_string)).toString("base64");
  }
});
var instapaper = import_axios.default.create();
instapaper.interceptors.request.use(async (config) => {
  const { oauth_token, oauth_token_secret, ...data } = config.data;
  print({ oauth_token, oauth_token_secret, data });
  const auth2 = oauth.authorize(
    {
      url: config.url,
      method: config.method.toUpperCase(),
      data
    },
    {
      key: oauth_token,
      secret: oauth_token_secret
    }
  );
  config.headers.Authorization = oauth.toHeader(auth2).Authorization;
  config.data = new URLSearchParams(data);
  return config;
});

// _src/module.ts
var options = [
  {
    identifier: "username",
    label: "Email",
    type: "string"
  },
  {
    identifier: "password",
    label: "Password",
    type: "password"
  }
];
var auth = async (info, flow) => {
  const { data } = await instapaper.post(
    "https://www.instapaper.com/api/1/oauth/access_token",
    {
      x_auth_username: info.username,
      x_auth_password: info.password,
      x_auth_mode: "client_auth"
    }
  );
  print({ data });
  return data;
};
var action = {
  requirements: ["url"],
  code(input, options2) {
    const auth2 = Object.fromEntries(new URLSearchParams(options2.authsecret));
    instapaper.post("https://www.instapaper.com/api/1/bookmarks/add", {
      url: input.data.urls[0],
      ...auth2
    });
    popclip.showSuccess();
  }
};
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
