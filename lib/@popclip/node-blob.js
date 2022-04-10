(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nodeBlob = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (Buffer){(function (){
// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js
// (MIT licensed)
// Also based on https://github.com/modulesio/window-fetch/blob/master/src/blob.js

const TYPE = Symbol('type');
const CLOSED = Symbol('closed');

class Blob {
    constructor() {
        Object.defineProperty(this, Symbol.toStringTag, {
            value: 'Blob',
            writable: false,
            enumerable: false,
            configurable: true
        });

        this[CLOSED] = false;
        this[TYPE] = '';

        const blobParts = arguments[0];
        const options = arguments[1];

        const buffers = [];

        if (blobParts) {
            const a = blobParts;
            const length = Number(a.length);
            for (let i = 0; i < length; i++) {
                const element = a[i];
                let buffer;
                if (element instanceof Buffer) {
                    buffer = element;
                } else if (ArrayBuffer.isView(element)) {
                    buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
                } else if (element instanceof ArrayBuffer) {
                    buffer = Buffer.from(element);
                } else if (element instanceof Blob) {
                    buffer = element.buffer;
                } else {
                    buffer = Buffer.from(typeof element === 'string' ? element : String(element));
                }
                buffers.push(buffer);
            }
        }

        this.buffer = Buffer.concat(buffers);

        let type = options && options.type !== undefined && String(options.type).toLowerCase();
        if (type && !/[^\u0020-\u007E]/.test(type)) {
            this[TYPE] = type;
        }
    }
    get size() {
        return this[CLOSED] ? 0 : this.buffer.length;
    }
    get type() {
        return this[TYPE];
    }
    get isClosed() {
        return this[CLOSED];
    }
    slice() {
        const size = this.size;

        const start = arguments[0];
        const end = arguments[1];
        let relativeStart, relativeEnd;
        if (start === undefined) {
            relativeStart = 0;
        } else if (start < 0) {
            relativeStart = Math.max(size + start, 0);
        } else {
            relativeStart = Math.min(start, size);
        }
        if (end === undefined) {
            relativeEnd = size;
        } else if (end < 0) {
            relativeEnd = Math.max(size + end, 0);
        } else {
            relativeEnd = Math.min(end, size);
        }
        const span = Math.max(relativeEnd - relativeStart, 0);

        const buffer = this.buffer;
        const slicedBuffer = buffer.slice(
            relativeStart,
            relativeStart + span
        );
        const blob = new Blob([], { type: arguments[2] });
        blob.buffer = slicedBuffer;
        blob[CLOSED] = this[CLOSED];
        return blob;
    }
    close() {
        this[CLOSED] = true;
    }
};

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
    value: 'BlobPrototype',
    writable: false,
    enumerable: false,
    configurable: true
});

module.exports = Blob;
}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":"buffer"}],2:[function(require,module,exports){
module.exports=require("node-blob")

},{"node-blob":1}]},{},[2])(2)
});
