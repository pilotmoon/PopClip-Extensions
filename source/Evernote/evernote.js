(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.evernote = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
module.exports = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
}

},{}],3:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed to the Apache Software Foundation (ASF) under one
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * or more contributor license agreements. See the NOTICE file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed with this work for additional information
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * regarding copyright ownership. The ASF licenses this file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * to you under the Apache License, Version 2.0 (the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * "License"); you may not use this file except in compliance
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * with the License. You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * software distributed under the License is distributed on an
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * KIND, either express or implied. See the License for the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * specific language governing permissions and limitations
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _oauth = require('oauth');

var _oauth2 = _interopRequireDefault(_oauth);

var _stores = require('./stores');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WrappedNoteStoreClient = function () {
  function WrappedNoteStoreClient(enInfoFunc) {
    _classCallCheck(this, WrappedNoteStoreClient);

    this.enInfoFunc = enInfoFunc;

    for (var key in _stores.NoteStoreClient.prototype) {
      if (key.indexOf('_') === -1 && typeof _stores.NoteStoreClient.prototype[key] === 'function') {
        this[key] = this.createWrapperFunction(key);
      }
    }
  }

  _createClass(WrappedNoteStoreClient, [{
    key: 'getThriftClient',
    value: function getThriftClient() {
      if (!this._thriftClient) {
        this._thriftClient = this.enInfoFunc().then(function (_ref) {
          var token = _ref.token,
              url = _ref.url;

          return new _stores.NoteStoreClient({ token: token, url: url });
        });
      }
      return this._thriftClient;
    }
  }, {
    key: 'createWrapperFunction',
    value: function createWrapperFunction(name) {
      var _this = this;

      return function () {
        for (var _len = arguments.length, orgArgs = Array(_len), _key = 0; _key < _len; _key++) {
          orgArgs[_key] = arguments[_key];
        }

        return _this.getThriftClient().then(function (client) {
          return client[name].apply(client, orgArgs);
        });
      };
    }
  }, {
    key: 'getParamNames',
    value: function getParamNames(func) {
      var funStr = func.toString();
      return funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')')).match(/([^\s,]+)/g);
    }
  }]);

  return WrappedNoteStoreClient;
}();

var Client = function () {
  function Client() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Client);

    this.consumerKey = options.consumerKey;
    this.consumerSecret = options.consumerSecret;
    this.sandbox = options.sandbox === undefined ? true : options.sandbox;
    this.china = !!options.china;
    this.token = options.token;
    var defaultServiceHost = void 0;
    if (this.sandbox) {
      defaultServiceHost = 'sandbox.evernote.com';
    } else if (this.china) {
      defaultServiceHost = 'app.yinxiang.com';
    } else {
      defaultServiceHost = 'www.evernote.com';
    }
    this.serviceHost = options.serviceHost || defaultServiceHost;
  }

  _createClass(Client, [{
    key: 'getRequestToken',
    value: function getRequestToken(callbackUrl, callback) {
      var oauth = this.getOAuthClient(callbackUrl);
      oauth.getOAuthRequestToken(function (err, oauthToken, oauthTokenSecret, results) {
        callback(err, oauthToken, oauthTokenSecret, results);
      });
    }
  }, {
    key: 'getAuthorizeUrl',
    value: function getAuthorizeUrl(oauthToken) {
      return this.getEndpoint('OAuth.action') + '?oauth_token=' + oauthToken;
    }
  }, {
    key: 'getAccessToken',
    value: function getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, callback) {
      var _this2 = this;

      var oauth = this.getOAuthClient('');
      oauth.getOAuthAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, function (err, oauthAccessToken, oauthAccessTokenSecret, results) {
        _this2.token = oauthAccessToken;
        callback(err, oauthAccessToken, oauthAccessTokenSecret, results);
      });
    }
  }, {
    key: 'getUserStore',
    value: function getUserStore() {
      if (!this._userStore) {
        this._userStore = new _stores.UserStoreClient({
          token: this.token,
          url: this.getEndpoint('/edam/user')
        });
      }
      return this._userStore;
    }
  }, {
    key: 'getNoteStore',
    value: function getNoteStore(noteStoreUrl) {
      var _this3 = this;

      if (noteStoreUrl) {
        this.noteStoreUrl = noteStoreUrl;
      }
      return new WrappedNoteStoreClient(function () {
        if (_this3.noteStoreUrl) {
          return Promise.resolve({ token: _this3.token, url: _this3.noteStoreUrl });
        } else {
          return _this3.getUserStore().getUserUrls().then(function (userUrls) {
            _this3.noteStoreUrl = userUrls.noteStoreUrl; // cache for later calls
            return { token: _this3.token, url: userUrls.noteStoreUrl };
          });
        }
      });
    }
  }, {
    key: 'getSharedNoteStore',
    value: function getSharedNoteStore(linkedNotebook) {
      var _this4 = this;

      return new WrappedNoteStoreClient(function () {
        var cache = _this4[linkedNotebook.sharedNotebookGlobalId];
        if (cache && cache.sharedToken) {
          return Promise.resolve({ token: cache.sharedToken, url: linkedNotebook.noteStoreUrl });
        } else {
          return _this4.getNoteStore().authenticateToSharedNotebook(linkedNotebook.sharedNotebookGlobalId).then(function (sharedAuth) {
            var token = sharedAuth.authenticationToken;
            // cache for later calls
            _this4[linkedNotebook.sharedNotebookGlobalId] = { sharedToken: token };
            return { token: token, url: linkedNotebook.noteStoreUrl };
          });
        }
      });
    }
  }, {
    key: 'getBusinessNoteStore',
    value: function getBusinessNoteStore() {
      var _this5 = this;

      return new WrappedNoteStoreClient(function () {
        if (_this5.bizToken && _this5.bizNoteStoreUrl) {
          return Promise.resolve({ token: _this5.bizToken, url: _this5.bizNoteStoreUrl });
        } else {
          return _this5.getUserStore().authenticateToBusiness().then(function (bizAuth) {
            _this5.bizToken = bizAuth.authenticationToken;
            _this5.bizNoteStoreUrl = bizAuth.noteStoreUrl;
            _this5.bizUser = bizAuth.user;
            return { token: bizAuth.authenticationToken, url: bizAuth.noteStoreUrl };
          });
        }
      });
    }
  }, {
    key: 'getEndpoint',
    value: function getEndpoint(path) {
      var url = 'https://' + this.serviceHost;
      if (path) {
        url = url + '/' + path;
      }
      return url;
    }
  }, {
    key: 'getOAuthClient',
    value: function getOAuthClient(callbackUrl) {
      return new _oauth2.default.OAuth(this.getEndpoint('oauth'), this.getEndpoint('oauth'), this.consumerKey, this.consumerSecret, '1.0', callbackUrl, 'HMAC-SHA1');
    }
  }]);

  return Client;
}();

exports.default = Client;
},{"./stores":6,"oauth":"oauth"}],5:[function(require,module,exports){
'use strict';

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _Errors = require('./thrift/gen-js2/Errors');

var _Errors2 = _interopRequireDefault(_Errors);

var _Limits = require('./thrift/gen-js2/Limits');

var _Limits2 = _interopRequireDefault(_Limits);

var _NoteStore = require('./thrift/gen-js2/NoteStore');

var _NoteStore2 = _interopRequireDefault(_NoteStore);

var _Types = require('./thrift/gen-js2/Types');

var _Types2 = _interopRequireDefault(_Types);

var _UserStore = require('./thrift/gen-js2/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env node */
module.exports = {
  Client: _client2.default,
  Errors: _Errors2.default,
  Limits: _Limits2.default,
  NoteStore: _NoteStore2.default,
  Types: _Types2.default,
  UserStore: _UserStore2.default
};
},{"./client":4,"./thrift/gen-js2/Errors":7,"./thrift/gen-js2/Limits":8,"./thrift/gen-js2/NoteStore":9,"./thrift/gen-js2/Types":10,"./thrift/gen-js2/UserStore":11}],6:[function(require,module,exports){
(function (process){(function (){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserStoreClient = exports.NoteStoreClient = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NoteStore = require('./thrift/gen-js2/NoteStore');

var _UserStore = require('./thrift/gen-js2/UserStore');

var _binaryHttpTransport = require('./thrift/transport/binaryHttpTransport');

var _binaryHttpTransport2 = _interopRequireDefault(_binaryHttpTransport);

var _binaryProtocol = require('./thrift/protocol/binaryProtocol');

var _binaryProtocol2 = _interopRequireDefault(_binaryProtocol);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed to the Apache Software Foundation (ASF) under one
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * or more contributor license agreements. See the NOTICE file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed with this work for additional information
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * regarding copyright ownership. The ASF licenses this file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * to you under the Apache License, Version 2.0 (the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * "License"); you may not use this file except in compliance
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * with the License. You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * software distributed under the License is distributed on an
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * KIND, either express or implied. See the License for the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * specific language governing permissions and limitations
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
/* eslint-env node */

var AUTH_PLACEHOLDER = 'AUTH_TOKEN';
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;

/**
 * Finds parameter names for a given function.
 * @return {Object[]}
 */
function getParamNames(fn) {
  var fnString = fn.toString().replace(STRIP_COMMENTS, '');
  var paramNames = fnString.slice(fnString.indexOf('(') + 1, fnString.indexOf(')')).match(ARGUMENT_NAMES);
  return paramNames === null ? [] : paramNames;
}

/**
 * Takes in a Store Client function, and supplies it with an authentication token when
 * necessary. Will return a Promise instead of using callbacks.
 *
 * @param {Function} fn
 * @param {String} fnName
 * @return {Promise}
 */
function makeProxyPromise(fn, fnName) {
  return function () {
    var _this = this;

    var newArgs = [];
    var paramNames = getParamNames(fn);
    var requiresAuthToken = false;
    paramNames.pop(); // remove the callback parameter, will use Promise instead.
    for (var i = 0; i < paramNames.length; i++) {
      var param = paramNames[i];
      if (param === 'authenticationToken') {
        newArgs.push(AUTH_PLACEHOLDER);
        requiresAuthToken = true;
      }
      if (i < arguments.length) {
        newArgs.push(arguments[i]);
      }
    }
    return new Promise(function (resolve, reject) {
      var expectedNum = requiresAuthToken ? paramNames.length - 1 : paramNames.length;
      var actualNum = requiresAuthToken ? newArgs.length - 1 : newArgs.length;
      if (expectedNum !== actualNum) {
        reject('Incorrect number of arguments passed to ' + fnName + ': expected ' + expectedNum + ' but found ' + actualNum);
      } else {
        var prelimPromise = requiresAuthToken ? _this.getAuthToken() : Promise.resolve();
        prelimPromise.then(function (authTokenMaybe) {
          if (authTokenMaybe) {
            newArgs[newArgs.indexOf(AUTH_PLACEHOLDER)] = authTokenMaybe;
          }
          newArgs.push(function (err, response) {
            return err ? reject(err) : resolve(response);
          });
          fn.apply(_this, newArgs);
        }).catch(function (err) {
          return reject(err);
        });
      }
    });
  };
}

function extendClientWithEdamClient(Client, EDAMClient) {
  for (var key in EDAMClient.prototype) {
    if (typeof EDAMClient.prototype[key] === 'function') {
      Client.prototype[key] = makeProxyPromise(EDAMClient.prototype[key], key);
    }
  }
}

function getAdditionalHeaders(token) {
  var m = token && token.match(/:A=([^:]+):/);
  var userAgentId = m ? m[1] : '';
  return {
    'User-Agent': userAgentId + '/' + _package2.default.version + '; Node.js / ' + process.version
  };
}

var UserStoreClient = function (_EDAMUserStore$Client) {
  _inherits(UserStoreClient, _EDAMUserStore$Client);

  function UserStoreClient() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, UserStoreClient);

    if (opts.url) {
      var transport = new _binaryHttpTransport2.default(opts.url);
      var protocol = new _binaryProtocol2.default(transport);
      transport.addHeaders(getAdditionalHeaders(opts.token));

      var _this2 = _possibleConstructorReturn(this, (UserStoreClient.__proto__ || Object.getPrototypeOf(UserStoreClient)).call(this, protocol));

      _this2.url = opts.url;
    } else {
      throw Error('UserStoreClient requires a UserStore Url when initialized');
    }
    if (opts.token) {
      _this2.token = opts.token;
    }
    return _possibleConstructorReturn(_this2);
  }

  _createClass(UserStoreClient, [{
    key: 'getAuthToken',
    value: function getAuthToken() {
      var _this3 = this;

      return new Promise(function (resolve) {
        return resolve(_this3.token);
      });
    }
  }]);

  return UserStoreClient;
}(_UserStore.UserStore.Client);

extendClientWithEdamClient(UserStoreClient, _UserStore.UserStore.Client);

var NoteStoreClient = function (_EDAMNoteStore$Client) {
  _inherits(NoteStoreClient, _EDAMNoteStore$Client);

  function NoteStoreClient() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, NoteStoreClient);

    if (opts.url) {
      var transport = new _binaryHttpTransport2.default(opts.url);
      var protocol = new _binaryProtocol2.default(transport);
      transport.addHeaders(getAdditionalHeaders(opts.token));

      var _this4 = _possibleConstructorReturn(this, (NoteStoreClient.__proto__ || Object.getPrototypeOf(NoteStoreClient)).call(this, protocol));

      _this4.url = opts.url;
    } else {
      throw Error('NoteStoreClient requires a NoteStore Url when initialized');
    }
    if (opts.token) {
      _this4.token = opts.token;
    }
    return _possibleConstructorReturn(_this4);
  }

  _createClass(NoteStoreClient, [{
    key: 'getAuthToken',
    value: function getAuthToken() {
      var _this5 = this;

      return new Promise(function (resolve) {
        return resolve(_this5.token);
      });
    }
  }]);

  return NoteStoreClient;
}(_NoteStore.NoteStore.Client);

extendClientWithEdamClient(NoteStoreClient, _NoteStore.NoteStore.Client);

exports.NoteStoreClient = NoteStoreClient;
exports.UserStoreClient = UserStoreClient;
}).call(this)}).call(this,require('_process'))
},{"../package.json":16,"./thrift/gen-js2/NoteStore":9,"./thrift/gen-js2/UserStore":11,"./thrift/protocol/binaryProtocol":12,"./thrift/transport/binaryHttpTransport":14,"_process":19}],7:[function(require,module,exports){
'use strict';

//
// Autogenerated by Thrift Compiler (0.6.0-en-exported)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


// Define types and services

var Thrift = require('../thrift');
var Types = require('./Types');

module.exports.EDAMErrorCode = {
  'UNKNOWN': 1,
  'BAD_DATA_FORMAT': 2,
  'PERMISSION_DENIED': 3,
  'INTERNAL_ERROR': 4,
  'DATA_REQUIRED': 5,
  'LIMIT_REACHED': 6,
  'QUOTA_REACHED': 7,
  'INVALID_AUTH': 8,
  'AUTH_EXPIRED': 9,
  'DATA_CONFLICT': 10,
  'ENML_VALIDATION': 11,
  'SHARD_UNAVAILABLE': 12,
  'LEN_TOO_SHORT': 13,
  'LEN_TOO_LONG': 14,
  'TOO_FEW': 15,
  'TOO_MANY': 16,
  'UNSUPPORTED_OPERATION': 17,
  'TAKEN_DOWN': 18,
  'RATE_LIMIT_REACHED': 19,
  'BUSINESS_SECURITY_LOGIN_REQUIRED': 20,
  'DEVICE_LIMIT_REACHED': 21
};

module.exports.EDAMInvalidContactReason = {
  'BAD_ADDRESS': 0,
  'DUPLICATE_CONTACT': 1,
  'NO_CONNECTION': 2
};

module.exports.EDAMUserException = Thrift.Exception.define('EDAMUserException', {
  1: { alias: 'errorCode', type: Thrift.Type.I32 },
  2: { alias: 'parameter', type: Thrift.Type.STRING }
});

module.exports.EDAMSystemException = Thrift.Exception.define('EDAMSystemException', {
  1: { alias: 'errorCode', type: Thrift.Type.I32 },
  2: { alias: 'message', type: Thrift.Type.STRING },
  3: { alias: 'rateLimitDuration', type: Thrift.Type.I32 }
});

module.exports.EDAMNotFoundException = Thrift.Exception.define('EDAMNotFoundException', {
  1: { alias: 'identifier', type: Thrift.Type.STRING },
  2: { alias: 'key', type: Thrift.Type.STRING }
});

module.exports.EDAMInvalidContactsException = Thrift.Exception.define('EDAMInvalidContactsException', {
  1: { alias: 'contacts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Contact) },
  2: { alias: 'parameter', type: Thrift.Type.STRING },
  3: { alias: 'reasons', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32) }
});
},{"../thrift":13,"./Types":10}],8:[function(require,module,exports){
'use strict';

//
// Autogenerated by Thrift Compiler (0.6.0-en-exported)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


// Define types and services

var Thrift = require('../thrift');

module.exports.EDAM_ATTRIBUTE_LEN_MIN = 1;

module.exports.EDAM_ATTRIBUTE_LEN_MAX = 4096;

module.exports.EDAM_ATTRIBUTE_REGEX = '^[^\\p{Cc}\\p{Zl}\\p{Zp}]{1,4096}$';

module.exports.EDAM_ATTRIBUTE_LIST_MAX = 100;

module.exports.EDAM_ATTRIBUTE_MAP_MAX = 100;

module.exports.EDAM_GUID_LEN_MIN = 36;

module.exports.EDAM_GUID_LEN_MAX = 36;

module.exports.EDAM_GUID_REGEX = '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

module.exports.EDAM_EMAIL_LEN_MIN = 6;

module.exports.EDAM_EMAIL_LEN_MAX = 255;

module.exports.EDAM_EMAIL_LOCAL_REGEX = '^[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+(\\.[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+)*$';

module.exports.EDAM_EMAIL_DOMAIN_REGEX = '^[A-Za-z0-9-]*[A-Za-z0-9](\\.[A-Za-z0-9-]*[A-Za-z0-9])*\\.([A-Za-z]{2,})$';

module.exports.EDAM_EMAIL_REGEX = '^[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+(\\.[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@[A-Za-z0-9-]*[A-Za-z0-9](\\.[A-Za-z0-9-]*[A-Za-z0-9])*\\.([A-Za-z]{2,})$';

module.exports.EDAM_VAT_REGEX = '^(AT)?U[0-9]{8}$|^(BE)?0?[0-9]{9}$|^(BG)?[0-9]{9,10}$|^(CY)?[0-9]{8}L$|^(CZ)?[0-9]{8,10}$|^(DE)?[0-9]{9}$|^(DK)?[0-9]{8}$|^(EE)?[0-9]{9}$|^(EL|GR)?[0-9]{9}$|^(ES)?[0-9A-Z][0-9]{7}[0-9A-Z]$|^(FI)?[0-9]{8}$|^(FR)?[0-9A-Z]{2}[0-9]{9}$|^(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})$|^(HU)?[0-9]{8}$|^(IE)?[0-9]S[0-9]{5}L$|^(IT)?[0-9]{11}$|^(LT)?([0-9]{9}|[0-9]{12})$|^(LU)?[0-9]{8}$|^(LV)?[0-9]{11}$|^(MT)?[0-9]{8}$|^(NL)?[0-9]{9}B[0-9]{2}$|^(PL)?[0-9]{10}$|^(PT)?[0-9]{9}$|^(RO)?[0-9]{2,10}$|^(SE)?[0-9]{12}$|^(SI)?[0-9]{8}$|^(SK)?[0-9]{10}$|^[0-9]{9}MVA$|^[0-9]{6}$|^CHE[0-9]{9}(TVA|MWST|IVA)$';

module.exports.EDAM_TIMEZONE_LEN_MIN = 1;

module.exports.EDAM_TIMEZONE_LEN_MAX = 32;

module.exports.EDAM_TIMEZONE_REGEX = '^([A-Za-z_-]+(/[A-Za-z_-]+)*)|(GMT(-|\\+)[0-9]{1,2}(:[0-9]{2})?)$';

module.exports.EDAM_MIME_LEN_MIN = 3;

module.exports.EDAM_MIME_LEN_MAX = 255;

module.exports.EDAM_MIME_REGEX = '^[A-Za-z]+/[A-Za-z0-9._+-]+$';

module.exports.EDAM_MIME_TYPE_GIF = 'image/gif';

module.exports.EDAM_MIME_TYPE_JPEG = 'image/jpeg';

module.exports.EDAM_MIME_TYPE_PNG = 'image/png';

module.exports.EDAM_MIME_TYPE_TIFF = 'image/tiff';

module.exports.EDAM_MIME_TYPE_WAV = 'audio/wav';

module.exports.EDAM_MIME_TYPE_MP3 = 'audio/mpeg';

module.exports.EDAM_MIME_TYPE_AMR = 'audio/amr';

module.exports.EDAM_MIME_TYPE_AAC = 'audio/aac';

module.exports.EDAM_MIME_TYPE_M4A = 'audio/mp4';

module.exports.EDAM_MIME_TYPE_MP4_VIDEO = 'video/mp4';

module.exports.EDAM_MIME_TYPE_INK = 'application/vnd.evernote.ink';

module.exports.EDAM_MIME_TYPE_PDF = 'application/pdf';

module.exports.EDAM_MIME_TYPE_DEFAULT = 'application/octet-stream';

module.exports.EDAM_MIME_TYPES = ['image/gif', 'image/jpeg', 'image/png', 'audio/wav', 'audio/mpeg', 'audio/amr', 'application/vnd.evernote.ink', 'application/pdf', 'video/mp4', 'audio/aac', 'audio/mp4'];

module.exports.EDAM_INDEXABLE_RESOURCE_MIME_TYPES = ['application/msword', 'application/mspowerpoint', 'application/excel', 'application/vnd.ms-word', 'application/vnd.ms-powerpoint', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.apple.pages', 'application/vnd.apple.numbers', 'application/vnd.apple.keynote', 'application/x-iwork-pages-sffpages', 'application/x-iwork-numbers-sffnumbers', 'application/x-iwork-keynote-sffkey'];

module.exports.EDAM_INDEXABLE_PLAINTEXT_MIME_TYPES = ['application/x-sh', 'application/x-bsh', 'application/sql', 'application/x-sql'];

module.exports.EDAM_SEARCH_QUERY_LEN_MIN = 0;

module.exports.EDAM_SEARCH_QUERY_LEN_MAX = 1024;

module.exports.EDAM_SEARCH_QUERY_REGEX = '^[^\\p{Cc}\\p{Zl}\\p{Zp}]{0,1024}$';

module.exports.EDAM_HASH_LEN = 16;

module.exports.EDAM_USER_USERNAME_LEN_MIN = 1;

module.exports.EDAM_USER_USERNAME_LEN_MAX = 64;

module.exports.EDAM_USER_USERNAME_REGEX = '^[a-z0-9]([a-z0-9_-]{0,62}[a-z0-9])?$';

module.exports.EDAM_USER_NAME_LEN_MIN = 1;

module.exports.EDAM_USER_NAME_LEN_MAX = 255;

module.exports.EDAM_USER_NAME_REGEX = '^[^\\p{Cc}\\p{Zl}\\p{Zp}]{1,255}$';

module.exports.EDAM_TAG_NAME_LEN_MIN = 1;

module.exports.EDAM_TAG_NAME_LEN_MAX = 100;

module.exports.EDAM_TAG_NAME_REGEX = '^[^,\\p{Cc}\\p{Z}]([^,\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^,\\p{Cc}\\p{Z}])?$';

module.exports.EDAM_NOTE_TITLE_LEN_MIN = 1;

module.exports.EDAM_NOTE_TITLE_LEN_MAX = 255;

module.exports.EDAM_NOTE_TITLE_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,253}[^\\p{Cc}\\p{Z}])?$';

module.exports.EDAM_NOTE_CONTENT_LEN_MIN = 0;

module.exports.EDAM_NOTE_CONTENT_LEN_MAX = 5242880;

module.exports.EDAM_APPLICATIONDATA_NAME_LEN_MIN = 3;

module.exports.EDAM_APPLICATIONDATA_NAME_LEN_MAX = 32;

module.exports.EDAM_APPLICATIONDATA_VALUE_LEN_MIN = 0;

module.exports.EDAM_APPLICATIONDATA_VALUE_LEN_MAX = 4092;

module.exports.EDAM_APPLICATIONDATA_ENTRY_LEN_MAX = 4095;

module.exports.EDAM_APPLICATIONDATA_NAME_REGEX = '^[A-Za-z0-9_.-]{3,32}$';

module.exports.EDAM_APPLICATIONDATA_VALUE_REGEX = '^[\\p{Space}[^\\p{Cc}]]{0,4092}$';

module.exports.EDAM_NOTEBOOK_NAME_LEN_MIN = 1;

module.exports.EDAM_NOTEBOOK_NAME_LEN_MAX = 100;

module.exports.EDAM_NOTEBOOK_NAME_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^\\p{Cc}\\p{Z}])?$';

module.exports.EDAM_NOTEBOOK_STACK_LEN_MIN = 1;

module.exports.EDAM_NOTEBOOK_STACK_LEN_MAX = 100;

module.exports.EDAM_NOTEBOOK_STACK_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^\\p{Cc}\\p{Z}])?$';

module.exports.EDAM_PUBLISHING_URI_LEN_MIN = 1;

module.exports.EDAM_PUBLISHING_URI_LEN_MAX = 255;

module.exports.EDAM_PUBLISHING_URI_REGEX = '^[a-zA-Z0-9.~_+-]{1,255}$';

module.exports.EDAM_PUBLISHING_URI_PROHIBITED = ['.', '..'];

module.exports.EDAM_PUBLISHING_DESCRIPTION_LEN_MIN = 1;

module.exports.EDAM_PUBLISHING_DESCRIPTION_LEN_MAX = 200;

module.exports.EDAM_PUBLISHING_DESCRIPTION_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,198}[^\\p{Cc}\\p{Z}])?$';

module.exports.EDAM_SAVED_SEARCH_NAME_LEN_MIN = 1;

module.exports.EDAM_SAVED_SEARCH_NAME_LEN_MAX = 100;

module.exports.EDAM_SAVED_SEARCH_NAME_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,98}[^\\p{Cc}\\p{Z}])?$';

module.exports.EDAM_USER_PASSWORD_LEN_MIN = 6;

module.exports.EDAM_USER_PASSWORD_LEN_MAX = 64;

module.exports.EDAM_USER_PASSWORD_REGEX = '^[A-Za-z0-9!#$%&\'()*+,./:;<=>?@^_`{|}~\\[\\]\\\\-]{6,64}$';

module.exports.EDAM_BUSINESS_URI_LEN_MAX = 32;

module.exports.EDAM_BUSINESS_MARKETING_CODE_REGEX_PATTERN = '[A-Za-z0-9-]{1,128}';

module.exports.EDAM_NOTE_TAGS_MAX = 100;

module.exports.EDAM_NOTE_RESOURCES_MAX = 1000;

module.exports.EDAM_USER_TAGS_MAX = 100000;

module.exports.EDAM_BUSINESS_TAGS_MAX = 100000;

module.exports.EDAM_USER_SAVED_SEARCHES_MAX = 100;

module.exports.EDAM_USER_NOTES_MAX = 100000;

module.exports.EDAM_BUSINESS_NOTES_MAX = 500000;

module.exports.EDAM_USER_NOTEBOOKS_MAX = 250;

module.exports.EDAM_BUSINESS_NOTEBOOKS_MAX = 10000;

module.exports.EDAM_USER_RECENT_MAILED_ADDRESSES_MAX = 10;

module.exports.EDAM_USER_MAIL_LIMIT_DAILY_FREE = 50;

module.exports.EDAM_USER_MAIL_LIMIT_DAILY_PREMIUM = 200;

module.exports.EDAM_USER_UPLOAD_LIMIT_FREE = 62914560;

module.exports.EDAM_USER_UPLOAD_LIMIT_PREMIUM = 10737418240;

module.exports.EDAM_USER_UPLOAD_LIMIT_PLUS = 1073741824;

module.exports.EDAM_USER_UPLOAD_SURVEY_THRESHOLD = 5368709120;

module.exports.EDAM_USER_UPLOAD_LIMIT_BUSINESS = 10737418240;

module.exports.EDAM_USER_UPLOAD_LIMIT_BUSINESS_PER_USER = 2147483647;

module.exports.EDAM_NOTE_SIZE_MAX_FREE = 26214400;

module.exports.EDAM_NOTE_SIZE_MAX_PREMIUM = 209715200;

module.exports.EDAM_RESOURCE_SIZE_MAX_FREE = 26214400;

module.exports.EDAM_RESOURCE_SIZE_MAX_PREMIUM = 209715200;

module.exports.EDAM_USER_LINKED_NOTEBOOK_MAX = 100;

module.exports.EDAM_USER_LINKED_NOTEBOOK_MAX_PREMIUM = 500;

module.exports.EDAM_NOTEBOOK_BUSINESS_SHARED_NOTEBOOK_MAX = 5000;

module.exports.EDAM_NOTEBOOK_PERSONAL_SHARED_NOTEBOOK_MAX = 500;

module.exports.EDAM_NOTE_BUSINESS_SHARED_NOTE_MAX = 1000;

module.exports.EDAM_NOTE_PERSONAL_SHARED_NOTE_MAX = 100;

module.exports.EDAM_NOTE_CONTENT_CLASS_LEN_MIN = 3;

module.exports.EDAM_NOTE_CONTENT_CLASS_LEN_MAX = 32;

module.exports.EDAM_NOTE_CONTENT_CLASS_REGEX = '^[A-Za-z0-9_.-]{3,32}$';

module.exports.EDAM_HELLO_APP_CONTENT_CLASS_PREFIX = 'evernote.hello.';

module.exports.EDAM_FOOD_APP_CONTENT_CLASS_PREFIX = 'evernote.food.';

module.exports.EDAM_CONTENT_CLASS_HELLO_ENCOUNTER = 'evernote.hello.encounter';

module.exports.EDAM_CONTENT_CLASS_HELLO_PROFILE = 'evernote.hello.profile';

module.exports.EDAM_CONTENT_CLASS_FOOD_MEAL = 'evernote.food.meal';

module.exports.EDAM_CONTENT_CLASS_SKITCH_PREFIX = 'evernote.skitch';

module.exports.EDAM_CONTENT_CLASS_SKITCH = 'evernote.skitch';

module.exports.EDAM_CONTENT_CLASS_SKITCH_PDF = 'evernote.skitch.pdf';

module.exports.EDAM_CONTENT_CLASS_PENULTIMATE_PREFIX = 'evernote.penultimate.';

module.exports.EDAM_CONTENT_CLASS_PENULTIMATE_NOTEBOOK = 'evernote.penultimate.notebook';

module.exports.EDAM_SOURCE_APPLICATION_POSTIT = 'postit';

module.exports.EDAM_SOURCE_APPLICATION_MOLESKINE = 'moleskine';

module.exports.EDAM_SOURCE_APPLICATION_EN_SCANSNAP = 'scanner.scansnap.evernote';

module.exports.EDAM_SOURCE_APPLICATION_EWC = 'clipncite.web';

module.exports.EDAM_SOURCE_OUTLOOK_CLIPPER = 'app.ms.outlook';

module.exports.EDAM_NOTE_TITLE_QUALITY_UNTITLED = 0;

module.exports.EDAM_NOTE_TITLE_QUALITY_LOW = 1;

module.exports.EDAM_NOTE_TITLE_QUALITY_MEDIUM = 2;

module.exports.EDAM_NOTE_TITLE_QUALITY_HIGH = 3;

module.exports.EDAM_RELATED_PLAINTEXT_LEN_MIN = 1;

module.exports.EDAM_RELATED_PLAINTEXT_LEN_MAX = 131072;

module.exports.EDAM_RELATED_MAX_NOTES = 25;

module.exports.EDAM_RELATED_MAX_NOTEBOOKS = 1;

module.exports.EDAM_RELATED_MAX_TAGS = 25;

module.exports.EDAM_RELATED_MAX_EXPERTS = 10;

module.exports.EDAM_RELATED_MAX_RELATED_CONTENT = 10;

module.exports.EDAM_BUSINESS_NOTEBOOK_DESCRIPTION_LEN_MIN = 1;

module.exports.EDAM_BUSINESS_NOTEBOOK_DESCRIPTION_LEN_MAX = 200;

module.exports.EDAM_BUSINESS_NOTEBOOK_DESCRIPTION_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,198}[^\\p{Cc}\\p{Z}])?$';

module.exports.EDAM_BUSINESS_PHONE_NUMBER_LEN_MAX = 20;

module.exports.EDAM_PREFERENCE_NAME_LEN_MIN = 3;

module.exports.EDAM_PREFERENCE_NAME_LEN_MAX = 32;

module.exports.EDAM_PREFERENCE_VALUE_LEN_MIN = 1;

module.exports.EDAM_PREFERENCE_VALUE_LEN_MAX = 1024;

module.exports.EDAM_MAX_PREFERENCES = 100;

module.exports.EDAM_MAX_VALUES_PER_PREFERENCE = 256;

module.exports.EDAM_PREFERENCE_ONLY_ONE_VALUE_LEN_MAX = 16384;

module.exports.EDAM_PREFERENCE_NAME_REGEX = '^[A-Za-z0-9_.-]{3,32}$';

module.exports.EDAM_PREFERENCE_VALUE_REGEX = '^[^\\p{Cc}]{1,1024}$';

module.exports.EDAM_PREFERENCE_ONLY_ONE_VALUE_REGEX = '^[^\\p{Cc}]{1,16384}$';

module.exports.EDAM_PREFERENCE_SHORTCUTS = 'evernote.shortcuts';

module.exports.EDAM_PREFERENCE_BUSINESS_DEFAULT_NOTEBOOK = 'evernote.business.notebook';

module.exports.EDAM_PREFERENCE_BUSINESS_QUICKNOTE = 'evernote.business.quicknote';

module.exports.EDAM_PREFERENCE_SHORTCUTS_MAX_VALUES = 250;

module.exports.EDAM_DEVICE_ID_LEN_MAX = 32;

module.exports.EDAM_DEVICE_ID_REGEX = '^[^\\p{Cc}]{1,32}$';

module.exports.EDAM_DEVICE_DESCRIPTION_LEN_MAX = 64;

module.exports.EDAM_DEVICE_DESCRIPTION_REGEX = '^[^\\p{Cc}]{1,64}$';

module.exports.EDAM_SEARCH_SUGGESTIONS_MAX = 10;

module.exports.EDAM_SEARCH_SUGGESTIONS_PREFIX_LEN_MAX = 1024;

module.exports.EDAM_SEARCH_SUGGESTIONS_PREFIX_LEN_MIN = 2;

module.exports.EDAM_FIND_CONTACT_DEFAULT_MAX_RESULTS = 100;

module.exports.EDAM_FIND_CONTACT_MAX_RESULTS = 256;

module.exports.EDAM_NOTE_LOCK_VIEWERS_NOTES_MAX = 150;

module.exports.EDAM_GET_ORDERS_MAX_RESULTS = 2000;

module.exports.EDAM_MESSAGE_BODY_LEN_MAX = 2048;

module.exports.EDAM_MESSAGE_BODY_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,2046}[^\\p{Cc}\\p{Z}])?$';

module.exports.EDAM_MESSAGE_RECIPIENTS_MAX = 50;

module.exports.EDAM_MESSAGE_ATTACHMENTS_MAX = 100;

module.exports.EDAM_MESSAGE_ATTACHMENT_TITLE_LEN_MAX = 255;

module.exports.EDAM_MESSAGE_ATTACHMENT_TITLE_REGEX = '^[^\\p{Cc}\\p{Z}]([^\\p{Cc}\\p{Zl}\\p{Zp}]{0,253}[^\\p{Cc}\\p{Z}])?$';

module.exports.EDAM_MESSAGE_ATTACHMENT_SNIPPET_LEN_MAX = 2048;

module.exports.EDAM_MESSAGE_ATTACHMENT_SNIPPET_REGEX = '^[^\\p{Cc}\\p{Z}]([\\n[^\\p{Cc}\\p{Zl}\\p{Zp}]]{0,2046}[^\\p{Cc}\\p{Z}])?$';

module.exports.EDAM_USER_PROFILE_PHOTO_MAX_BYTES = 716800;

module.exports.EDAM_PROMOTION_ID_LEN_MAX = 32;

module.exports.EDAM_PROMOTION_ID_REGEX = '^[A-Za-z0-9_.-]{1,32}$';

module.exports.EDAM_APP_RATING_MIN = 1;

module.exports.EDAM_APP_RATING_MAX = 5;

module.exports.EDAM_SNIPPETS_NOTES_MAX = 24;

module.exports.EDAM_CONNECTED_IDENTITY_REQUEST_MAX = 100;
},{"../thrift":13}],9:[function(require,module,exports){
'use strict';

//
// Autogenerated by Thrift Compiler (0.6.0-en-exported)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


// Define types and services

var Thrift = require('../thrift');
var UserStore = require('./UserStore');
var Types = require('./Types');
var Errors = require('./Errors');
var Limits = require('./Limits');

module.exports.UserSetting = {
  'RECEIVE_REMINDER_EMAIL': 1,
  'TIMEZONE': 2
};

module.exports.ShareRelationshipPrivilegeLevel = {
  'READ_NOTEBOOK': 0,
  'READ_NOTEBOOK_PLUS_ACTIVITY': 10,
  'MODIFY_NOTEBOOK_PLUS_ACTIVITY': 20,
  'FULL_ACCESS': 30
};

module.exports.SyncState = Thrift.Struct.define('SyncState', {
  1: { alias: 'currentTime', type: Thrift.Type.I64 },
  2: { alias: 'fullSyncBefore', type: Thrift.Type.I64 },
  3: { alias: 'updateCount', type: Thrift.Type.I32 },
  4: { alias: 'uploaded', type: Thrift.Type.I64 },
  5: { alias: 'userLastUpdated', type: Thrift.Type.I64 },
  6: { alias: 'userMaxMessageEventId', type: Thrift.Type.I64 }
});

module.exports.SyncChunk = Thrift.Struct.define('SyncChunk', {
  1: { alias: 'currentTime', type: Thrift.Type.I64 },
  2: { alias: 'chunkHighUSN', type: Thrift.Type.I32 },
  3: { alias: 'updateCount', type: Thrift.Type.I32 },
  4: { alias: 'notes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Note) },
  5: { alias: 'notebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Notebook) },
  6: { alias: 'tags', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Tag) },
  7: { alias: 'searches', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.SavedSearch) },
  8: { alias: 'resources', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Resource) },
  9: { alias: 'expungedNotes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  10: { alias: 'expungedNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  11: { alias: 'expungedTags', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  12: { alias: 'expungedSearches', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  13: { alias: 'linkedNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.LinkedNotebook) },
  14: { alias: 'expungedLinkedNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) }
});

module.exports.SyncChunkFilter = Thrift.Struct.define('SyncChunkFilter', {
  1: { alias: 'includeNotes', type: Thrift.Type.BOOL },
  2: { alias: 'includeNoteResources', type: Thrift.Type.BOOL },
  3: { alias: 'includeNoteAttributes', type: Thrift.Type.BOOL },
  4: { alias: 'includeNotebooks', type: Thrift.Type.BOOL },
  5: { alias: 'includeTags', type: Thrift.Type.BOOL },
  6: { alias: 'includeSearches', type: Thrift.Type.BOOL },
  7: { alias: 'includeResources', type: Thrift.Type.BOOL },
  8: { alias: 'includeLinkedNotebooks', type: Thrift.Type.BOOL },
  9: { alias: 'includeExpunged', type: Thrift.Type.BOOL },
  10: { alias: 'includeNoteApplicationDataFullMap', type: Thrift.Type.BOOL },
  12: { alias: 'includeResourceApplicationDataFullMap', type: Thrift.Type.BOOL },
  13: { alias: 'includeNoteResourceApplicationDataFullMap', type: Thrift.Type.BOOL },
  17: { alias: 'includeSharedNotes', type: Thrift.Type.BOOL },
  16: { alias: 'omitSharedNotebooks', type: Thrift.Type.BOOL },
  11: { alias: 'requireNoteContentClass', type: Thrift.Type.STRING },
  15: { alias: 'notebookGuids', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) }
});

module.exports.NoteFilter = Thrift.Struct.define('NoteFilter', {
  1: { alias: 'order', type: Thrift.Type.I32 },
  2: { alias: 'ascending', type: Thrift.Type.BOOL },
  3: { alias: 'words', type: Thrift.Type.STRING },
  4: { alias: 'notebookGuid', type: Thrift.Type.STRING },
  5: { alias: 'tagGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  6: { alias: 'timeZone', type: Thrift.Type.STRING },
  7: { alias: 'inactive', type: Thrift.Type.BOOL },
  8: { alias: 'emphasized', type: Thrift.Type.STRING },
  9: { alias: 'includeAllReadableNotebooks', type: Thrift.Type.BOOL }
});

module.exports.NoteList = Thrift.Struct.define('NoteList', {
  1: { alias: 'startIndex', type: Thrift.Type.I32 },
  2: { alias: 'totalNotes', type: Thrift.Type.I32 },
  3: { alias: 'notes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Note) },
  4: { alias: 'stoppedWords', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  5: { alias: 'searchedWords', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  6: { alias: 'updateCount', type: Thrift.Type.I32 }
});

module.exports.NoteMetadata = Thrift.Struct.define('NoteMetadata', {
  1: { alias: 'guid', type: Thrift.Type.STRING },
  2: { alias: 'title', type: Thrift.Type.STRING },
  5: { alias: 'contentLength', type: Thrift.Type.I32 },
  6: { alias: 'created', type: Thrift.Type.I64 },
  7: { alias: 'updated', type: Thrift.Type.I64 },
  8: { alias: 'deleted', type: Thrift.Type.I64 },
  10: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
  11: { alias: 'notebookGuid', type: Thrift.Type.STRING },
  12: { alias: 'tagGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  14: { alias: 'attributes', type: Thrift.Type.STRUCT, def: Types.NoteAttributes },
  20: { alias: 'largestResourceMime', type: Thrift.Type.STRING },
  21: { alias: 'largestResourceSize', type: Thrift.Type.I32 }
});

module.exports.NotesMetadataList = Thrift.Struct.define('NotesMetadataList', {
  1: { alias: 'startIndex', type: Thrift.Type.I32 },
  2: { alias: 'totalNotes', type: Thrift.Type.I32 },
  3: { alias: 'notes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteMetadata) },
  4: { alias: 'stoppedWords', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  5: { alias: 'searchedWords', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  6: { alias: 'updateCount', type: Thrift.Type.I32 }
});

module.exports.NotesMetadataResultSpec = Thrift.Struct.define('NotesMetadataResultSpec', {
  2: { alias: 'includeTitle', type: Thrift.Type.BOOL },
  5: { alias: 'includeContentLength', type: Thrift.Type.BOOL },
  6: { alias: 'includeCreated', type: Thrift.Type.BOOL },
  7: { alias: 'includeUpdated', type: Thrift.Type.BOOL },
  8: { alias: 'includeDeleted', type: Thrift.Type.BOOL },
  10: { alias: 'includeUpdateSequenceNum', type: Thrift.Type.BOOL },
  11: { alias: 'includeNotebookGuid', type: Thrift.Type.BOOL },
  12: { alias: 'includeTagGuids', type: Thrift.Type.BOOL },
  14: { alias: 'includeAttributes', type: Thrift.Type.BOOL },
  20: { alias: 'includeLargestResourceMime', type: Thrift.Type.BOOL },
  21: { alias: 'includeLargestResourceSize', type: Thrift.Type.BOOL }
});

module.exports.NoteCollectionCounts = Thrift.Struct.define('NoteCollectionCounts', {
  1: { alias: 'notebookCounts', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.I32) },
  2: { alias: 'tagCounts', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.I32) },
  3: { alias: 'trashCount', type: Thrift.Type.I32 }
});

module.exports.NoteResultSpec = Thrift.Struct.define('NoteResultSpec', {
  1: { alias: 'includeContent', type: Thrift.Type.BOOL },
  2: { alias: 'includeResourcesData', type: Thrift.Type.BOOL },
  3: { alias: 'includeResourcesRecognition', type: Thrift.Type.BOOL },
  4: { alias: 'includeResourcesAlternateData', type: Thrift.Type.BOOL },
  5: { alias: 'includeSharedNotes', type: Thrift.Type.BOOL },
  6: { alias: 'includeNoteAppDataValues', type: Thrift.Type.BOOL },
  7: { alias: 'includeResourceAppDataValues', type: Thrift.Type.BOOL },
  8: { alias: 'includeAccountLimits', type: Thrift.Type.BOOL }
});

module.exports.NoteEmailParameters = Thrift.Struct.define('NoteEmailParameters', {
  1: { alias: 'guid', type: Thrift.Type.STRING },
  2: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note },
  3: { alias: 'toAddresses', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  4: { alias: 'ccAddresses', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  5: { alias: 'subject', type: Thrift.Type.STRING },
  6: { alias: 'message', type: Thrift.Type.STRING }
});

module.exports.NoteVersionId = Thrift.Struct.define('NoteVersionId', {
  1: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
  2: { alias: 'updated', type: Thrift.Type.I64 },
  3: { alias: 'saved', type: Thrift.Type.I64 },
  4: { alias: 'title', type: Thrift.Type.STRING },
  5: { alias: 'lastEditorId', type: Thrift.Type.I32 }
});

module.exports.RelatedQuery = Thrift.Struct.define('RelatedQuery', {
  1: { alias: 'noteGuid', type: Thrift.Type.STRING },
  2: { alias: 'plainText', type: Thrift.Type.STRING },
  3: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter },
  4: { alias: 'referenceUri', type: Thrift.Type.STRING },
  5: { alias: 'context', type: Thrift.Type.STRING },
  6: { alias: 'cacheKey', type: Thrift.Type.STRING }
});

module.exports.RelatedResult = Thrift.Struct.define('RelatedResult', {
  1: { alias: 'notes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Note) },
  2: { alias: 'notebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Notebook) },
  3: { alias: 'tags', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Tag) },
  4: { alias: 'containingNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.NotebookDescriptor) },
  5: { alias: 'debugInfo', type: Thrift.Type.STRING },
  6: { alias: 'experts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.UserProfile) },
  7: { alias: 'relatedContent', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.RelatedContent) },
  8: { alias: 'cacheKey', type: Thrift.Type.STRING },
  9: { alias: 'cacheExpires', type: Thrift.Type.I32 }
});

module.exports.RelatedResultSpec = Thrift.Struct.define('RelatedResultSpec', {
  1: { alias: 'maxNotes', type: Thrift.Type.I32 },
  2: { alias: 'maxNotebooks', type: Thrift.Type.I32 },
  3: { alias: 'maxTags', type: Thrift.Type.I32 },
  4: { alias: 'writableNotebooksOnly', type: Thrift.Type.BOOL },
  5: { alias: 'includeContainingNotebooks', type: Thrift.Type.BOOL },
  6: { alias: 'includeDebugInfo', type: Thrift.Type.BOOL },
  7: { alias: 'maxExperts', type: Thrift.Type.I32 },
  8: { alias: 'maxRelatedContent', type: Thrift.Type.I32 },
  9: { alias: 'relatedContentTypes', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.I32) }
});

module.exports.UpdateNoteIfUsnMatchesResult = Thrift.Struct.define('UpdateNoteIfUsnMatchesResult', {
  1: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note },
  2: { alias: 'updated', type: Thrift.Type.BOOL }
});

module.exports.ShareRelationshipRestrictions = Thrift.Struct.define('ShareRelationshipRestrictions', {
  1: { alias: 'noSetReadOnly', type: Thrift.Type.BOOL },
  2: { alias: 'noSetReadPlusActivity', type: Thrift.Type.BOOL },
  3: { alias: 'noSetModify', type: Thrift.Type.BOOL },
  4: { alias: 'noSetFullAccess', type: Thrift.Type.BOOL }
});

module.exports.InvitationShareRelationship = Thrift.Struct.define('InvitationShareRelationship', {
  1: { alias: 'displayName', type: Thrift.Type.STRING },
  2: { alias: 'recipientUserIdentity', type: Thrift.Type.STRUCT, def: Types.UserIdentity },
  3: { alias: 'privilege', type: Thrift.Type.I32 },
  5: { alias: 'sharerUserId', type: Thrift.Type.I32 }
});

module.exports.MemberShareRelationship = Thrift.Struct.define('MemberShareRelationship', {
  1: { alias: 'displayName', type: Thrift.Type.STRING },
  2: { alias: 'recipientUserId', type: Thrift.Type.I32 },
  3: { alias: 'bestPrivilege', type: Thrift.Type.I32 },
  4: { alias: 'individualPrivilege', type: Thrift.Type.I32 },
  5: { alias: 'restrictions', type: Thrift.Type.STRUCT, def: module.exports.ShareRelationshipRestrictions },
  6: { alias: 'sharerUserId', type: Thrift.Type.I32 }
});

module.exports.ShareRelationships = Thrift.Struct.define('ShareRelationships', {
  1: { alias: 'invitations', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.InvitationShareRelationship) },
  2: { alias: 'memberships', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.MemberShareRelationship) },
  3: { alias: 'invitationRestrictions', type: Thrift.Type.STRUCT, def: module.exports.ShareRelationshipRestrictions }
});

module.exports.ManageNotebookSharesParameters = Thrift.Struct.define('ManageNotebookSharesParameters', {
  1: { alias: 'notebookGuid', type: Thrift.Type.STRING },
  2: { alias: 'inviteMessage', type: Thrift.Type.STRING },
  3: { alias: 'membershipsToUpdate', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.MemberShareRelationship) },
  4: { alias: 'invitationsToCreateOrUpdate', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.InvitationShareRelationship) },
  5: { alias: 'unshares', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.UserIdentity) }
});

module.exports.ManageNotebookSharesError = Thrift.Struct.define('ManageNotebookSharesError', {
  1: { alias: 'userIdentity', type: Thrift.Type.STRUCT, def: Types.UserIdentity },
  2: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
  3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
});

module.exports.ManageNotebookSharesResult = Thrift.Struct.define('ManageNotebookSharesResult', {
  1: { alias: 'errors', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.ManageNotebookSharesError) }
});

module.exports.SharedNoteTemplate = Thrift.Struct.define('SharedNoteTemplate', {
  1: { alias: 'noteGuid', type: Thrift.Type.STRING },
  4: { alias: 'recipientThreadId', type: Thrift.Type.I64 },
  2: { alias: 'recipientContacts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Contact) },
  3: { alias: 'privilege', type: Thrift.Type.I32 }
});

module.exports.NotebookShareTemplate = Thrift.Struct.define('NotebookShareTemplate', {
  1: { alias: 'notebookGuid', type: Thrift.Type.STRING },
  4: { alias: 'recipientThreadId', type: Thrift.Type.I64 },
  2: { alias: 'recipientContacts', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Contact) },
  3: { alias: 'privilege', type: Thrift.Type.I32 }
});

module.exports.CreateOrUpdateNotebookSharesResult = Thrift.Struct.define('CreateOrUpdateNotebookSharesResult', {
  1: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
  2: { alias: 'matchingShares', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.SharedNotebook) }
});

module.exports.NoteShareRelationshipRestrictions = Thrift.Struct.define('NoteShareRelationshipRestrictions', {
  1: { alias: 'noSetReadNote', type: Thrift.Type.BOOL },
  2: { alias: 'noSetModifyNote', type: Thrift.Type.BOOL },
  3: { alias: 'noSetFullAccess', type: Thrift.Type.BOOL }
});

module.exports.NoteMemberShareRelationship = Thrift.Struct.define('NoteMemberShareRelationship', {
  1: { alias: 'displayName', type: Thrift.Type.STRING },
  2: { alias: 'recipientUserId', type: Thrift.Type.I32 },
  3: { alias: 'privilege', type: Thrift.Type.I32 },
  4: { alias: 'restrictions', type: Thrift.Type.STRUCT, def: module.exports.NoteShareRelationshipRestrictions },
  5: { alias: 'sharerUserId', type: Thrift.Type.I32 }
});

module.exports.NoteInvitationShareRelationship = Thrift.Struct.define('NoteInvitationShareRelationship', {
  1: { alias: 'displayName', type: Thrift.Type.STRING },
  2: { alias: 'recipientIdentityId', type: Thrift.Type.I64 },
  3: { alias: 'privilege', type: Thrift.Type.I32 },
  5: { alias: 'sharerUserId', type: Thrift.Type.I32 }
});

module.exports.NoteShareRelationships = Thrift.Struct.define('NoteShareRelationships', {
  1: { alias: 'invitations', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteInvitationShareRelationship) },
  2: { alias: 'memberships', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteMemberShareRelationship) },
  3: { alias: 'invitationRestrictions', type: Thrift.Type.STRUCT, def: module.exports.NoteShareRelationshipRestrictions }
});

module.exports.ManageNoteSharesParameters = Thrift.Struct.define('ManageNoteSharesParameters', {
  1: { alias: 'noteGuid', type: Thrift.Type.STRING },
  2: { alias: 'membershipsToUpdate', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteMemberShareRelationship) },
  3: { alias: 'invitationsToUpdate', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteInvitationShareRelationship) },
  4: { alias: 'membershipsToUnshare', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I32) },
  5: { alias: 'invitationsToUnshare', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I64) }
});

module.exports.ManageNoteSharesError = Thrift.Struct.define('ManageNoteSharesError', {
  1: { alias: 'identityID', type: Thrift.Type.I64 },
  2: { alias: 'userID', type: Thrift.Type.I32 },
  3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
  4: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
});

module.exports.ManageNoteSharesResult = Thrift.Struct.define('ManageNoteSharesResult', {
  1: { alias: 'errors', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.ManageNoteSharesError) }
});

var NoteStore = module.exports.NoteStore = {};

NoteStore.getSyncState = Thrift.Method.define({
  alias: 'getSyncState',
  args: Thrift.Struct.define('getSyncStateArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('getSyncStateResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.SyncState },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.getFilteredSyncChunk = Thrift.Method.define({
  alias: 'getFilteredSyncChunk',
  args: Thrift.Struct.define('getFilteredSyncChunkArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'afterUSN', type: Thrift.Type.I32, index: 1 },
    3: { alias: 'maxEntries', type: Thrift.Type.I32, index: 2 },
    4: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.SyncChunkFilter, index: 3 }
  }),
  result: Thrift.Struct.define('getFilteredSyncChunkResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.SyncChunk },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.getLinkedNotebookSyncState = Thrift.Method.define({
  alias: 'getLinkedNotebookSyncState',
  args: Thrift.Struct.define('getLinkedNotebookSyncStateArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'linkedNotebook', type: Thrift.Type.STRUCT, def: Types.LinkedNotebook, index: 1 }
  }),
  result: Thrift.Struct.define('getLinkedNotebookSyncStateResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.SyncState },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getLinkedNotebookSyncChunk = Thrift.Method.define({
  alias: 'getLinkedNotebookSyncChunk',
  args: Thrift.Struct.define('getLinkedNotebookSyncChunkArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'linkedNotebook', type: Thrift.Type.STRUCT, def: Types.LinkedNotebook, index: 1 },
    3: { alias: 'afterUSN', type: Thrift.Type.I32, index: 2 },
    4: { alias: 'maxEntries', type: Thrift.Type.I32, index: 3 },
    5: { alias: 'fullSyncOnly', type: Thrift.Type.BOOL, index: 4 }
  }),
  result: Thrift.Struct.define('getLinkedNotebookSyncChunkResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.SyncChunk },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.listNotebooks = Thrift.Method.define({
  alias: 'listNotebooks',
  args: Thrift.Struct.define('listNotebooksArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('listNotebooksResult', {
    0: { alias: 'returnValue', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Notebook) },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.listAccessibleBusinessNotebooks = Thrift.Method.define({
  alias: 'listAccessibleBusinessNotebooks',
  args: Thrift.Struct.define('listAccessibleBusinessNotebooksArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('listAccessibleBusinessNotebooksResult', {
    0: { alias: 'returnValue', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Notebook) },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.getNotebook = Thrift.Method.define({
  alias: 'getNotebook',
  args: Thrift.Struct.define('getNotebookArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Notebook },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getDefaultNotebook = Thrift.Method.define({
  alias: 'getDefaultNotebook',
  args: Thrift.Struct.define('getDefaultNotebookArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('getDefaultNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Notebook },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.createNotebook = Thrift.Method.define({
  alias: 'createNotebook',
  args: Thrift.Struct.define('createNotebookArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'notebook', type: Thrift.Type.STRUCT, def: Types.Notebook, index: 1 }
  }),
  result: Thrift.Struct.define('createNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Notebook },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.updateNotebook = Thrift.Method.define({
  alias: 'updateNotebook',
  args: Thrift.Struct.define('updateNotebookArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'notebook', type: Thrift.Type.STRUCT, def: Types.Notebook, index: 1 }
  }),
  result: Thrift.Struct.define('updateNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.expungeNotebook = Thrift.Method.define({
  alias: 'expungeNotebook',
  args: Thrift.Struct.define('expungeNotebookArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('expungeNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.listTags = Thrift.Method.define({
  alias: 'listTags',
  args: Thrift.Struct.define('listTagsArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('listTagsResult', {
    0: { alias: 'returnValue', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Tag) },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.listTagsByNotebook = Thrift.Method.define({
  alias: 'listTagsByNotebook',
  args: Thrift.Struct.define('listTagsByNotebookArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('listTagsByNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.Tag) },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getTag = Thrift.Method.define({
  alias: 'getTag',
  args: Thrift.Struct.define('getTagArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getTagResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Tag },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.createTag = Thrift.Method.define({
  alias: 'createTag',
  args: Thrift.Struct.define('createTagArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'tag', type: Thrift.Type.STRUCT, def: Types.Tag, index: 1 }
  }),
  result: Thrift.Struct.define('createTagResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Tag },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.updateTag = Thrift.Method.define({
  alias: 'updateTag',
  args: Thrift.Struct.define('updateTagArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'tag', type: Thrift.Type.STRUCT, def: Types.Tag, index: 1 }
  }),
  result: Thrift.Struct.define('updateTagResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.untagAll = Thrift.Method.define({
  alias: 'untagAll',
  args: Thrift.Struct.define('untagAllArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('untagAllResult', {
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.expungeTag = Thrift.Method.define({
  alias: 'expungeTag',
  args: Thrift.Struct.define('expungeTagArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('expungeTagResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.listSearches = Thrift.Method.define({
  alias: 'listSearches',
  args: Thrift.Struct.define('listSearchesArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('listSearchesResult', {
    0: { alias: 'returnValue', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.SavedSearch) },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.getSearch = Thrift.Method.define({
  alias: 'getSearch',
  args: Thrift.Struct.define('getSearchArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getSearchResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.SavedSearch },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.createSearch = Thrift.Method.define({
  alias: 'createSearch',
  args: Thrift.Struct.define('createSearchArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'search', type: Thrift.Type.STRUCT, def: Types.SavedSearch, index: 1 }
  }),
  result: Thrift.Struct.define('createSearchResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.SavedSearch },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.updateSearch = Thrift.Method.define({
  alias: 'updateSearch',
  args: Thrift.Struct.define('updateSearchArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'search', type: Thrift.Type.STRUCT, def: Types.SavedSearch, index: 1 }
  }),
  result: Thrift.Struct.define('updateSearchResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.expungeSearch = Thrift.Method.define({
  alias: 'expungeSearch',
  args: Thrift.Struct.define('expungeSearchArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('expungeSearchResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.findNoteOffset = Thrift.Method.define({
  alias: 'findNoteOffset',
  args: Thrift.Struct.define('findNoteOffsetArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter, index: 1 },
    3: { alias: 'guid', type: Thrift.Type.STRING, index: 2 }
  }),
  result: Thrift.Struct.define('findNoteOffsetResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.findNotesMetadata = Thrift.Method.define({
  alias: 'findNotesMetadata',
  args: Thrift.Struct.define('findNotesMetadataArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter, index: 1 },
    3: { alias: 'offset', type: Thrift.Type.I32, index: 2 },
    4: { alias: 'maxNotes', type: Thrift.Type.I32, index: 3 },
    5: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: module.exports.NotesMetadataResultSpec, index: 4 }
  }),
  result: Thrift.Struct.define('findNotesMetadataResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.NotesMetadataList },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.findNoteCounts = Thrift.Method.define({
  alias: 'findNoteCounts',
  args: Thrift.Struct.define('findNoteCountsArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'filter', type: Thrift.Type.STRUCT, def: module.exports.NoteFilter, index: 1 },
    3: { alias: 'withTrash', type: Thrift.Type.BOOL, index: 2 }
  }),
  result: Thrift.Struct.define('findNoteCountsResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.NoteCollectionCounts },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getNoteWithResultSpec = Thrift.Method.define({
  alias: 'getNoteWithResultSpec',
  args: Thrift.Struct.define('getNoteWithResultSpecArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: module.exports.NoteResultSpec, index: 2 }
  }),
  result: Thrift.Struct.define('getNoteWithResultSpecResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Note },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getNote = Thrift.Method.define({
  alias: 'getNote',
  args: Thrift.Struct.define('getNoteArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'withContent', type: Thrift.Type.BOOL, index: 2 },
    4: { alias: 'withResourcesData', type: Thrift.Type.BOOL, index: 3 },
    5: { alias: 'withResourcesRecognition', type: Thrift.Type.BOOL, index: 4 },
    6: { alias: 'withResourcesAlternateData', type: Thrift.Type.BOOL, index: 5 }
  }),
  result: Thrift.Struct.define('getNoteResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Note },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getNoteApplicationData = Thrift.Method.define({
  alias: 'getNoteApplicationData',
  args: Thrift.Struct.define('getNoteApplicationDataArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getNoteApplicationDataResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.LazyMap },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getNoteApplicationDataEntry = Thrift.Method.define({
  alias: 'getNoteApplicationDataEntry',
  args: Thrift.Struct.define('getNoteApplicationDataEntryArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'key', type: Thrift.Type.STRING, index: 2 }
  }),
  result: Thrift.Struct.define('getNoteApplicationDataEntryResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRING },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.setNoteApplicationDataEntry = Thrift.Method.define({
  alias: 'setNoteApplicationDataEntry',
  args: Thrift.Struct.define('setNoteApplicationDataEntryArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'key', type: Thrift.Type.STRING, index: 2 },
    4: { alias: 'value', type: Thrift.Type.STRING, index: 3 }
  }),
  result: Thrift.Struct.define('setNoteApplicationDataEntryResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.unsetNoteApplicationDataEntry = Thrift.Method.define({
  alias: 'unsetNoteApplicationDataEntry',
  args: Thrift.Struct.define('unsetNoteApplicationDataEntryArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'key', type: Thrift.Type.STRING, index: 2 }
  }),
  result: Thrift.Struct.define('unsetNoteApplicationDataEntryResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getNoteContent = Thrift.Method.define({
  alias: 'getNoteContent',
  args: Thrift.Struct.define('getNoteContentArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getNoteContentResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRING },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getNoteSearchText = Thrift.Method.define({
  alias: 'getNoteSearchText',
  args: Thrift.Struct.define('getNoteSearchTextArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'noteOnly', type: Thrift.Type.BOOL, index: 2 },
    4: { alias: 'tokenizeForIndexing', type: Thrift.Type.BOOL, index: 3 }
  }),
  result: Thrift.Struct.define('getNoteSearchTextResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRING },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getResourceSearchText = Thrift.Method.define({
  alias: 'getResourceSearchText',
  args: Thrift.Struct.define('getResourceSearchTextArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getResourceSearchTextResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRING },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getNoteTagNames = Thrift.Method.define({
  alias: 'getNoteTagNames',
  args: Thrift.Struct.define('getNoteTagNamesArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getNoteTagNamesResult', {
    0: { alias: 'returnValue', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.createNote = Thrift.Method.define({
  alias: 'createNote',
  args: Thrift.Struct.define('createNoteArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note, index: 1 }
  }),
  result: Thrift.Struct.define('createNoteResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Note },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.updateNote = Thrift.Method.define({
  alias: 'updateNote',
  args: Thrift.Struct.define('updateNoteArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note, index: 1 }
  }),
  result: Thrift.Struct.define('updateNoteResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Note },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.deleteNote = Thrift.Method.define({
  alias: 'deleteNote',
  args: Thrift.Struct.define('deleteNoteArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('deleteNoteResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.expungeNote = Thrift.Method.define({
  alias: 'expungeNote',
  args: Thrift.Struct.define('expungeNoteArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('expungeNoteResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.copyNote = Thrift.Method.define({
  alias: 'copyNote',
  args: Thrift.Struct.define('copyNoteArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'toNotebookGuid', type: Thrift.Type.STRING, index: 2 }
  }),
  result: Thrift.Struct.define('copyNoteResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Note },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.listNoteVersions = Thrift.Method.define({
  alias: 'listNoteVersions',
  args: Thrift.Struct.define('listNoteVersionsArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('listNoteVersionsResult', {
    0: { alias: 'returnValue', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.NoteVersionId) },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getNoteVersion = Thrift.Method.define({
  alias: 'getNoteVersion',
  args: Thrift.Struct.define('getNoteVersionArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'updateSequenceNum', type: Thrift.Type.I32, index: 2 },
    4: { alias: 'withResourcesData', type: Thrift.Type.BOOL, index: 3 },
    5: { alias: 'withResourcesRecognition', type: Thrift.Type.BOOL, index: 4 },
    6: { alias: 'withResourcesAlternateData', type: Thrift.Type.BOOL, index: 5 }
  }),
  result: Thrift.Struct.define('getNoteVersionResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Note },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getResource = Thrift.Method.define({
  alias: 'getResource',
  args: Thrift.Struct.define('getResourceArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'withData', type: Thrift.Type.BOOL, index: 2 },
    4: { alias: 'withRecognition', type: Thrift.Type.BOOL, index: 3 },
    5: { alias: 'withAttributes', type: Thrift.Type.BOOL, index: 4 },
    6: { alias: 'withAlternateData', type: Thrift.Type.BOOL, index: 5 }
  }),
  result: Thrift.Struct.define('getResourceResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Resource },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getResourceApplicationData = Thrift.Method.define({
  alias: 'getResourceApplicationData',
  args: Thrift.Struct.define('getResourceApplicationDataArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getResourceApplicationDataResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.LazyMap },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getResourceApplicationDataEntry = Thrift.Method.define({
  alias: 'getResourceApplicationDataEntry',
  args: Thrift.Struct.define('getResourceApplicationDataEntryArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'key', type: Thrift.Type.STRING, index: 2 }
  }),
  result: Thrift.Struct.define('getResourceApplicationDataEntryResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRING },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.setResourceApplicationDataEntry = Thrift.Method.define({
  alias: 'setResourceApplicationDataEntry',
  args: Thrift.Struct.define('setResourceApplicationDataEntryArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'key', type: Thrift.Type.STRING, index: 2 },
    4: { alias: 'value', type: Thrift.Type.STRING, index: 3 }
  }),
  result: Thrift.Struct.define('setResourceApplicationDataEntryResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.unsetResourceApplicationDataEntry = Thrift.Method.define({
  alias: 'unsetResourceApplicationDataEntry',
  args: Thrift.Struct.define('unsetResourceApplicationDataEntryArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'key', type: Thrift.Type.STRING, index: 2 }
  }),
  result: Thrift.Struct.define('unsetResourceApplicationDataEntryResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.updateResource = Thrift.Method.define({
  alias: 'updateResource',
  args: Thrift.Struct.define('updateResourceArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'resource', type: Thrift.Type.STRUCT, def: Types.Resource, index: 1 }
  }),
  result: Thrift.Struct.define('updateResourceResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getResourceData = Thrift.Method.define({
  alias: 'getResourceData',
  args: Thrift.Struct.define('getResourceDataArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getResourceDataResult', {
    0: { alias: 'returnValue', type: Thrift.Type.BINARY },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getResourceByHash = Thrift.Method.define({
  alias: 'getResourceByHash',
  args: Thrift.Struct.define('getResourceByHashArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'noteGuid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'contentHash', type: Thrift.Type.BINARY, index: 2 },
    4: { alias: 'withData', type: Thrift.Type.BOOL, index: 3 },
    5: { alias: 'withRecognition', type: Thrift.Type.BOOL, index: 4 },
    6: { alias: 'withAlternateData', type: Thrift.Type.BOOL, index: 5 }
  }),
  result: Thrift.Struct.define('getResourceByHashResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Resource },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getResourceRecognition = Thrift.Method.define({
  alias: 'getResourceRecognition',
  args: Thrift.Struct.define('getResourceRecognitionArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getResourceRecognitionResult', {
    0: { alias: 'returnValue', type: Thrift.Type.BINARY },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getResourceAlternateData = Thrift.Method.define({
  alias: 'getResourceAlternateData',
  args: Thrift.Struct.define('getResourceAlternateDataArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getResourceAlternateDataResult', {
    0: { alias: 'returnValue', type: Thrift.Type.BINARY },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getResourceAttributes = Thrift.Method.define({
  alias: 'getResourceAttributes',
  args: Thrift.Struct.define('getResourceAttributesArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getResourceAttributesResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.ResourceAttributes },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.getPublicNotebook = Thrift.Method.define({
  alias: 'getPublicNotebook',
  args: Thrift.Struct.define('getPublicNotebookArgs', {
    1: { alias: 'userId', type: Thrift.Type.I32, index: 0 },
    2: { alias: 'publicUri', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getPublicNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Notebook },
    1: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.shareNotebook = Thrift.Method.define({
  alias: 'shareNotebook',
  args: Thrift.Struct.define('shareNotebookArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'sharedNotebook', type: Thrift.Type.STRUCT, def: Types.SharedNotebook, index: 1 },
    3: { alias: 'message', type: Thrift.Type.STRING, index: 2 }
  }),
  result: Thrift.Struct.define('shareNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.SharedNotebook },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.createOrUpdateNotebookShares = Thrift.Method.define({
  alias: 'createOrUpdateNotebookShares',
  args: Thrift.Struct.define('createOrUpdateNotebookSharesArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'shareTemplate', type: Thrift.Type.STRUCT, def: module.exports.NotebookShareTemplate, index: 1 }
  }),
  result: Thrift.Struct.define('createOrUpdateNotebookSharesResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.CreateOrUpdateNotebookSharesResult },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    4: { alias: 'invalidContactsException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMInvalidContactsException }
  })
});

NoteStore.updateSharedNotebook = Thrift.Method.define({
  alias: 'updateSharedNotebook',
  args: Thrift.Struct.define('updateSharedNotebookArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'sharedNotebook', type: Thrift.Type.STRUCT, def: Types.SharedNotebook, index: 1 }
  }),
  result: Thrift.Struct.define('updateSharedNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.setNotebookRecipientSettings = Thrift.Method.define({
  alias: 'setNotebookRecipientSettings',
  args: Thrift.Struct.define('setNotebookRecipientSettingsArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'recipientSettings', type: Thrift.Type.STRUCT, def: Types.NotebookRecipientSettings, index: 2 }
  }),
  result: Thrift.Struct.define('setNotebookRecipientSettingsResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.Notebook },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.listSharedNotebooks = Thrift.Method.define({
  alias: 'listSharedNotebooks',
  args: Thrift.Struct.define('listSharedNotebooksArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('listSharedNotebooksResult', {
    0: { alias: 'returnValue', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.SharedNotebook) },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.createLinkedNotebook = Thrift.Method.define({
  alias: 'createLinkedNotebook',
  args: Thrift.Struct.define('createLinkedNotebookArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'linkedNotebook', type: Thrift.Type.STRUCT, def: Types.LinkedNotebook, index: 1 }
  }),
  result: Thrift.Struct.define('createLinkedNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.LinkedNotebook },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.updateLinkedNotebook = Thrift.Method.define({
  alias: 'updateLinkedNotebook',
  args: Thrift.Struct.define('updateLinkedNotebookArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'linkedNotebook', type: Thrift.Type.STRUCT, def: Types.LinkedNotebook, index: 1 }
  }),
  result: Thrift.Struct.define('updateLinkedNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.listLinkedNotebooks = Thrift.Method.define({
  alias: 'listLinkedNotebooks',
  args: Thrift.Struct.define('listLinkedNotebooksArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('listLinkedNotebooksResult', {
    0: { alias: 'returnValue', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.LinkedNotebook) },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.expungeLinkedNotebook = Thrift.Method.define({
  alias: 'expungeLinkedNotebook',
  args: Thrift.Struct.define('expungeLinkedNotebookArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('expungeLinkedNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.I32 },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.authenticateToSharedNotebook = Thrift.Method.define({
  alias: 'authenticateToSharedNotebook',
  args: Thrift.Struct.define('authenticateToSharedNotebookArgs', {
    1: { alias: 'shareKeyOrGlobalId', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('authenticateToSharedNotebookResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: UserStore.AuthenticationResult },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.getSharedNotebookByAuth = Thrift.Method.define({
  alias: 'getSharedNotebookByAuth',
  args: Thrift.Struct.define('getSharedNotebookByAuthArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('getSharedNotebookByAuthResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.SharedNotebook },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.emailNote = Thrift.Method.define({
  alias: 'emailNote',
  args: Thrift.Struct.define('emailNoteArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'parameters', type: Thrift.Type.STRUCT, def: module.exports.NoteEmailParameters, index: 1 }
  }),
  result: Thrift.Struct.define('emailNoteResult', {
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.shareNote = Thrift.Method.define({
  alias: 'shareNote',
  args: Thrift.Struct.define('shareNoteArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('shareNoteResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRING },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.stopSharingNote = Thrift.Method.define({
  alias: 'stopSharingNote',
  args: Thrift.Struct.define('stopSharingNoteArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'guid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('stopSharingNoteResult', {
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.authenticateToSharedNote = Thrift.Method.define({
  alias: 'authenticateToSharedNote',
  args: Thrift.Struct.define('authenticateToSharedNoteArgs', {
    1: { alias: 'guid', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'noteKey', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 2 }
  }),
  result: Thrift.Struct.define('authenticateToSharedNoteResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: UserStore.AuthenticationResult },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.findRelated = Thrift.Method.define({
  alias: 'findRelated',
  args: Thrift.Struct.define('findRelatedArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'query', type: Thrift.Type.STRUCT, def: module.exports.RelatedQuery, index: 1 },
    3: { alias: 'resultSpec', type: Thrift.Type.STRUCT, def: module.exports.RelatedResultSpec, index: 2 }
  }),
  result: Thrift.Struct.define('findRelatedResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.RelatedResult },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

NoteStore.updateNoteIfUsnMatches = Thrift.Method.define({
  alias: 'updateNoteIfUsnMatches',
  args: Thrift.Struct.define('updateNoteIfUsnMatchesArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'note', type: Thrift.Type.STRUCT, def: Types.Note, index: 1 }
  }),
  result: Thrift.Struct.define('updateNoteIfUsnMatchesResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.UpdateNoteIfUsnMatchesResult },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.manageNotebookShares = Thrift.Method.define({
  alias: 'manageNotebookShares',
  args: Thrift.Struct.define('manageNotebookSharesArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'parameters', type: Thrift.Type.STRUCT, def: module.exports.ManageNotebookSharesParameters, index: 1 }
  }),
  result: Thrift.Struct.define('manageNotebookSharesResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.ManageNotebookSharesResult },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

NoteStore.getNotebookShares = Thrift.Method.define({
  alias: 'getNotebookShares',
  args: Thrift.Struct.define('getNotebookSharesArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'notebookGuid', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('getNotebookSharesResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.ShareRelationships },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    3: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

// Define NoteStore Client

function NoteStoreClient(output) {
  this.output = output;
  this.seqid = 0;
}

NoteStoreClient.prototype.getSyncState = function (authenticationToken, callback) {
  var mdef = NoteStore.getSyncState;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getFilteredSyncChunk = function (authenticationToken, afterUSN, maxEntries, filter, callback) {
  var mdef = NoteStore.getFilteredSyncChunk;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.afterUSN = afterUSN;
  args.maxEntries = maxEntries;
  args.filter = filter;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getLinkedNotebookSyncState = function (authenticationToken, linkedNotebook, callback) {
  var mdef = NoteStore.getLinkedNotebookSyncState;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.linkedNotebook = linkedNotebook;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getLinkedNotebookSyncChunk = function (authenticationToken, linkedNotebook, afterUSN, maxEntries, fullSyncOnly, callback) {
  var mdef = NoteStore.getLinkedNotebookSyncChunk;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.linkedNotebook = linkedNotebook;
  args.afterUSN = afterUSN;
  args.maxEntries = maxEntries;
  args.fullSyncOnly = fullSyncOnly;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.listNotebooks = function (authenticationToken, callback) {
  var mdef = NoteStore.listNotebooks;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.listAccessibleBusinessNotebooks = function (authenticationToken, callback) {
  var mdef = NoteStore.listAccessibleBusinessNotebooks;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getNotebook = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.getNotebook;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getDefaultNotebook = function (authenticationToken, callback) {
  var mdef = NoteStore.getDefaultNotebook;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.createNotebook = function (authenticationToken, notebook, callback) {
  var mdef = NoteStore.createNotebook;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.notebook = notebook;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.updateNotebook = function (authenticationToken, notebook, callback) {
  var mdef = NoteStore.updateNotebook;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.notebook = notebook;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.expungeNotebook = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.expungeNotebook;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.listTags = function (authenticationToken, callback) {
  var mdef = NoteStore.listTags;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.listTagsByNotebook = function (authenticationToken, notebookGuid, callback) {
  var mdef = NoteStore.listTagsByNotebook;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.notebookGuid = notebookGuid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getTag = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.getTag;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.createTag = function (authenticationToken, tag, callback) {
  var mdef = NoteStore.createTag;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.tag = tag;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.updateTag = function (authenticationToken, tag, callback) {
  var mdef = NoteStore.updateTag;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.tag = tag;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.untagAll = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.untagAll;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.expungeTag = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.expungeTag;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.listSearches = function (authenticationToken, callback) {
  var mdef = NoteStore.listSearches;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getSearch = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.getSearch;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.createSearch = function (authenticationToken, search, callback) {
  var mdef = NoteStore.createSearch;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.search = search;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.updateSearch = function (authenticationToken, search, callback) {
  var mdef = NoteStore.updateSearch;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.search = search;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.expungeSearch = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.expungeSearch;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.findNoteOffset = function (authenticationToken, filter, guid, callback) {
  var mdef = NoteStore.findNoteOffset;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.filter = filter;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.findNotesMetadata = function (authenticationToken, filter, offset, maxNotes, resultSpec, callback) {
  var mdef = NoteStore.findNotesMetadata;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.filter = filter;
  args.offset = offset;
  args.maxNotes = maxNotes;
  args.resultSpec = resultSpec;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.findNoteCounts = function (authenticationToken, filter, withTrash, callback) {
  var mdef = NoteStore.findNoteCounts;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.filter = filter;
  args.withTrash = withTrash;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getNoteWithResultSpec = function (authenticationToken, guid, resultSpec, callback) {
  var mdef = NoteStore.getNoteWithResultSpec;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  args.resultSpec = resultSpec;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getNote = function (authenticationToken, guid, withContent, withResourcesData, withResourcesRecognition, withResourcesAlternateData, callback) {
  var mdef = NoteStore.getNote;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  args.withContent = withContent;
  args.withResourcesData = withResourcesData;
  args.withResourcesRecognition = withResourcesRecognition;
  args.withResourcesAlternateData = withResourcesAlternateData;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getNoteApplicationData = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.getNoteApplicationData;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getNoteApplicationDataEntry = function (authenticationToken, guid, key, callback) {
  var mdef = NoteStore.getNoteApplicationDataEntry;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  args.key = key;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.setNoteApplicationDataEntry = function (authenticationToken, guid, key, value, callback) {
  var mdef = NoteStore.setNoteApplicationDataEntry;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  args.key = key;
  args.value = value;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.unsetNoteApplicationDataEntry = function (authenticationToken, guid, key, callback) {
  var mdef = NoteStore.unsetNoteApplicationDataEntry;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  args.key = key;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getNoteContent = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.getNoteContent;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getNoteSearchText = function (authenticationToken, guid, noteOnly, tokenizeForIndexing, callback) {
  var mdef = NoteStore.getNoteSearchText;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  args.noteOnly = noteOnly;
  args.tokenizeForIndexing = tokenizeForIndexing;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getResourceSearchText = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.getResourceSearchText;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getNoteTagNames = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.getNoteTagNames;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.createNote = function (authenticationToken, note, callback) {
  var mdef = NoteStore.createNote;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.note = note;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.updateNote = function (authenticationToken, note, callback) {
  var mdef = NoteStore.updateNote;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.note = note;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.deleteNote = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.deleteNote;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.expungeNote = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.expungeNote;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.copyNote = function (authenticationToken, noteGuid, toNotebookGuid, callback) {
  var mdef = NoteStore.copyNote;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.noteGuid = noteGuid;
  args.toNotebookGuid = toNotebookGuid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.listNoteVersions = function (authenticationToken, noteGuid, callback) {
  var mdef = NoteStore.listNoteVersions;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.noteGuid = noteGuid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getNoteVersion = function (authenticationToken, noteGuid, updateSequenceNum, withResourcesData, withResourcesRecognition, withResourcesAlternateData, callback) {
  var mdef = NoteStore.getNoteVersion;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.noteGuid = noteGuid;
  args.updateSequenceNum = updateSequenceNum;
  args.withResourcesData = withResourcesData;
  args.withResourcesRecognition = withResourcesRecognition;
  args.withResourcesAlternateData = withResourcesAlternateData;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getResource = function (authenticationToken, guid, withData, withRecognition, withAttributes, withAlternateData, callback) {
  var mdef = NoteStore.getResource;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  args.withData = withData;
  args.withRecognition = withRecognition;
  args.withAttributes = withAttributes;
  args.withAlternateData = withAlternateData;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getResourceApplicationData = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.getResourceApplicationData;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getResourceApplicationDataEntry = function (authenticationToken, guid, key, callback) {
  var mdef = NoteStore.getResourceApplicationDataEntry;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  args.key = key;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.setResourceApplicationDataEntry = function (authenticationToken, guid, key, value, callback) {
  var mdef = NoteStore.setResourceApplicationDataEntry;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  args.key = key;
  args.value = value;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.unsetResourceApplicationDataEntry = function (authenticationToken, guid, key, callback) {
  var mdef = NoteStore.unsetResourceApplicationDataEntry;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  args.key = key;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.updateResource = function (authenticationToken, resource, callback) {
  var mdef = NoteStore.updateResource;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.resource = resource;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getResourceData = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.getResourceData;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getResourceByHash = function (authenticationToken, noteGuid, contentHash, withData, withRecognition, withAlternateData, callback) {
  var mdef = NoteStore.getResourceByHash;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.noteGuid = noteGuid;
  args.contentHash = contentHash;
  args.withData = withData;
  args.withRecognition = withRecognition;
  args.withAlternateData = withAlternateData;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getResourceRecognition = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.getResourceRecognition;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getResourceAlternateData = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.getResourceAlternateData;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getResourceAttributes = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.getResourceAttributes;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getPublicNotebook = function (userId, publicUri, callback) {
  var mdef = NoteStore.getPublicNotebook;
  var args = new mdef.args();
  args.userId = userId;
  args.publicUri = publicUri;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.shareNotebook = function (authenticationToken, sharedNotebook, message, callback) {
  var mdef = NoteStore.shareNotebook;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.sharedNotebook = sharedNotebook;
  args.message = message;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.createOrUpdateNotebookShares = function (authenticationToken, shareTemplate, callback) {
  var mdef = NoteStore.createOrUpdateNotebookShares;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.shareTemplate = shareTemplate;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.updateSharedNotebook = function (authenticationToken, sharedNotebook, callback) {
  var mdef = NoteStore.updateSharedNotebook;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.sharedNotebook = sharedNotebook;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.setNotebookRecipientSettings = function (authenticationToken, notebookGuid, recipientSettings, callback) {
  var mdef = NoteStore.setNotebookRecipientSettings;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.notebookGuid = notebookGuid;
  args.recipientSettings = recipientSettings;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.listSharedNotebooks = function (authenticationToken, callback) {
  var mdef = NoteStore.listSharedNotebooks;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.createLinkedNotebook = function (authenticationToken, linkedNotebook, callback) {
  var mdef = NoteStore.createLinkedNotebook;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.linkedNotebook = linkedNotebook;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.updateLinkedNotebook = function (authenticationToken, linkedNotebook, callback) {
  var mdef = NoteStore.updateLinkedNotebook;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.linkedNotebook = linkedNotebook;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.listLinkedNotebooks = function (authenticationToken, callback) {
  var mdef = NoteStore.listLinkedNotebooks;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.expungeLinkedNotebook = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.expungeLinkedNotebook;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.authenticateToSharedNotebook = function (shareKeyOrGlobalId, authenticationToken, callback) {
  var mdef = NoteStore.authenticateToSharedNotebook;
  var args = new mdef.args();
  args.shareKeyOrGlobalId = shareKeyOrGlobalId;
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getSharedNotebookByAuth = function (authenticationToken, callback) {
  var mdef = NoteStore.getSharedNotebookByAuth;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.emailNote = function (authenticationToken, parameters, callback) {
  var mdef = NoteStore.emailNote;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.parameters = parameters;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.shareNote = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.shareNote;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.stopSharingNote = function (authenticationToken, guid, callback) {
  var mdef = NoteStore.stopSharingNote;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.guid = guid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.authenticateToSharedNote = function (guid, noteKey, authenticationToken, callback) {
  var mdef = NoteStore.authenticateToSharedNote;
  var args = new mdef.args();
  args.guid = guid;
  args.noteKey = noteKey;
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.findRelated = function (authenticationToken, query, resultSpec, callback) {
  var mdef = NoteStore.findRelated;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.query = query;
  args.resultSpec = resultSpec;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.updateNoteIfUsnMatches = function (authenticationToken, note, callback) {
  var mdef = NoteStore.updateNoteIfUsnMatches;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.note = note;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.manageNotebookShares = function (authenticationToken, parameters, callback) {
  var mdef = NoteStore.manageNotebookShares;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.parameters = parameters;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

NoteStoreClient.prototype.getNotebookShares = function (authenticationToken, notebookGuid, callback) {
  var mdef = NoteStore.getNotebookShares;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.notebookGuid = notebookGuid;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

module.exports.NoteStore.Client = NoteStoreClient;

// Define NoteStore Server

function NoteStoreServer(service, stransport, Protocol) {
  var methodName;
  this.service = service;
  this.stransport = stransport;
  this.processor = new Thrift.Processor();
  for (methodName in NoteStore) {
    if (service[methodName]) {
      this.processor.addMethod(NoteStore[methodName], service[methodName].bind(service));
    }
  }
  this.stransport.process = function (input, output, noop) {
    var inprot = new Protocol(input);
    var outprot = new Protocol(output);
    this.processor.process(inprot, outprot, noop);
  }.bind(this);
}

NoteStoreServer.prototype.start = function () {
  this.stransport.listen();
};
NoteStoreServer.prototype.stop = function () {
  this.stransport.close();
};

module.exports.NoteStore.Server = NoteStoreServer;
},{"../thrift":13,"./Errors":7,"./Limits":8,"./Types":10,"./UserStore":11}],10:[function(require,module,exports){
'use strict';

//
// Autogenerated by Thrift Compiler (0.6.0-en-exported)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


// Define types and services

var Thrift = require('../thrift');
var Limits = require('./Limits');

module.exports.PrivilegeLevel = {
  'NORMAL': 1,
  'PREMIUM': 3,
  'VIP': 5,
  'MANAGER': 7,
  'SUPPORT': 8,
  'ADMIN': 9
};

module.exports.ServiceLevel = {
  'BASIC': 1,
  'PLUS': 2,
  'PREMIUM': 3
};

module.exports.QueryFormat = {
  'USER': 1,
  'SEXP': 2
};

module.exports.NoteSortOrder = {
  'CREATED': 1,
  'UPDATED': 2,
  'RELEVANCE': 3,
  'UPDATE_SEQUENCE_NUMBER': 4,
  'TITLE': 5
};

module.exports.PremiumOrderStatus = {
  'NONE': 0,
  'PENDING': 1,
  'ACTIVE': 2,
  'FAILED': 3,
  'CANCELLATION_PENDING': 4,
  'CANCELED': 5
};

module.exports.SharedNotebookPrivilegeLevel = {
  'READ_NOTEBOOK': 0,
  'MODIFY_NOTEBOOK_PLUS_ACTIVITY': 1,
  'READ_NOTEBOOK_PLUS_ACTIVITY': 2,
  'GROUP': 3,
  'FULL_ACCESS': 4,
  'BUSINESS_FULL_ACCESS': 5
};

module.exports.SharedNotePrivilegeLevel = {
  'READ_NOTE': 0,
  'MODIFY_NOTE': 1,
  'FULL_ACCESS': 2
};

module.exports.SponsoredGroupRole = {
  'GROUP_MEMBER': 1,
  'GROUP_ADMIN': 2,
  'GROUP_OWNER': 3
};

module.exports.BusinessUserRole = {
  'ADMIN': 1,
  'NORMAL': 2
};

module.exports.SharedNotebookInstanceRestrictions = {
  'ASSIGNED': 1,
  'NO_SHARED_NOTEBOOKS': 2
};

module.exports.ReminderEmailConfig = {
  'DO_NOT_SEND': 1,
  'SEND_DAILY_EMAIL': 2
};

module.exports.BusinessInvitationStatus = {
  'APPROVED': 0,
  'REQUESTED': 1,
  'REDEEMED': 2
};

module.exports.ContactType = {
  'EVERNOTE': 1,
  'SMS': 2,
  'FACEBOOK': 3,
  'EMAIL': 4,
  'TWITTER': 5,
  'LINKEDIN': 6
};

module.exports.RelatedContentType = {
  'NEWS_ARTICLE': 1,
  'PROFILE_PERSON': 2,
  'PROFILE_ORGANIZATION': 3,
  'REFERENCE_MATERIAL': 4
};

module.exports.RelatedContentAccess = {
  'NOT_ACCESSIBLE': 0,
  'DIRECT_LINK_ACCESS_OK': 1,
  'DIRECT_LINK_LOGIN_REQUIRED': 2,
  'DIRECT_LINK_EMBEDDED_VIEW': 3
};

module.exports.UserIdentityType = {
  'EVERNOTE_USERID': 1,
  'EMAIL': 2,
  'IDENTITYID': 3
};

module.exports.CLASSIFICATION_RECIPE_USER_NON_RECIPE = '000';

module.exports.CLASSIFICATION_RECIPE_USER_RECIPE = '001';

module.exports.CLASSIFICATION_RECIPE_SERVICE_RECIPE = '002';

module.exports.EDAM_NOTE_SOURCE_WEB_CLIP = 'web.clip';

module.exports.EDAM_NOTE_SOURCE_WEB_CLIP_SIMPLIFIED = 'Clearly';

module.exports.EDAM_NOTE_SOURCE_MAIL_CLIP = 'mail.clip';

module.exports.EDAM_NOTE_SOURCE_MAIL_SMTP_GATEWAY = 'mail.smtp';

module.exports.Data = Thrift.Struct.define('Data', {
  1: { alias: 'bodyHash', type: Thrift.Type.BINARY },
  2: { alias: 'size', type: Thrift.Type.I32 },
  3: { alias: 'body', type: Thrift.Type.BINARY }
});

module.exports.UserAttributes = Thrift.Struct.define('UserAttributes', {
  1: { alias: 'defaultLocationName', type: Thrift.Type.STRING },
  2: { alias: 'defaultLatitude', type: Thrift.Type.DOUBLE },
  3: { alias: 'defaultLongitude', type: Thrift.Type.DOUBLE },
  4: { alias: 'preactivation', type: Thrift.Type.BOOL },
  5: { alias: 'viewedPromotions', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  6: { alias: 'incomingEmailAddress', type: Thrift.Type.STRING },
  7: { alias: 'recentMailedAddresses', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  9: { alias: 'comments', type: Thrift.Type.STRING },
  11: { alias: 'dateAgreedToTermsOfService', type: Thrift.Type.I64 },
  12: { alias: 'maxReferrals', type: Thrift.Type.I32 },
  13: { alias: 'referralCount', type: Thrift.Type.I32 },
  14: { alias: 'refererCode', type: Thrift.Type.STRING },
  15: { alias: 'sentEmailDate', type: Thrift.Type.I64 },
  16: { alias: 'sentEmailCount', type: Thrift.Type.I32 },
  17: { alias: 'dailyEmailLimit', type: Thrift.Type.I32 },
  18: { alias: 'emailOptOutDate', type: Thrift.Type.I64 },
  19: { alias: 'partnerEmailOptInDate', type: Thrift.Type.I64 },
  20: { alias: 'preferredLanguage', type: Thrift.Type.STRING },
  21: { alias: 'preferredCountry', type: Thrift.Type.STRING },
  22: { alias: 'clipFullPage', type: Thrift.Type.BOOL },
  23: { alias: 'twitterUserName', type: Thrift.Type.STRING },
  24: { alias: 'twitterId', type: Thrift.Type.STRING },
  25: { alias: 'groupName', type: Thrift.Type.STRING },
  26: { alias: 'recognitionLanguage', type: Thrift.Type.STRING },
  28: { alias: 'referralProof', type: Thrift.Type.STRING },
  29: { alias: 'educationalDiscount', type: Thrift.Type.BOOL },
  30: { alias: 'businessAddress', type: Thrift.Type.STRING },
  31: { alias: 'hideSponsorBilling', type: Thrift.Type.BOOL },
  32: { alias: 'taxExempt', type: Thrift.Type.BOOL },
  33: { alias: 'useEmailAutoFiling', type: Thrift.Type.BOOL },
  34: { alias: 'reminderEmailConfig', type: Thrift.Type.I32 },
  35: { alias: 'emailAddressLastConfirmed', type: Thrift.Type.I64 },
  36: { alias: 'passwordUpdated', type: Thrift.Type.I64 },
  37: { alias: 'salesforcePushEnabled', type: Thrift.Type.BOOL },
  38: { alias: 'shouldLogClientEvent', type: Thrift.Type.BOOL }
});

module.exports.BusinessUserAttributes = Thrift.Struct.define('BusinessUserAttributes', {
  1: { alias: 'title', type: Thrift.Type.STRING },
  2: { alias: 'location', type: Thrift.Type.STRING },
  3: { alias: 'department', type: Thrift.Type.STRING },
  4: { alias: 'mobilePhone', type: Thrift.Type.STRING },
  5: { alias: 'linkedInProfileUrl', type: Thrift.Type.STRING },
  6: { alias: 'workPhone', type: Thrift.Type.STRING },
  7: { alias: 'companyStartDate', type: Thrift.Type.I64 }
});

module.exports.Accounting = Thrift.Struct.define('Accounting', {
  2: { alias: 'uploadLimitEnd', type: Thrift.Type.I64 },
  3: { alias: 'uploadLimitNextMonth', type: Thrift.Type.I64 },
  4: { alias: 'premiumServiceStatus', type: Thrift.Type.I32 },
  5: { alias: 'premiumOrderNumber', type: Thrift.Type.STRING },
  6: { alias: 'premiumCommerceService', type: Thrift.Type.STRING },
  7: { alias: 'premiumServiceStart', type: Thrift.Type.I64 },
  8: { alias: 'premiumServiceSKU', type: Thrift.Type.STRING },
  9: { alias: 'lastSuccessfulCharge', type: Thrift.Type.I64 },
  10: { alias: 'lastFailedCharge', type: Thrift.Type.I64 },
  11: { alias: 'lastFailedChargeReason', type: Thrift.Type.STRING },
  12: { alias: 'nextPaymentDue', type: Thrift.Type.I64 },
  13: { alias: 'premiumLockUntil', type: Thrift.Type.I64 },
  14: { alias: 'updated', type: Thrift.Type.I64 },
  16: { alias: 'premiumSubscriptionNumber', type: Thrift.Type.STRING },
  17: { alias: 'lastRequestedCharge', type: Thrift.Type.I64 },
  18: { alias: 'currency', type: Thrift.Type.STRING },
  19: { alias: 'unitPrice', type: Thrift.Type.I32 },
  20: { alias: 'businessId', type: Thrift.Type.I32 },
  21: { alias: 'businessName', type: Thrift.Type.STRING },
  22: { alias: 'businessRole', type: Thrift.Type.I32 },
  23: { alias: 'unitDiscount', type: Thrift.Type.I32 },
  24: { alias: 'nextChargeDate', type: Thrift.Type.I64 },
  25: { alias: 'availablePoints', type: Thrift.Type.I32 }
});

module.exports.BusinessUserInfo = Thrift.Struct.define('BusinessUserInfo', {
  1: { alias: 'businessId', type: Thrift.Type.I32 },
  2: { alias: 'businessName', type: Thrift.Type.STRING },
  3: { alias: 'role', type: Thrift.Type.I32 },
  4: { alias: 'email', type: Thrift.Type.STRING },
  5: { alias: 'updated', type: Thrift.Type.I64 }
});

module.exports.AccountLimits = Thrift.Struct.define('AccountLimits', {
  1: { alias: 'userMailLimitDaily', type: Thrift.Type.I32 },
  2: { alias: 'noteSizeMax', type: Thrift.Type.I64 },
  3: { alias: 'resourceSizeMax', type: Thrift.Type.I64 },
  4: { alias: 'userLinkedNotebookMax', type: Thrift.Type.I32 },
  5: { alias: 'uploadLimit', type: Thrift.Type.I64 },
  6: { alias: 'userNoteCountMax', type: Thrift.Type.I32 },
  7: { alias: 'userNotebookCountMax', type: Thrift.Type.I32 },
  8: { alias: 'userTagCountMax', type: Thrift.Type.I32 },
  9: { alias: 'noteTagCountMax', type: Thrift.Type.I32 },
  10: { alias: 'userSavedSearchesMax', type: Thrift.Type.I32 },
  11: { alias: 'noteResourceCountMax', type: Thrift.Type.I32 }
});

module.exports.PremiumInfo = Thrift.Struct.define('PremiumInfo', {
  1: { alias: 'currentTime', type: Thrift.Type.I64 },
  2: { alias: 'premium', type: Thrift.Type.BOOL },
  3: { alias: 'premiumRecurring', type: Thrift.Type.BOOL },
  4: { alias: 'premiumExpirationDate', type: Thrift.Type.I64 },
  5: { alias: 'premiumExtendable', type: Thrift.Type.BOOL },
  6: { alias: 'premiumPending', type: Thrift.Type.BOOL },
  7: { alias: 'premiumCancellationPending', type: Thrift.Type.BOOL },
  8: { alias: 'canPurchaseUploadAllowance', type: Thrift.Type.BOOL },
  11: { alias: 'premiumUpgradable', type: Thrift.Type.BOOL }
});

module.exports.User = Thrift.Struct.define('User', {
  1: { alias: 'id', type: Thrift.Type.I32 },
  2: { alias: 'username', type: Thrift.Type.STRING },
  3: { alias: 'email', type: Thrift.Type.STRING },
  4: { alias: 'name', type: Thrift.Type.STRING },
  6: { alias: 'timezone', type: Thrift.Type.STRING },
  7: { alias: 'privilege', type: Thrift.Type.I32 },
  21: { alias: 'serviceLevel', type: Thrift.Type.I32 },
  9: { alias: 'created', type: Thrift.Type.I64 },
  10: { alias: 'updated', type: Thrift.Type.I64 },
  11: { alias: 'deleted', type: Thrift.Type.I64 },
  13: { alias: 'active', type: Thrift.Type.BOOL },
  14: { alias: 'shardId', type: Thrift.Type.STRING },
  15: { alias: 'attributes', type: Thrift.Type.STRUCT, def: module.exports.UserAttributes },
  16: { alias: 'accounting', type: Thrift.Type.STRUCT, def: module.exports.Accounting },
  18: { alias: 'businessUserInfo', type: Thrift.Type.STRUCT, def: module.exports.BusinessUserInfo },
  19: { alias: 'photoUrl', type: Thrift.Type.STRING },
  20: { alias: 'photoLastUpdated', type: Thrift.Type.I64 },
  22: { alias: 'accountLimits', type: Thrift.Type.STRUCT, def: module.exports.AccountLimits }
});

module.exports.Contact = Thrift.Struct.define('Contact', {
  1: { alias: 'name', type: Thrift.Type.STRING },
  2: { alias: 'id', type: Thrift.Type.STRING },
  3: { alias: 'type', type: Thrift.Type.I32 },
  4: { alias: 'photoUrl', type: Thrift.Type.STRING },
  5: { alias: 'photoLastUpdated', type: Thrift.Type.I64 },
  6: { alias: 'messagingPermit', type: Thrift.Type.BINARY },
  7: { alias: 'messagingPermitExpires', type: Thrift.Type.I64 }
});

module.exports.Identity = Thrift.Struct.define('Identity', {
  1: { alias: 'id', type: Thrift.Type.I64 },
  2: { alias: 'contact', type: Thrift.Type.STRUCT, def: module.exports.Contact },
  3: { alias: 'userId', type: Thrift.Type.I32 },
  4: { alias: 'deactivated', type: Thrift.Type.BOOL },
  5: { alias: 'sameBusiness', type: Thrift.Type.BOOL },
  6: { alias: 'blocked', type: Thrift.Type.BOOL },
  7: { alias: 'userConnected', type: Thrift.Type.BOOL },
  8: { alias: 'eventId', type: Thrift.Type.I64 }
});

module.exports.Tag = Thrift.Struct.define('Tag', {
  1: { alias: 'guid', type: Thrift.Type.STRING },
  2: { alias: 'name', type: Thrift.Type.STRING },
  3: { alias: 'parentGuid', type: Thrift.Type.STRING },
  4: { alias: 'updateSequenceNum', type: Thrift.Type.I32 }
});

module.exports.LazyMap = Thrift.Struct.define('LazyMap', {
  1: { alias: 'keysOnly', type: Thrift.Type.SET, def: Thrift.Set.define(Thrift.Type.STRING) },
  2: { alias: 'fullMap', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.STRING) }
});

module.exports.ResourceAttributes = Thrift.Struct.define('ResourceAttributes', {
  1: { alias: 'sourceURL', type: Thrift.Type.STRING },
  2: { alias: 'timestamp', type: Thrift.Type.I64 },
  3: { alias: 'latitude', type: Thrift.Type.DOUBLE },
  4: { alias: 'longitude', type: Thrift.Type.DOUBLE },
  5: { alias: 'altitude', type: Thrift.Type.DOUBLE },
  6: { alias: 'cameraMake', type: Thrift.Type.STRING },
  7: { alias: 'cameraModel', type: Thrift.Type.STRING },
  8: { alias: 'clientWillIndex', type: Thrift.Type.BOOL },
  9: { alias: 'recoType', type: Thrift.Type.STRING },
  10: { alias: 'fileName', type: Thrift.Type.STRING },
  11: { alias: 'attachment', type: Thrift.Type.BOOL },
  12: { alias: 'applicationData', type: Thrift.Type.STRUCT, def: module.exports.LazyMap }
});

module.exports.Resource = Thrift.Struct.define('Resource', {
  1: { alias: 'guid', type: Thrift.Type.STRING },
  2: { alias: 'noteGuid', type: Thrift.Type.STRING },
  3: { alias: 'data', type: Thrift.Type.STRUCT, def: module.exports.Data },
  4: { alias: 'mime', type: Thrift.Type.STRING },
  5: { alias: 'width', type: Thrift.Type.I16 },
  6: { alias: 'height', type: Thrift.Type.I16 },
  7: { alias: 'duration', type: Thrift.Type.I16 },
  8: { alias: 'active', type: Thrift.Type.BOOL },
  9: { alias: 'recognition', type: Thrift.Type.STRUCT, def: module.exports.Data },
  11: { alias: 'attributes', type: Thrift.Type.STRUCT, def: module.exports.ResourceAttributes },
  12: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
  13: { alias: 'alternateData', type: Thrift.Type.STRUCT, def: module.exports.Data }
});

module.exports.NoteAttributes = Thrift.Struct.define('NoteAttributes', {
  1: { alias: 'subjectDate', type: Thrift.Type.I64 },
  10: { alias: 'latitude', type: Thrift.Type.DOUBLE },
  11: { alias: 'longitude', type: Thrift.Type.DOUBLE },
  12: { alias: 'altitude', type: Thrift.Type.DOUBLE },
  13: { alias: 'author', type: Thrift.Type.STRING },
  14: { alias: 'source', type: Thrift.Type.STRING },
  15: { alias: 'sourceURL', type: Thrift.Type.STRING },
  16: { alias: 'sourceApplication', type: Thrift.Type.STRING },
  17: { alias: 'shareDate', type: Thrift.Type.I64 },
  18: { alias: 'reminderOrder', type: Thrift.Type.I64 },
  19: { alias: 'reminderDoneTime', type: Thrift.Type.I64 },
  20: { alias: 'reminderTime', type: Thrift.Type.I64 },
  21: { alias: 'placeName', type: Thrift.Type.STRING },
  22: { alias: 'contentClass', type: Thrift.Type.STRING },
  23: { alias: 'applicationData', type: Thrift.Type.STRUCT, def: module.exports.LazyMap },
  24: { alias: 'lastEditedBy', type: Thrift.Type.STRING },
  26: { alias: 'classifications', type: Thrift.Type.MAP, def: Thrift.Map.define(Thrift.Type.STRING, Thrift.Type.STRING) },
  27: { alias: 'creatorId', type: Thrift.Type.I32 },
  28: { alias: 'lastEditorId', type: Thrift.Type.I32 },
  29: { alias: 'sharedWithBusiness', type: Thrift.Type.BOOL },
  30: { alias: 'conflictSourceNoteGuid', type: Thrift.Type.STRING },
  31: { alias: 'noteTitleQuality', type: Thrift.Type.I32 }
});

module.exports.SharedNote = Thrift.Struct.define('SharedNote', {
  1: { alias: 'sharerUserID', type: Thrift.Type.I32 },
  2: { alias: 'recipientIdentity', type: Thrift.Type.STRUCT, def: module.exports.Identity },
  3: { alias: 'privilege', type: Thrift.Type.I32 },
  4: { alias: 'serviceCreated', type: Thrift.Type.I64 },
  5: { alias: 'serviceUpdated', type: Thrift.Type.I64 },
  6: { alias: 'serviceAssigned', type: Thrift.Type.I64 }
});

module.exports.NoteRestrictions = Thrift.Struct.define('NoteRestrictions', {
  1: { alias: 'noUpdateTitle', type: Thrift.Type.BOOL },
  2: { alias: 'noUpdateContent', type: Thrift.Type.BOOL },
  3: { alias: 'noEmail', type: Thrift.Type.BOOL },
  4: { alias: 'noShare', type: Thrift.Type.BOOL },
  5: { alias: 'noSharePublicly', type: Thrift.Type.BOOL }
});

module.exports.NoteLimits = Thrift.Struct.define('NoteLimits', {
  1: { alias: 'noteResourceCountMax', type: Thrift.Type.I32 },
  2: { alias: 'uploadLimit', type: Thrift.Type.I64 },
  3: { alias: 'resourceSizeMax', type: Thrift.Type.I64 },
  4: { alias: 'noteSizeMax', type: Thrift.Type.I64 },
  5: { alias: 'uploaded', type: Thrift.Type.I64 }
});

module.exports.Note = Thrift.Struct.define('Note', {
  1: { alias: 'guid', type: Thrift.Type.STRING },
  2: { alias: 'title', type: Thrift.Type.STRING },
  3: { alias: 'content', type: Thrift.Type.STRING },
  4: { alias: 'contentHash', type: Thrift.Type.BINARY },
  5: { alias: 'contentLength', type: Thrift.Type.I32 },
  6: { alias: 'created', type: Thrift.Type.I64 },
  7: { alias: 'updated', type: Thrift.Type.I64 },
  8: { alias: 'deleted', type: Thrift.Type.I64 },
  9: { alias: 'active', type: Thrift.Type.BOOL },
  10: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
  11: { alias: 'notebookGuid', type: Thrift.Type.STRING },
  12: { alias: 'tagGuids', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  13: { alias: 'resources', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.Resource) },
  14: { alias: 'attributes', type: Thrift.Type.STRUCT, def: module.exports.NoteAttributes },
  15: { alias: 'tagNames', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) },
  16: { alias: 'sharedNotes', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.SharedNote) },
  17: { alias: 'restrictions', type: Thrift.Type.STRUCT, def: module.exports.NoteRestrictions },
  18: { alias: 'limits', type: Thrift.Type.STRUCT, def: module.exports.NoteLimits }
});

module.exports.Publishing = Thrift.Struct.define('Publishing', {
  1: { alias: 'uri', type: Thrift.Type.STRING },
  2: { alias: 'order', type: Thrift.Type.I32 },
  3: { alias: 'ascending', type: Thrift.Type.BOOL },
  4: { alias: 'publicDescription', type: Thrift.Type.STRING }
});

module.exports.BusinessNotebook = Thrift.Struct.define('BusinessNotebook', {
  1: { alias: 'notebookDescription', type: Thrift.Type.STRING },
  2: { alias: 'privilege', type: Thrift.Type.I32 },
  3: { alias: 'recommended', type: Thrift.Type.BOOL }
});

module.exports.SavedSearchScope = Thrift.Struct.define('SavedSearchScope', {
  1: { alias: 'includeAccount', type: Thrift.Type.BOOL },
  2: { alias: 'includePersonalLinkedNotebooks', type: Thrift.Type.BOOL },
  3: { alias: 'includeBusinessLinkedNotebooks', type: Thrift.Type.BOOL }
});

module.exports.SavedSearch = Thrift.Struct.define('SavedSearch', {
  1: { alias: 'guid', type: Thrift.Type.STRING },
  2: { alias: 'name', type: Thrift.Type.STRING },
  3: { alias: 'query', type: Thrift.Type.STRING },
  4: { alias: 'format', type: Thrift.Type.I32 },
  5: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
  6: { alias: 'scope', type: Thrift.Type.STRUCT, def: module.exports.SavedSearchScope }
});

module.exports.Ad = Thrift.Struct.define('Ad', {
  1: { alias: 'id', type: Thrift.Type.I32 },
  2: { alias: 'width', type: Thrift.Type.I16 },
  3: { alias: 'height', type: Thrift.Type.I16 },
  4: { alias: 'advertiserName', type: Thrift.Type.STRING },
  5: { alias: 'imageUrl', type: Thrift.Type.STRING },
  6: { alias: 'destinationUrl', type: Thrift.Type.STRING },
  7: { alias: 'displaySeconds', type: Thrift.Type.I16 },
  8: { alias: 'score', type: Thrift.Type.DOUBLE },
  9: { alias: 'image', type: Thrift.Type.BINARY },
  10: { alias: 'imageMime', type: Thrift.Type.STRING },
  11: { alias: 'html', type: Thrift.Type.STRING },
  12: { alias: 'displayFrequency', type: Thrift.Type.DOUBLE },
  13: { alias: 'openInTrunk', type: Thrift.Type.BOOL }
});

module.exports.SharedNotebookRecipientSettings = Thrift.Struct.define('SharedNotebookRecipientSettings', {
  1: { alias: 'reminderNotifyEmail', type: Thrift.Type.BOOL },
  2: { alias: 'reminderNotifyInApp', type: Thrift.Type.BOOL }
});

module.exports.NotebookRecipientSettings = Thrift.Struct.define('NotebookRecipientSettings', {
  1: { alias: 'reminderNotifyEmail', type: Thrift.Type.BOOL },
  2: { alias: 'reminderNotifyInApp', type: Thrift.Type.BOOL },
  3: { alias: 'inMyList', type: Thrift.Type.BOOL },
  4: { alias: 'stack', type: Thrift.Type.STRING }
});

module.exports.SharedNotebook = Thrift.Struct.define('SharedNotebook', {
  1: { alias: 'id', type: Thrift.Type.I64 },
  2: { alias: 'userId', type: Thrift.Type.I32 },
  3: { alias: 'notebookGuid', type: Thrift.Type.STRING },
  4: { alias: 'email', type: Thrift.Type.STRING },
  18: { alias: 'recipientIdentityId', type: Thrift.Type.I64 },
  5: { alias: 'notebookModifiable', type: Thrift.Type.BOOL },
  7: { alias: 'serviceCreated', type: Thrift.Type.I64 },
  10: { alias: 'serviceUpdated', type: Thrift.Type.I64 },
  8: { alias: 'globalId', type: Thrift.Type.STRING },
  9: { alias: 'username', type: Thrift.Type.STRING },
  11: { alias: 'privilege', type: Thrift.Type.I32 },
  13: { alias: 'recipientSettings', type: Thrift.Type.STRUCT, def: module.exports.SharedNotebookRecipientSettings },
  14: { alias: 'sharerUserId', type: Thrift.Type.I32 },
  15: { alias: 'recipientUsername', type: Thrift.Type.STRING },
  17: { alias: 'recipientUserId', type: Thrift.Type.I32 },
  16: { alias: 'serviceAssigned', type: Thrift.Type.I64 }
});

module.exports.NotebookRestrictions = Thrift.Struct.define('NotebookRestrictions', {
  1: { alias: 'noReadNotes', type: Thrift.Type.BOOL },
  2: { alias: 'noCreateNotes', type: Thrift.Type.BOOL },
  3: { alias: 'noUpdateNotes', type: Thrift.Type.BOOL },
  4: { alias: 'noExpungeNotes', type: Thrift.Type.BOOL },
  5: { alias: 'noShareNotes', type: Thrift.Type.BOOL },
  6: { alias: 'noEmailNotes', type: Thrift.Type.BOOL },
  7: { alias: 'noSendMessageToRecipients', type: Thrift.Type.BOOL },
  8: { alias: 'noUpdateNotebook', type: Thrift.Type.BOOL },
  9: { alias: 'noExpungeNotebook', type: Thrift.Type.BOOL },
  10: { alias: 'noSetDefaultNotebook', type: Thrift.Type.BOOL },
  11: { alias: 'noSetNotebookStack', type: Thrift.Type.BOOL },
  12: { alias: 'noPublishToPublic', type: Thrift.Type.BOOL },
  13: { alias: 'noPublishToBusinessLibrary', type: Thrift.Type.BOOL },
  14: { alias: 'noCreateTags', type: Thrift.Type.BOOL },
  15: { alias: 'noUpdateTags', type: Thrift.Type.BOOL },
  16: { alias: 'noExpungeTags', type: Thrift.Type.BOOL },
  17: { alias: 'noSetParentTag', type: Thrift.Type.BOOL },
  18: { alias: 'noCreateSharedNotebooks', type: Thrift.Type.BOOL },
  19: { alias: 'updateWhichSharedNotebookRestrictions', type: Thrift.Type.I32 },
  20: { alias: 'expungeWhichSharedNotebookRestrictions', type: Thrift.Type.I32 },
  21: { alias: 'noShareNotesWithBusiness', type: Thrift.Type.BOOL },
  22: { alias: 'noRenameNotebook', type: Thrift.Type.BOOL }
});

module.exports.Notebook = Thrift.Struct.define('Notebook', {
  1: { alias: 'guid', type: Thrift.Type.STRING },
  2: { alias: 'name', type: Thrift.Type.STRING },
  5: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
  6: { alias: 'defaultNotebook', type: Thrift.Type.BOOL },
  7: { alias: 'serviceCreated', type: Thrift.Type.I64 },
  8: { alias: 'serviceUpdated', type: Thrift.Type.I64 },
  10: { alias: 'publishing', type: Thrift.Type.STRUCT, def: module.exports.Publishing },
  11: { alias: 'published', type: Thrift.Type.BOOL },
  12: { alias: 'stack', type: Thrift.Type.STRING },
  13: { alias: 'sharedNotebookIds', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.I64) },
  14: { alias: 'sharedNotebooks', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.SharedNotebook) },
  15: { alias: 'businessNotebook', type: Thrift.Type.STRUCT, def: module.exports.BusinessNotebook },
  16: { alias: 'contact', type: Thrift.Type.STRUCT, def: module.exports.User },
  17: { alias: 'restrictions', type: Thrift.Type.STRUCT, def: module.exports.NotebookRestrictions },
  18: { alias: 'recipientSettings', type: Thrift.Type.STRUCT, def: module.exports.NotebookRecipientSettings }
});

module.exports.LinkedNotebook = Thrift.Struct.define('LinkedNotebook', {
  2: { alias: 'shareName', type: Thrift.Type.STRING },
  3: { alias: 'username', type: Thrift.Type.STRING },
  4: { alias: 'shardId', type: Thrift.Type.STRING },
  5: { alias: 'sharedNotebookGlobalId', type: Thrift.Type.STRING },
  6: { alias: 'uri', type: Thrift.Type.STRING },
  7: { alias: 'guid', type: Thrift.Type.STRING },
  8: { alias: 'updateSequenceNum', type: Thrift.Type.I32 },
  9: { alias: 'noteStoreUrl', type: Thrift.Type.STRING },
  10: { alias: 'webApiUrlPrefix', type: Thrift.Type.STRING },
  11: { alias: 'stack', type: Thrift.Type.STRING },
  12: { alias: 'businessId', type: Thrift.Type.I32 }
});

module.exports.NotebookDescriptor = Thrift.Struct.define('NotebookDescriptor', {
  1: { alias: 'guid', type: Thrift.Type.STRING },
  2: { alias: 'notebookDisplayName', type: Thrift.Type.STRING },
  3: { alias: 'contactName', type: Thrift.Type.STRING },
  4: { alias: 'hasSharedNotebook', type: Thrift.Type.BOOL },
  5: { alias: 'joinedUserCount', type: Thrift.Type.I32 }
});

module.exports.UserProfile = Thrift.Struct.define('UserProfile', {
  1: { alias: 'id', type: Thrift.Type.I32 },
  2: { alias: 'name', type: Thrift.Type.STRING },
  3: { alias: 'email', type: Thrift.Type.STRING },
  4: { alias: 'username', type: Thrift.Type.STRING },
  5: { alias: 'attributes', type: Thrift.Type.STRUCT, def: module.exports.BusinessUserAttributes },
  6: { alias: 'joined', type: Thrift.Type.I64 },
  7: { alias: 'photoLastUpdated', type: Thrift.Type.I64 },
  8: { alias: 'photoUrl', type: Thrift.Type.STRING },
  9: { alias: 'role', type: Thrift.Type.I32 }
});

module.exports.RelatedContentImage = Thrift.Struct.define('RelatedContentImage', {
  1: { alias: 'url', type: Thrift.Type.STRING },
  2: { alias: 'width', type: Thrift.Type.I32 },
  3: { alias: 'height', type: Thrift.Type.I32 },
  4: { alias: 'pixelRatio', type: Thrift.Type.DOUBLE },
  5: { alias: 'fileSize', type: Thrift.Type.I32 }
});

module.exports.RelatedContent = Thrift.Struct.define('RelatedContent', {
  1: { alias: 'contentId', type: Thrift.Type.STRING },
  2: { alias: 'title', type: Thrift.Type.STRING },
  3: { alias: 'url', type: Thrift.Type.STRING },
  4: { alias: 'sourceId', type: Thrift.Type.STRING },
  5: { alias: 'sourceUrl', type: Thrift.Type.STRING },
  6: { alias: 'sourceFaviconUrl', type: Thrift.Type.STRING },
  7: { alias: 'sourceName', type: Thrift.Type.STRING },
  8: { alias: 'date', type: Thrift.Type.I64 },
  9: { alias: 'teaser', type: Thrift.Type.STRING },
  10: { alias: 'thumbnails', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.RelatedContentImage) },
  11: { alias: 'contentType', type: Thrift.Type.I32 },
  12: { alias: 'accessType', type: Thrift.Type.I32 },
  13: { alias: 'visibleUrl', type: Thrift.Type.STRING },
  14: { alias: 'clipUrl', type: Thrift.Type.STRING },
  15: { alias: 'contact', type: Thrift.Type.STRUCT, def: module.exports.Contact },
  16: { alias: 'authors', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRING) }
});

module.exports.BusinessInvitation = Thrift.Struct.define('BusinessInvitation', {
  1: { alias: 'businessId', type: Thrift.Type.I32 },
  2: { alias: 'email', type: Thrift.Type.STRING },
  3: { alias: 'role', type: Thrift.Type.I32 },
  4: { alias: 'status', type: Thrift.Type.I32 },
  5: { alias: 'requesterId', type: Thrift.Type.I32 },
  6: { alias: 'fromWorkChat', type: Thrift.Type.BOOL },
  7: { alias: 'created', type: Thrift.Type.I64 }
});

module.exports.UserIdentity = Thrift.Struct.define('UserIdentity', {
  1: { alias: 'type', type: Thrift.Type.I32 },
  2: { alias: 'stringIdentifier', type: Thrift.Type.STRING },
  3: { alias: 'longIdentifier', type: Thrift.Type.I64 }
});
},{"../thrift":13,"./Limits":8}],11:[function(require,module,exports){
'use strict';

//
// Autogenerated by Thrift Compiler (0.6.0-en-exported)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


// Define types and services

var Thrift = require('../thrift');
var Types = require('./Types');
var Errors = require('./Errors');

module.exports.EDAM_VERSION_MAJOR = 1;

module.exports.EDAM_VERSION_MINOR = 28;

module.exports.PublicUserInfo = Thrift.Struct.define('PublicUserInfo', {
  1: { alias: 'userId', type: Thrift.Type.I32 },
  7: { alias: 'serviceLevel', type: Thrift.Type.I32 },
  4: { alias: 'username', type: Thrift.Type.STRING },
  5: { alias: 'noteStoreUrl', type: Thrift.Type.STRING },
  6: { alias: 'webApiUrlPrefix', type: Thrift.Type.STRING }
});

module.exports.UserUrls = Thrift.Struct.define('UserUrls', {
  1: { alias: 'noteStoreUrl', type: Thrift.Type.STRING },
  2: { alias: 'webApiUrlPrefix', type: Thrift.Type.STRING },
  3: { alias: 'userStoreUrl', type: Thrift.Type.STRING },
  4: { alias: 'utilityUrl', type: Thrift.Type.STRING },
  5: { alias: 'messageStoreUrl', type: Thrift.Type.STRING },
  6: { alias: 'userWebSocketUrl', type: Thrift.Type.STRING }
});

module.exports.AuthenticationResult = Thrift.Struct.define('AuthenticationResult', {
  1: { alias: 'currentTime', type: Thrift.Type.I64 },
  2: { alias: 'authenticationToken', type: Thrift.Type.STRING },
  3: { alias: 'expiration', type: Thrift.Type.I64 },
  4: { alias: 'user', type: Thrift.Type.STRUCT, def: Types.User },
  5: { alias: 'publicUserInfo', type: Thrift.Type.STRUCT, def: module.exports.PublicUserInfo },
  6: { alias: 'noteStoreUrl', type: Thrift.Type.STRING },
  7: { alias: 'webApiUrlPrefix', type: Thrift.Type.STRING },
  8: { alias: 'secondFactorRequired', type: Thrift.Type.BOOL },
  9: { alias: 'secondFactorDeliveryHint', type: Thrift.Type.STRING },
  10: { alias: 'urls', type: Thrift.Type.STRUCT, def: module.exports.UserUrls }
});

module.exports.BootstrapSettings = Thrift.Struct.define('BootstrapSettings', {
  1: { alias: 'serviceHost', type: Thrift.Type.STRING },
  2: { alias: 'marketingUrl', type: Thrift.Type.STRING },
  3: { alias: 'supportUrl', type: Thrift.Type.STRING },
  4: { alias: 'accountEmailDomain', type: Thrift.Type.STRING },
  5: { alias: 'enableFacebookSharing', type: Thrift.Type.BOOL },
  6: { alias: 'enableGiftSubscriptions', type: Thrift.Type.BOOL },
  7: { alias: 'enableSupportTickets', type: Thrift.Type.BOOL },
  8: { alias: 'enableSharedNotebooks', type: Thrift.Type.BOOL },
  9: { alias: 'enableSingleNoteSharing', type: Thrift.Type.BOOL },
  10: { alias: 'enableSponsoredAccounts', type: Thrift.Type.BOOL },
  11: { alias: 'enableTwitterSharing', type: Thrift.Type.BOOL },
  12: { alias: 'enableLinkedInSharing', type: Thrift.Type.BOOL },
  13: { alias: 'enablePublicNotebooks', type: Thrift.Type.BOOL },
  16: { alias: 'enableGoogle', type: Thrift.Type.BOOL }
});

module.exports.BootstrapProfile = Thrift.Struct.define('BootstrapProfile', {
  1: { alias: 'name', type: Thrift.Type.STRING },
  2: { alias: 'settings', type: Thrift.Type.STRUCT, def: module.exports.BootstrapSettings }
});

module.exports.BootstrapInfo = Thrift.Struct.define('BootstrapInfo', {
  1: { alias: 'profiles', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, module.exports.BootstrapProfile) }
});

var UserStore = module.exports.UserStore = {};

UserStore.checkVersion = Thrift.Method.define({
  alias: 'checkVersion',
  args: Thrift.Struct.define('checkVersionArgs', {
    1: { alias: 'clientName', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'edamVersionMajor', type: Thrift.Type.I16, index: 1 },
    3: { alias: 'edamVersionMinor', type: Thrift.Type.I16, index: 2 }
  }),
  result: Thrift.Struct.define('checkVersionResult', {
    0: { alias: 'returnValue', type: Thrift.Type.BOOL }
  })
});

UserStore.getBootstrapInfo = Thrift.Method.define({
  alias: 'getBootstrapInfo',
  args: Thrift.Struct.define('getBootstrapInfoArgs', {
    1: { alias: 'locale', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('getBootstrapInfoResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.BootstrapInfo }
  })
});

UserStore.authenticateLongSession = Thrift.Method.define({
  alias: 'authenticateLongSession',
  args: Thrift.Struct.define('authenticateLongSessionArgs', {
    1: { alias: 'username', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'password', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'consumerKey', type: Thrift.Type.STRING, index: 2 },
    4: { alias: 'consumerSecret', type: Thrift.Type.STRING, index: 3 },
    5: { alias: 'deviceIdentifier', type: Thrift.Type.STRING, index: 4 },
    6: { alias: 'deviceDescription', type: Thrift.Type.STRING, index: 5 },
    7: { alias: 'supportsTwoFactor', type: Thrift.Type.BOOL, index: 6 }
  }),
  result: Thrift.Struct.define('authenticateLongSessionResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.AuthenticationResult },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

UserStore.completeTwoFactorAuthentication = Thrift.Method.define({
  alias: 'completeTwoFactorAuthentication',
  args: Thrift.Struct.define('completeTwoFactorAuthenticationArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'oneTimeCode', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'deviceIdentifier', type: Thrift.Type.STRING, index: 2 },
    4: { alias: 'deviceDescription', type: Thrift.Type.STRING, index: 3 }
  }),
  result: Thrift.Struct.define('completeTwoFactorAuthenticationResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.AuthenticationResult },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

UserStore.revokeLongSession = Thrift.Method.define({
  alias: 'revokeLongSession',
  args: Thrift.Struct.define('revokeLongSessionArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('revokeLongSessionResult', {
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

UserStore.authenticateToBusiness = Thrift.Method.define({
  alias: 'authenticateToBusiness',
  args: Thrift.Struct.define('authenticateToBusinessArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('authenticateToBusinessResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.AuthenticationResult },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

UserStore.getUser = Thrift.Method.define({
  alias: 'getUser',
  args: Thrift.Struct.define('getUserArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('getUserResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.User },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

UserStore.getPublicUserInfo = Thrift.Method.define({
  alias: 'getPublicUserInfo',
  args: Thrift.Struct.define('getPublicUserInfoArgs', {
    1: { alias: 'username', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('getPublicUserInfoResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.PublicUserInfo },
    1: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
  })
});

UserStore.getPremiumInfo = Thrift.Method.define({
  alias: 'getPremiumInfo',
  args: Thrift.Struct.define('getPremiumInfoArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('getPremiumInfoResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.PremiumInfo },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

UserStore.getUserUrls = Thrift.Method.define({
  alias: 'getUserUrls',
  args: Thrift.Struct.define('getUserUrlsArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('getUserUrlsResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: module.exports.UserUrls },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

UserStore.inviteToBusiness = Thrift.Method.define({
  alias: 'inviteToBusiness',
  args: Thrift.Struct.define('inviteToBusinessArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'emailAddress', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('inviteToBusinessResult', {
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

UserStore.removeFromBusiness = Thrift.Method.define({
  alias: 'removeFromBusiness',
  args: Thrift.Struct.define('removeFromBusinessArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'emailAddress', type: Thrift.Type.STRING, index: 1 }
  }),
  result: Thrift.Struct.define('removeFromBusinessResult', {
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

UserStore.updateBusinessUserIdentifier = Thrift.Method.define({
  alias: 'updateBusinessUserIdentifier',
  args: Thrift.Struct.define('updateBusinessUserIdentifierArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'oldEmailAddress', type: Thrift.Type.STRING, index: 1 },
    3: { alias: 'newEmailAddress', type: Thrift.Type.STRING, index: 2 }
  }),
  result: Thrift.Struct.define('updateBusinessUserIdentifierResult', {
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException },
    3: { alias: 'notFoundException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMNotFoundException }
  })
});

UserStore.listBusinessUsers = Thrift.Method.define({
  alias: 'listBusinessUsers',
  args: Thrift.Struct.define('listBusinessUsersArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 }
  }),
  result: Thrift.Struct.define('listBusinessUsersResult', {
    0: { alias: 'returnValue', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.UserProfile) },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

UserStore.listBusinessInvitations = Thrift.Method.define({
  alias: 'listBusinessInvitations',
  args: Thrift.Struct.define('listBusinessInvitationsArgs', {
    1: { alias: 'authenticationToken', type: Thrift.Type.STRING, index: 0 },
    2: { alias: 'includeRequestedInvitations', type: Thrift.Type.BOOL, index: 1 }
  }),
  result: Thrift.Struct.define('listBusinessInvitationsResult', {
    0: { alias: 'returnValue', type: Thrift.Type.LIST, def: Thrift.List.define(Thrift.Type.STRUCT, Types.BusinessInvitation) },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException },
    2: { alias: 'systemException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMSystemException }
  })
});

UserStore.getAccountLimits = Thrift.Method.define({
  alias: 'getAccountLimits',
  args: Thrift.Struct.define('getAccountLimitsArgs', {
    1: { alias: 'serviceLevel', type: Thrift.Type.I32, index: 0 }
  }),
  result: Thrift.Struct.define('getAccountLimitsResult', {
    0: { alias: 'returnValue', type: Thrift.Type.STRUCT, def: Types.AccountLimits },
    1: { alias: 'userException', type: Thrift.Type.EXCEPTION, def: Errors.EDAMUserException }
  })
});

// Define UserStore Client

function UserStoreClient(output) {
  this.output = output;
  this.seqid = 0;
}

UserStoreClient.prototype.checkVersion = function (clientName, edamVersionMajor, edamVersionMinor, callback) {
  var mdef = UserStore.checkVersion;
  var args = new mdef.args();
  args.clientName = clientName;
  args.edamVersionMajor = edamVersionMajor;
  args.edamVersionMinor = edamVersionMinor;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.getBootstrapInfo = function (locale, callback) {
  var mdef = UserStore.getBootstrapInfo;
  var args = new mdef.args();
  args.locale = locale;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.authenticateLongSession = function (username, password, consumerKey, consumerSecret, deviceIdentifier, deviceDescription, supportsTwoFactor, callback) {
  var mdef = UserStore.authenticateLongSession;
  var args = new mdef.args();
  args.username = username;
  args.password = password;
  args.consumerKey = consumerKey;
  args.consumerSecret = consumerSecret;
  args.deviceIdentifier = deviceIdentifier;
  args.deviceDescription = deviceDescription;
  args.supportsTwoFactor = supportsTwoFactor;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.completeTwoFactorAuthentication = function (authenticationToken, oneTimeCode, deviceIdentifier, deviceDescription, callback) {
  var mdef = UserStore.completeTwoFactorAuthentication;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.oneTimeCode = oneTimeCode;
  args.deviceIdentifier = deviceIdentifier;
  args.deviceDescription = deviceDescription;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.revokeLongSession = function (authenticationToken, callback) {
  var mdef = UserStore.revokeLongSession;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.authenticateToBusiness = function (authenticationToken, callback) {
  var mdef = UserStore.authenticateToBusiness;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.getUser = function (authenticationToken, callback) {
  var mdef = UserStore.getUser;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.getPublicUserInfo = function (username, callback) {
  var mdef = UserStore.getPublicUserInfo;
  var args = new mdef.args();
  args.username = username;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.getPremiumInfo = function (authenticationToken, callback) {
  var mdef = UserStore.getPremiumInfo;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.getUserUrls = function (authenticationToken, callback) {
  var mdef = UserStore.getUserUrls;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.inviteToBusiness = function (authenticationToken, emailAddress, callback) {
  var mdef = UserStore.inviteToBusiness;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.emailAddress = emailAddress;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.removeFromBusiness = function (authenticationToken, emailAddress, callback) {
  var mdef = UserStore.removeFromBusiness;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.emailAddress = emailAddress;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.updateBusinessUserIdentifier = function (authenticationToken, oldEmailAddress, newEmailAddress, callback) {
  var mdef = UserStore.updateBusinessUserIdentifier;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.oldEmailAddress = oldEmailAddress;
  args.newEmailAddress = newEmailAddress;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.listBusinessUsers = function (authenticationToken, callback) {
  var mdef = UserStore.listBusinessUsers;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.listBusinessInvitations = function (authenticationToken, includeRequestedInvitations, callback) {
  var mdef = UserStore.listBusinessInvitations;
  var args = new mdef.args();
  args.authenticationToken = authenticationToken;
  args.includeRequestedInvitations = includeRequestedInvitations;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

UserStoreClient.prototype.getAccountLimits = function (serviceLevel, callback) {
  var mdef = UserStore.getAccountLimits;
  var args = new mdef.args();
  args.serviceLevel = serviceLevel;
  mdef.sendRequest(this.output, this.seqid++, args, callback);
};

module.exports.UserStore.Client = UserStoreClient;

// Define UserStore Server

function UserStoreServer(service, stransport, Protocol) {
  var methodName;
  this.service = service;
  this.stransport = stransport;
  this.processor = new Thrift.Processor();
  for (methodName in UserStore) {
    if (service[methodName]) {
      this.processor.addMethod(UserStore[methodName], service[methodName].bind(service));
    }
  }
  this.stransport.process = function (input, output, noop) {
    var inprot = new Protocol(input);
    var outprot = new Protocol(output);
    this.processor.process(inprot, outprot, noop);
  }.bind(this);
}

UserStoreServer.prototype.start = function () {
  this.stransport.listen();
};
UserStoreServer.prototype.stop = function () {
  this.stransport.close();
};

module.exports.UserStore.Server = UserStoreServer;
},{"../thrift":13,"./Errors":7,"./Types":10}],12:[function(require,module,exports){
(function (Buffer){(function (){
"use strict";

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var Thrift = require('../thrift');
var Type = Thrift.Type;

// NastyHaxx. JavaScript forces hex constants to be
// positive, converting this into a long. If we hardcode the int value
// instead it'll stay in 32 bit-land.

var VERSION_MASK = -65536,
    // 0xffff0000
VERSION_1 = -2147418112,
    // 0x80010000
TYPE_MASK = 0x000000ff;

function BinaryProtocol(trans, strictRead, strictWrite) {
    this.transport = this.trans = trans;
    this.strictRead = strictRead !== undefined ? strictRead : false;
    this.strictWrite = strictWrite !== undefined ? strictWrite : true;
}

BinaryProtocol.prototype.flush = function (callback) {
    var wrapTransport;

    if (callback) {
        wrapTransport = function wrapTransport(err, transport) {
            var protocol;
            if (transport) protocol = new BinaryProtocol(transport);
            return callback(err, protocol);
        };
    }

    return this.trans.flush(wrapTransport);
};

BinaryProtocol.prototype.writeMessageBegin = function (name, type, seqid) {
    if (this.strictWrite) {
        this.writeI32(VERSION_1 | type);
        this.writeString(name);
        this.writeI32(seqid);
    } else {
        this.writeString(name);
        this.writeByte(type);
        this.writeI32(seqid);
    }
};

BinaryProtocol.prototype.writeMessageEnd = function () {};

BinaryProtocol.prototype.writeStructBegin = function (name) {};

BinaryProtocol.prototype.writeStructEnd = function () {};

BinaryProtocol.prototype.writeFieldBegin = function (name, type, id) {
    this.writeByte(type);
    this.writeI16(id);
};

BinaryProtocol.prototype.writeFieldEnd = function () {};

BinaryProtocol.prototype.writeFieldStop = function () {
    this.writeByte(Type.STOP);
};

BinaryProtocol.prototype.writeMapBegin = function (ktype, vtype, size) {
    this.writeByte(ktype);
    this.writeByte(vtype);
    this.writeI32(size);
};

BinaryProtocol.prototype.writeMapEnd = function () {};

BinaryProtocol.prototype.writeListBegin = function (etype, size) {
    this.writeByte(etype);
    this.writeI32(size);
};

BinaryProtocol.prototype.writeListEnd = function () {};

BinaryProtocol.prototype.writeSetBegin = function (etype, size) {
    this.writeByte(etype);
    this.writeI32(size);
};

BinaryProtocol.prototype.writeSetEnd = function () {};

BinaryProtocol.prototype.writeBool = function (bool) {
    if (bool) {
        this.writeByte(1);
    } else {
        this.writeByte(0);
    }
};

BinaryProtocol.prototype.writeByte = function (b) {
    this.trans.write(BinaryParser.fromByte(b));
};

BinaryProtocol.prototype.writeBinary = function (bytes) {
    if (typeof bytes === "string") {
        bytes = BinaryParser.fromString(bytes);
    }
    if (bytes.length != null) {
        this.writeI32(bytes.length);
    } else {
        throw Error("Cannot read length of binary data");
    }
    this.trans.write(bytes);
};

BinaryProtocol.prototype.writeI16 = function (i16) {
    this.trans.write(BinaryParser.fromShort(i16));
};

BinaryProtocol.prototype.writeI32 = function (i32) {
    this.trans.write(BinaryParser.fromInt(i32));
};

BinaryProtocol.prototype.writeI64 = function (i64) {
    var buffer = BinaryParser.fromLong(i64);
    this.trans.write(buffer);
};

BinaryProtocol.prototype.writeDouble = function (dub) {
    this.trans.write(BinaryParser.fromDouble(dub));
};

BinaryProtocol.prototype.writeString = function (str) {
    var bytes = BinaryParser.fromString(str);
    this.writeI32(bytes.length);
    this.trans.write(bytes);
};

BinaryProtocol.prototype.writeType = function (type, value) {
    switch (type) {
        case Type.BOOL:
            return this.writeBool(value);
        case Type.BYTE:
            return this.writeByte(value);
        case Type.I16:
            return this.writeI16(value);
        case Type.I32:
            return this.writeI32(value);
        case Type.I64:
            return this.writeI64(value);
        case Type.DOUBLE:
            return this.writeDouble(value);
        case Type.STRING:
            return this.writeString(value);
        case Type.BINARY:
            return this.writeBinary(value);
        //            case Type.STRUCT:
        //            case Type.MAP:
        //            case Type.SET:
        //            case Type.LIST:
        default:
            throw Error("Invalid type: " + type);
    }
};

BinaryProtocol.prototype.readMessageBegin = function () {
    var size = this.readI32();
    var signature = {
        mtype: null,
        fname: null,
        seqid: null
    };

    if (size < 0) {
        // size written at server: -2147418110 == 0x80010002
        var version = size & VERSION_MASK;
        if (version != VERSION_1) {
            console.log("BAD: " + version);
            throw Error("Bad version in readMessageBegin: " + size);
        }
        signature.mtype = size & TYPE_MASK;
        signature.fname = this.readString();
        signature.seqid = this.readI32();
    } else {
        if (this.strictRead) {
            throw Error("No protocol version header");
        }

        signature.fname = this.trans.read(size);
        signature.mtype = this.readByte();
        signature.seqid = this.readI32();
    }

    return signature;
};

BinaryProtocol.prototype.readMessageEnd = function () {
    // Do nothing
};

BinaryProtocol.prototype.readStructBegin = function () {
    return { fname: '' }; // Where is this return value used? Can it be removed?
};

BinaryProtocol.prototype.readStructEnd = function () {
    // Do nothing
};

BinaryProtocol.prototype.readFieldBegin = function () {
    var type = this.readByte();
    var field = {
        fname: null,
        ftype: type,
        fid: 0
    };

    if (type != Type.STOP) {
        field.fid = this.readI16();
    }

    return field;
};

BinaryProtocol.prototype.readFieldEnd = function () {
    // Do nothing
};

BinaryProtocol.prototype.readMapBegin = function () {
    // Add variables required by thrift generated js code but not needed for BinaryHttpTransport
    var result = {
        ktype: null,
        vtype: null,
        size: null
    };

    result.ktype = this.readByte();
    result.vtype = this.readByte();
    result.size = this.readI32();

    return result;
};

BinaryProtocol.prototype.readMapEnd = function () {
    // Do nothing
};

BinaryProtocol.prototype.readListBegin = function () {
    var result = {
        etype: null,
        size: null
    };
    result.etype = this.readByte();
    result.size = this.readI32();
    return result;
};

BinaryProtocol.prototype.readListEnd = function () {
    // Do nothing
};

BinaryProtocol.prototype.readSetBegin = function () {
    var result = {
        etype: null,
        size: null
    };
    result.etype = this.readByte();
    result.size = this.readI32();
    return result;
};

BinaryProtocol.prototype.readSetEnd = function () {
    // Do nothing
};

BinaryProtocol.prototype.readBool = function () {
    var b = this.readByte();
    return b == 1;
};

// ThriftJS expects values to be wrapped in an object with a prop named "value"
BinaryProtocol.prototype.readByte = function () {
    var buffer = this.trans.read(1);
    var result = buffer.readUInt8(0);
    return result;
};

BinaryProtocol.prototype.readI16 = function () {
    var buffer = this.trans.read(2);
    var result = buffer.readInt16BE(0);
    return result;
};

BinaryProtocol.prototype.readI32 = function () {
    var buffer = this.trans.read(4);
    var result = buffer.readInt32BE(0);
    return result;
};

BinaryProtocol.prototype.readI64 = function () {
    var buffer = this.trans.read(8);
    var result = BinaryParser.toLong(buffer);
    return result;
};

BinaryProtocol.prototype.readDouble = function () {
    var buffer = this.trans.read(8);
    var result = buffer.readDoubleBE(0);
    return result;
};

BinaryProtocol.prototype.readBinary = function () {
    var len = this.readI32();
    var buffer = this.trans.read(len);
    return buffer;
};

BinaryProtocol.prototype.readString = function () {
    var len = this.readI32();
    var buffer = this.trans.read(len);
    var result = buffer.toString();
    return result;
};

BinaryProtocol.prototype.readType = function (type) {
    switch (type) {
        case Type.BOOL:
            return this.readBool();
        case Type.BYTE:
            return this.readByte();
        case Type.I16:
            return this.readI16();
        case Type.I32:
            return this.readI32();
        case Type.I64:
            return this.readI64();
        case Type.DOUBLE:
            return this.readDouble();
        case Type.STRING:
            return this.readString();
        case Type.BINARY:
            return this.readBinary();
        //            case Type.STRUCT:
        //            case Type.MAP:
        //            case Type.SET:
        //            case Type.LIST:
        default:
            throw new Error("Invalid type: " + type);
    }
};

BinaryProtocol.prototype.getTransport = function () {
    return this.trans;
};

BinaryProtocol.prototype.skipStruct = function () {
    this.readStructBegin();
    this.skipFields();
    this.readStructEnd();
};

BinaryProtocol.prototype.skipFields = function () {
    var r = this.readFieldBegin();
    if (r.ftype === Type.STOP) return;

    this.skip(r.ftype);
    this.readFieldEnd();
    this.skipFields();
};

BinaryProtocol.prototype.skipMap = function () {
    var i = 0;
    var map = this.readMapBegin();
    for (i = 0; i < map.size; i++) {
        this.skip(map.ktype);
        this.skip(map.vtype);
    }
    this.readMapEnd();
};

BinaryProtocol.prototype.skipSet = function () {
    var i = 0;
    var set = this.readSetBegin();
    for (i = 0; i < set.size; i++) {
        this.skip(set.etype);
    }
    this.readSetEnd();
};

BinaryProtocol.prototype.skipList = function () {
    var i = 0;
    var list = this.readListBegin();
    for (i = 0; i < list.size; i++) {
        this.skip(list.etype);
    }
    this.readListEnd();
};

BinaryProtocol.prototype.skip = function (type) {
    // console.log("skip: " + type);
    switch (type) {
        case Type.STOP:
            return;
        case Type.BOOL:
            return this.readBool();
        case Type.BYTE:
            return this.readByte();
        case Type.I16:
            return this.readI16();
        case Type.I32:
            return this.readI32();
        case Type.I64:
            return this.readI64();
        case Type.DOUBLE:
            return this.readDouble();
        case Type.STRING:
            return this.readString();
        case Type.STRUCT:
            return this.skipStruct();
        case Type.MAP:
            return this.skipMap();
        case Type.SET:
            return this.skipSet();
        case Type.LIST:
            return this.skipList();
        case Type.BINARY:
            return this.readBinary();
        default:
            throw Error("Invalid type: " + type);
    }
};

var BinaryParser = {};

BinaryParser.fromByte = function (b) {
    var buffer = new Buffer(1);
    buffer.writeInt8(b, 0);
    return buffer;
};

BinaryParser.fromShort = function (i16) {
    i16 = parseInt(i16);
    var buffer = new Buffer(2);
    buffer.writeInt16BE(i16, 0);
    return buffer;
};

BinaryParser.fromInt = function (i32) {
    i32 = parseInt(i32);
    var buffer = new Buffer(4);
    buffer.writeInt32BE(i32, 0);
    return buffer;
};

BinaryParser.fromLong = function (n) {
    n = parseInt(n);
    if (Math.abs(n) >= Math.pow(2, 53)) {
        throw new Error('Unable to accurately transfer numbers larger than 2^53 - 1 as integers. ' + 'Number provided was ' + n);
    }

    var bits = (Array(64).join('0') + Math.abs(n).toString(2)).slice(-64);
    if (n < 0) bits = this.twosCompliment(bits);

    var buffer = new Buffer(8);
    for (var i = 0; i < 8; i++) {
        var uint8 = parseInt(bits.substr(8 * i, 8), 2);
        buffer.writeUInt8(uint8, i);
    }
    return buffer;
};

BinaryParser.twosCompliment = function (bits) {
    // Convert to two's compliment using string manipulation because bitwise operator is limited to 32 bit numbers
    var smallestOne = bits.lastIndexOf('1');
    var left = bits.substring(0, smallestOne).replace(/1/g, 'x').replace(/0/g, '1').replace(/x/g, '0');
    bits = left + bits.substring(smallestOne);
    return bits;
};

BinaryParser.fromDouble = function (d) {
    var buffer = new Buffer(8);
    buffer.writeDoubleBE(d, 0);
    return buffer;
};

BinaryParser.fromString = function (s) {
    var len = Buffer.byteLength(s);
    var buffer = new Buffer(len);
    buffer.write(s);
    return buffer;
};

BinaryParser.toLong = function (buffer) {
    // Javascript does not support 64-bit integers. Only decode values up to 2^53 - 1.
    var sign = 1;
    var bits = '';
    for (var i = 0; i < 8; i++) {
        bits += (Array(8).join('0') + buffer.readUInt8(i).toString(2)).slice(-8);
    }

    if (bits[0] === '1') {
        sign = -1;
        bits = this.twosCompliment(bits);
    }
    var largestOne = bits.indexOf('1');
    if (largestOne != -1 && largestOne < 64 - 54) throw new Error('Unable to receive number larger than 2^53 - 1 as an integer');

    return parseInt(bits, 2) * sign;
};

module.exports = BinaryProtocol;
}).call(this)}).call(this,require("buffer").Buffer)
},{"../thrift":13,"buffer":"buffer"}],13:[function(require,module,exports){
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 Description: 'JavaScript bindings for the Apache Thrift RPC system',
 License: 'http://www.apache.org/licenses/LICENSE-2.0',
 Homepage: 'http://thrift.apache.org',
 BugReports: 'https://issues.apache.org/jira/browse/THRIFT',
 Maintainer: 'dev@thrift.apache.org',
 */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Thrift = {
    Version: '0.9.0',

    Type: {
        STOP: 0,
        VOID: 1,
        BOOL: 2,
        BYTE: 3,
        I08: 3,
        DOUBLE: 4,
        I16: 6,
        I32: 8,
        I64: 10,
        STRING: 11,
        UTF7: 11,
        STRUCT: 12,
        EXCEPTION: 12,
        MAP: 13,
        SET: 14,
        LIST: 15,
        UTF8: 16,
        UTF16: 17,
        BINARY: 18
    },

    MessageType: {
        CALL: 1,
        REPLY: 2,
        EXCEPTION: 3
    },

    objectLength: function objectLength(obj) {
        var length = 0;
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                length++;
            }
        }

        return length;
    },

    inherits: function inherits(constructor, superConstructor) {
        //Prototypal Inheritance http://javascript.crockford.com/prototypal.html
        function F() {}
        F.prototype = superConstructor.prototype;
        constructor.prototype = new F();
    }
};

// Check two Thrift.Type values for equality
// Used to support backwards compatibility for BINARY as STRING
Thrift.equals = function (t1, t2) {
    return t1 == t2 || t1 == Thrift.Type.BINARY && t2 == Thrift.Type.STRING || t1 == Thrift.Type.STRING && t2 == Thrift.Type.BINARY;
};

// Represent binary types as strings when serialized
// Used to support backwards compatibility for BINARY as STRING
Thrift.serializedType = function (t) {
    return t == Thrift.Type.BINARY ? Thrift.Type.STRING : t;
};

// defaults taken from underscore.js
Thrift.defaults = function (target) {
    Array.prototype.slice.call(arguments, 1).forEach(function (source) {
        if (source) {
            for (var prop in source) {
                if (target[prop] === void 0) target[prop] = source[prop];
            }
        }
    });
    return target;
};

// extend taken from underscore.js
Thrift.extend = function (target) {
    Array.prototype.slice.call(arguments, 1).forEach(function (source) {
        if (source) {
            for (var prop in source) {
                target[prop] = source[prop];
            }
        }
    });
    return target;
};

//
// Method
//
Thrift.Method = function (config) {
    this.alias = config.alias;
    this.args = config.args;
    this.result = config.result;
};

Thrift.Method.define = function (config) {
    return new Thrift.Method(config);
};

Thrift.Method.noop = function () {
    // do nothing
};

Thrift.Method.sendException = function (output, seqid, structOrErr, structdef) {
    var config;

    if (!structdef) {
        if (structOrErr instanceof Thrift.TApplicationException) {
            structdef = Thrift.TApplicationException;
        } else if (structOrErr instanceof Thrift.TException) {
            structdef = Thrift.TException;
        } else {
            structdef = Thrift.TApplicationException;
            config = {};
            if (structOrErr) {
                if (structOrErr.message) config.message = structOrErr.message + '';
                if (structOrErr.code != null && Number.isFinite(config.code)) config.code = structOrErr.code;
            }
            structOrErr = new Thrift.TApplicationException(config);
        }
    }

    output.writeMessageBegin('', Thrift.MessageType.EXCEPTION, seqid);
    structdef.write(output, structOrErr);
    output.writeMessageEnd();
    output.flush();
};

Thrift.Method.prototype.sendRequest = function (output, seqid, struct, callback) {
    output.writeMessageBegin(this.alias, Thrift.MessageType.CALL, seqid);
    this.args.write(output, struct);
    output.writeMessageEnd();
    output.flush(function (err, response) {
        if (err) callback(err);else this.processResponse(response, callback);
    }.bind(this));
};

Thrift.Method.prototype.sendResponse = function (output, seqid, struct) {
    output.writeMessageBegin(this.alias, Thrift.MessageType.REPLY, seqid);
    this.result.write(output, struct);
    output.writeMessageEnd();
    output.flush();
};

Thrift.Method.prototype.processResponse = function (response, callback) {
    var header;
    var result;
    var err;
    var index;

    callback = callback || Thrift.Method.noop;

    var header = response.readMessageBegin();
    if (header.mtype == Thrift.MessageType.EXCEPTION) {
        err = Thrift.TApplicationException.read(response);
        response.readMessageEnd();
        callback(err);
        return;
    }

    if (header.mtype != Thrift.MessageType.REPLY) {
        err = Error('Client expects REPLY but received unsupported message type: ' + header.mtype);
        callback(err);
        return;
    }

    if (this.alias != header.fname) {
        err = Error('Unrecognized method name. Expected [' + me.alias + '] Received [' + header.fname + ']');
        callback(err);
        return;
    }

    result = this.result.read(response);
    response.readMessageEnd();

    // Exceptions are in fields
    for (index in this.result.fields) {
        if (index != 0 && result[this.result.fields[index].alias]) {
            err = result[this.result.fields[index].alias];
            callback(err);
            return;
        }
    }

    callback(null, result.returnValue);
};

//
// List
//
Thrift.List = {};

Thrift.List.define = function (name, type, def) {
    var ThriftList = function ThriftList() {
        return [];
    };

    // Name param is optional to allow anonymous lists
    if (typeof name != 'string') {
        def = type;
        type = name;
        name = 'anonymous';
    }

    ThriftList.alias = name;
    ThriftList.type = type;
    ThriftList.def = def;
    ThriftList.read = Thrift.List.read.bind(null, ThriftList);
    ThriftList.write = Thrift.List.write.bind(null, ThriftList);

    return ThriftList;
};

Thrift.List.read = function (listdef, input) {
    var list = new listdef();
    var header = input.readListBegin();
    Thrift.List.readEntries(listdef, list, input, header.size);
    input.readListEnd();
    return list;
};

Thrift.List.readEntries = function (listdef, list, input, size) {
    var i;
    for (i = 0; i < size; i++) {
        if (listdef.def != null) {
            list.push(listdef.def.read(input));
        } else {
            list.push(input.readType(listdef.type));
        }
    }
};

Thrift.List.write = function (listdef, output, list) {
    var val;
    var index;
    var size = list.length;

    output.writeListBegin(listdef.type, size);
    for (index = 0; index < size; index++) {
        val = list[index];
        if (listdef.def) {
            listdef.def.write(output, val);
        } else {
            output.writeType(listdef.type, val);
        }
    }
    output.writeListEnd();
};

//
// Set
//
Thrift.Set = {};

Thrift.Set.define = function (name, type, def) {
    var ThriftSet = function ThriftSet() {
        return [];
    };

    // Name param is optional to allow anonymous sets
    if (typeof name != 'string') {
        def = type;
        type = name;
        name = 'anonymous';
    }

    ThriftSet.alias = name;
    ThriftSet.type = type;
    ThriftSet.def = def;
    ThriftSet.read = Thrift.Set.read.bind(null, ThriftSet);
    ThriftSet.write = Thrift.Set.write.bind(null, ThriftSet);

    return ThriftSet;
};

Thrift.Set.read = function (setdef, input) {
    var set = new setdef();
    var header = input.readSetBegin();
    Thrift.Set.readEntries(setdef, set, input, header.size);
    input.readSetEnd();
    return set;
};

Thrift.Set.readEntries = function (setdef, set, input, size) {
    var i;
    for (i = 0; i < size; i++) {
        if (setdef.def != null) {
            set.push(setdef.def.read(input));
        } else {
            set.push(input.readType(setdef.type));
        }
    }
};

Thrift.Set.write = function (setdef, output, set) {
    var val;
    var index;
    var size = set.length;

    output.writeSetBegin(setdef.type, size);
    for (index = 0; index < size; index++) {
        val = set[index];
        if (setdef.def) {
            setdef.def.write(output, val);
        } else {
            output.writeType(setdef.type, val);
        }
    }
    output.writeSetEnd();
};

//
// Map
//
Thrift.Map = {};

Thrift.Map.define = function (name, ktype, vtype, vdef) {
    var ThriftMap = function ThriftMap() {
        return {};
    };

    // Name param is optional to allow anonymous maps
    if (typeof name != 'string') {
        vdef = vtype;
        vtype = ktype;
        ktype = name;
        name = 'anonymous';
    }

    ThriftMap.alias = name;
    ThriftMap.ktype = ktype;
    ThriftMap.vtype = vtype;
    ThriftMap.vdef = vdef;
    ThriftMap.read = Thrift.Map.read.bind(null, ThriftMap);
    ThriftMap.write = Thrift.Map.write.bind(null, ThriftMap);

    return ThriftMap;
};

Thrift.Map.read = function (mapdef, input) {
    var map = new mapdef();
    var header = input.readMapBegin();
    Thrift.Map.readEntries(mapdef, map, input, header.size);
    input.readMapEnd();
    return map;
};

Thrift.Map.readEntries = function (mapdef, map, input, size) {
    var i;
    var key;
    for (i = 0; i < size; i++) {
        key = input.readType(mapdef.ktype);
        if (mapdef.vdef != null) {
            map[key] = mapdef.vdef.read(input);
        } else {
            map[key] = input.readType(mapdef.vtype);
        }
    }
};

Thrift.Map.write = function (mapdef, output, map) {
    var keys = Object.keys(map);
    var key;
    var value;
    var index;
    var size = keys.length;

    output.writeMapBegin(mapdef.ktype, mapdef.vtype, size);
    for (index = 0; index < size; index++) {
        key = keys[index];
        output.writeType(mapdef.ktype, key);
        value = map[key];
        if (mapdef.vdef) {
            mapdef.vdef.write(output, value);
        } else {
            output.writeType(mapdef.vtype, value);
        }
    }
    output.writeMapEnd();
};

//
// Struct
//
Thrift.Struct = {};

Thrift.Struct.define = function (name, fields) {
    var defaultValues = {};
    var fid;
    var field;

    fields = fields || {};

    for (fid in fields) {
        field = fields[fid];
        defaultValues[field.alias] = field.defaultValue || null;
    }

    var ThriftStruct = function ThriftStruct(args) {
        // if an object is passed, use its fields as the defaults
        args = (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' ? args : {};
        return Thrift.defaults({}, args, defaultValues);
    };

    ThriftStruct.alias = name;
    ThriftStruct.fields = fields;
    ThriftStruct.defaultValues = defaultValues;
    ThriftStruct.read = Thrift.Struct.read.bind(null, ThriftStruct);
    ThriftStruct.write = Thrift.Struct.write.bind(null, ThriftStruct);
    ThriftStruct.values = Thrift.Struct.values.bind(null, ThriftStruct);
    ThriftStruct.setByDef = Thrift.Struct.setByDef.bind(null, ThriftStruct);

    return ThriftStruct;
};

Thrift.Struct.setByDef = function (structdef, struct, value) {
    var fid;
    var fields = structdef.fields;
    var field;
    var foundMatch = false;

    for (fid in fields) {
        field = fields[fid];
        if (field.def && value instanceof field.def) {
            struct[field.alias] = value;
            foundMatch = true;
            break;
        }
    }

    return foundMatch;
};

Thrift.Struct.values = function (structdef, struct) {
    var fields = structdef.fields;
    var keys = Object.keys(structdef.fields);
    var result = new Array(keys.length);
    var fid;
    var index;
    var i;

    for (i = 0; i < keys.length; i++) {
        fid = keys[i];
        index = fields[fid].index;
        if (index != null) result[index] = struct[fields[fid].alias];else result[i] = struct[fields[fid].alias];
    }

    return result;
};

Thrift.Struct.read = function (structdef, input) {
    var struct = new structdef();
    input.readStructBegin();
    Thrift.Struct.readFields(structdef, input, struct);
    input.readStructEnd();
    return struct;
};

Thrift.Struct.readFields = function (structdef, input, struct) {
    var header;
    var field;

    while (true) {
        header = input.readFieldBegin();

        if (header.ftype == Thrift.Type.STOP) return;

        field = structdef.fields[header.fid];
        if (field) {
            if (Thrift.equals(header.ftype, field.type)) {
                if (field.def) {
                    struct[field.alias] = field.def.read(input);
                } else {
                    struct[field.alias] = input.readType(field.type);
                }
            } else {
                input.skip(header.ftype);
            }
        } else {
            input.skip(header.ftype);
        }

        input.readFieldEnd();
    }
};

Thrift.Struct.write = function (structdef, output, struct) {
    var fid;
    var field;
    var value;
    output.writeStructBegin(structdef.alias);

    for (fid in structdef.fields) {
        field = structdef.fields[fid];
        value = struct[field.alias];
        if (value !== null && value !== undefined) {
            output.writeFieldBegin(field.alias, Thrift.serializedType(field.type), fid);
            if (field.def) {
                new field.def.write(output, value);
            } else {
                output.writeType(field.type, value);
            }
            output.writeFieldEnd();
        }
    }

    output.writeFieldStop();
    output.writeStructEnd();
};

//
// Exceptions
//
Thrift.Exception = {};

Thrift.Exception.define = function (name, fields) {
    var defaultValues = {};
    var fid;
    var field;

    fields = fields || {};

    for (fid in fields) {
        field = fields[fid];
        defaultValues[field.alias] = field.defaultValue || null;
    }

    var ThriftException = function ThriftException(messageOrConfig) {
        var config = {};
        if ((typeof messageOrConfig === 'undefined' ? 'undefined' : _typeof(messageOrConfig)) == 'object') {
            config = messageOrConfig;
        }
        Thrift.defaults(this, config, defaultValues);
        if (typeof messageOrConfig == 'string') {
            this.message = messageOrConfig;
        } else if (messageOrConfig instanceof Error) {
            this.message = messageOrConfig.message;
        }
    };

    ThriftException.alias = name;
    ThriftException.fields = fields;
    ThriftException.defaultValues = defaultValues;
    ThriftException.read = Thrift.Struct.read.bind(null, ThriftException);
    ThriftException.write = Thrift.Struct.write.bind(null, ThriftException);

    return ThriftException;
};

Thrift.TException = Thrift.Exception.define('TException', {
    1: { alias: 'message', type: Thrift.Type.STRING }
});

Thrift.TApplicationExceptionType = {
    'UNKNOWN': 0,
    'UNKNOWN_METHOD': 1,
    'INVALID_MESSAGE_TYPE': 2,
    'WRONG_METHOD_NAME': 3,
    'BAD_SEQUENCE_ID': 4,
    'MISSING_RESULT': 5,
    'INTERNAL_ERROR': 6,
    'PROTOCOL_ERROR': 7
};

Thrift.TApplicationException = Thrift.Exception.define('TApplicationException', {
    1: { alias: 'message', type: Thrift.Type.STRING },
    2: { alias: 'code', type: Thrift.Type.I32,
        defaultValue: Thrift.TApplicationExceptionType.INTERNAL_ERROR }
});

//
// Processor
//
Thrift.Processor = function () {
    this.methods = {};
};

Thrift.Processor.prototype.addMethod = function (mdef, fn) {
    this.methods[mdef.alias] = {
        def: mdef,
        fn: fn
    };
};

Thrift.Processor.prototype.process = function (input, output) {
    var method;
    var def;
    var result;
    var header;

    try {
        header = input.readMessageBegin();
        if (header.mtype != Thrift.MessageType.CALL) {
            throw new Thrift.TException('Server expects CALL but received unsupported message type: ' + header.mtype);
        }

        method = me.methods[header.fname];
        if (method == null) {
            throw new Thrift.TException('Unrecognized method name: ' + header.fname);
        }

        def = method.def;
        def.args.read(input);
        result = new def.result();

        method.fn.apply(null, def.args.values(args).concat([function (returnValue) {
            result.returnValue = returnValue;
            def.sendResponse(output, header.seqid, result);
        }, function (err) {
            //console.log(err);
            var seqid = header ? header.seqid : -1;
            if (result && def.result.setByDef(result, err)) {
                def.sendResponse(output, header.seqid, result);
            } else {
                Thrift.Method.sendException(output, seqid, err);
            }
        }]));
    } catch (err) {
        console.log(err);
        var seqid = header ? header.seqid : -1;
        if (result && def.result.setByDef(result, err)) {
            def.sendResponse(output, header.seqid, result);
        } else {
            Thrift.Method.sendException(output, seqid, err);
        }
    }
};

// Node exports
Object.keys(Thrift).forEach(function (key) {
    exports[key] = Thrift[key];
});
},{}],14:[function(require,module,exports){
(function (Buffer){(function (){
'use strict';

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var MemBuffer = require('./memBuffer');
var http = require('https');
var url = require('url');

function BinaryHttpTransport(serviceUrl, quiet) {
    var parsedUrl = url.parse(serviceUrl);
    this.hostname = parsedUrl.hostname;
    this.port = parsedUrl.port;
    this.path = parsedUrl.path;
    this.url = parsedUrl.href;
    this.quiet = quiet;
    this.input = new MemBuffer();
    this.additionalHeaders = {};
};

BinaryHttpTransport.prototype.addHeaders = function (headers) {
    Object.assign(this.additionalHeaders, headers);
};

BinaryHttpTransport.prototype.open = function () {};

BinaryHttpTransport.prototype.close = function () {};

BinaryHttpTransport.prototype.read = function (len) {
    throw Error('BinaryHttpTransport object does not support reads');
};

BinaryHttpTransport.prototype.write = function (bytes) {
    this.input.write(bytes);
};

BinaryHttpTransport.prototype.clear = function () {
    this.input.clear();
};

BinaryHttpTransport.prototype.flush = function (callback) {
    var me = this;
    var options = {
        protocol: 'https:',
        hostname: this.hostname,
        port: this.port,
        path: this.path,
        method: 'POST',
        headers: Object.assign({}, {
            'Content-Type': 'application/x-thrift',
            'Accept': 'application/x-thrift'
        }, me.additionalHeaders)
    };
    var req = http.request(options, function (res) {
        var chunkCount = 0;
        var chunks = [];
        if (res.statusCode != 200) {
            me.log('Error in Thrift HTTP response: ' + res.statusCode);
            if (callback) callback(res);
        }
        res.on('data', function (chunk) {
            chunks.push(chunk);
        });
        res.on('end', function () {
            var buffer = Buffer.concat(chunks);
            if (callback) callback(null, new MemBuffer(buffer));
        });
    });

    req.on('error', function (err) {
        me.log('Error making Thrift HTTP request: ' + err);
        if (callback) callback(err);
    });

    this.input.flush();
    req.write(this.input.buffer);
    req.end();
    this.clear();
};

BinaryHttpTransport.prototype.log = function (msg) {
    if (this.quiet) return;
    console.log(msg);
};

module.exports = BinaryHttpTransport;
}).call(this)}).call(this,require("buffer").Buffer)
},{"./memBuffer":15,"buffer":"buffer","https":17,"url":45}],15:[function(require,module,exports){
(function (Buffer){(function (){
'use strict';

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function MemBuffer(buffer) {
    this.queue = [];
    this.offset = 0;
    this.buffer = buffer;
}

MemBuffer.prototype.read = function (len) {
    if (this.offset + len > this.buffer.length) throw Error('MemBuffer overrun');
    // console.log('MemBuffer.read len: ' + len + ' buffer.length: ' + this.buffer.length + ' offset: ' + this.offset);
    var buffer = this.buffer.slice(this.offset, this.offset + len);
    this.offset += len;
    return buffer;
};

MemBuffer.prototype.write = function (buffer) {
    if (Buffer.isBuffer(buffer)) {
        this.queue.push(buffer);
    } else {
        throw Error('Unsupported type sent to MemBuffer.write. Accepts Buffer.');
    }
};

MemBuffer.prototype.clear = function () {
    this.queue = [];
    this.buffer = null;
    this.offset = 0;
};

MemBuffer.prototype.flush = function () {
    if (this.buffer) this.queue.unshift(this.buffer);
    this.buffer = Buffer.concat(this.queue);
    this.queue = [];
};

module.exports = MemBuffer;
}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":"buffer"}],16:[function(require,module,exports){
module.exports={
  "author": "Evernote",
  "name": "evernote",
  "description": "Evernote JavaScript SDK",
  "version": "2.0.5",
  "repository": {
    "url": "https://github.com/evernote/evernote-sdk-js"
  },
  "files": [
    "lib"
  ],
  "main": "lib/index",
  "scripts": {
    "lint": "eslint src",
    "build": "babel src -d lib",
    "clean": "rm -rf lib"
  },
  "devDependencies": {
    "babel-cli": "^6.11.4",
    "babel-eslint": "^6.1.2",
    "babel-plugin-transform-object-rest-spread": "^6.8.0",
    "babel-preset-es2015": "^6.13.2",
    "eslint": "^3.2.2",
    "eslint-config-evernote": "^2.0.2",
    "eslint-plugin-evernote": "^1.0.0"
  },
  "dependencies": {
    "oauth": "^0.9.14"
  }
}

},{}],17:[function(require,module,exports){
var http = require('http')
var url = require('url')

var https = module.exports

for (var key in http) {
  if (http.hasOwnProperty(key)) https[key] = http[key]
}

https.request = function (params, cb) {
  params = validateParams(params)
  return http.request.call(this, params, cb)
}

https.get = function (params, cb) {
  params = validateParams(params)
  return http.get.call(this, params, cb)
}

function validateParams (params) {
  if (typeof params === 'string') {
    params = url.parse(params)
  }
  if (!params.protocol) {
    params.protocol = 'https:'
  }
  if (params.protocol !== 'https:') {
    throw new Error('Protocol "' + params.protocol + '" not supported. Expected "https:"')
  }
  return params
}

},{"http":25,"url":45}],18:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],19:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],20:[function(require,module,exports){
(function (global){(function (){
/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],21:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],22:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],23:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":21,"./encode":22}],24:[function(require,module,exports){
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":"buffer"}],25:[function(require,module,exports){
(function (global){(function (){
var ClientRequest = require('./lib/request')
var response = require('./lib/response')
var extend = require('xtend')
var statusCodes = require('builtin-status-codes')
var url = require('url')

var http = exports

http.request = function (opts, cb) {
	if (typeof opts === 'string')
		opts = url.parse(opts)
	else
		opts = extend(opts)

	// Normally, the page is loaded from http or https, so not specifying a protocol
	// will result in a (valid) protocol-relative url. However, this won't work if
	// the protocol is something else, like 'file:'
	var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''

	var protocol = opts.protocol || defaultProtocol
	var host = opts.hostname || opts.host
	var port = opts.port
	var path = opts.path || '/'

	// Necessary for IPv6 addresses
	if (host && host.indexOf(':') !== -1)
		host = '[' + host + ']'

	// This may be a relative url. The browser should always be able to interpret it correctly.
	opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
	opts.method = (opts.method || 'GET').toUpperCase()
	opts.headers = opts.headers || {}

	// Also valid opts.auth, opts.mode

	var req = new ClientRequest(opts)
	if (cb)
		req.on('response', cb)
	return req
}

http.get = function get (opts, cb) {
	var req = http.request(opts, cb)
	req.end()
	return req
}

http.ClientRequest = ClientRequest
http.IncomingMessage = response.IncomingMessage

http.Agent = function () {}
http.Agent.defaultMaxSockets = 4

http.globalAgent = new http.Agent()

http.STATUS_CODES = statusCodes

http.METHODS = [
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'DELETE',
	'GET',
	'HEAD',
	'LOCK',
	'M-SEARCH',
	'MERGE',
	'MKACTIVITY',
	'MKCOL',
	'MOVE',
	'NOTIFY',
	'OPTIONS',
	'PATCH',
	'POST',
	'PROPFIND',
	'PROPPATCH',
	'PURGE',
	'PUT',
	'REPORT',
	'SEARCH',
	'SUBSCRIBE',
	'TRACE',
	'UNLOCK',
	'UNSUBSCRIBE'
]
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lib/request":27,"./lib/response":28,"builtin-status-codes":2,"url":45,"xtend":48}],26:[function(require,module,exports){
(function (global){(function (){
exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream)

exports.writableStream = isFunction(global.WritableStream)

exports.abortController = isFunction(global.AbortController)

// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr
function getXHR () {
	// Cache the xhr value
	if (xhr !== undefined) return xhr

	if (global.XMLHttpRequest) {
		xhr = new global.XMLHttpRequest()
		// If XDomainRequest is available (ie only, where xhr might not work
		// cross domain), use the page location. Otherwise use example.com
		// Note: this doesn't actually make an http request.
		try {
			xhr.open('GET', global.XDomainRequest ? '/' : 'https://example.com')
		} catch(e) {
			xhr = null
		}
	} else {
		// Service workers don't have XHR
		xhr = null
	}
	return xhr
}

function checkTypeSupport (type) {
	var xhr = getXHR()
	if (!xhr) return false
	try {
		xhr.responseType = type
		return xhr.responseType === type
	} catch (e) {}
	return false
}

// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer = exports.fetch || checkTypeSupport('arraybuffer')

// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream = !exports.fetch && checkTypeSupport('ms-stream')
exports.mozchunkedarraybuffer = !exports.fetch && checkTypeSupport('moz-chunked-arraybuffer')

// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false)

function isFunction (value) {
	return typeof value === 'function'
}

xhr = null // Help gc

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],27:[function(require,module,exports){
(function (process,global,Buffer){(function (){
var capability = require('./capability')
var inherits = require('inherits')
var response = require('./response')
var stream = require('readable-stream')

var IncomingMessage = response.IncomingMessage
var rStates = response.readyStates

function decideMode (preferBinary, useFetch) {
	if (capability.fetch && useFetch) {
		return 'fetch'
	} else if (capability.mozchunkedarraybuffer) {
		return 'moz-chunked-arraybuffer'
	} else if (capability.msstream) {
		return 'ms-stream'
	} else if (capability.arraybuffer && preferBinary) {
		return 'arraybuffer'
	} else {
		return 'text'
	}
}

var ClientRequest = module.exports = function (opts) {
	var self = this
	stream.Writable.call(self)

	self._opts = opts
	self._body = []
	self._headers = {}
	if (opts.auth)
		self.setHeader('Authorization', 'Basic ' + Buffer.from(opts.auth).toString('base64'))
	Object.keys(opts.headers).forEach(function (name) {
		self.setHeader(name, opts.headers[name])
	})

	var preferBinary
	var useFetch = true
	if (opts.mode === 'disable-fetch' || ('requestTimeout' in opts && !capability.abortController)) {
		// If the use of XHR should be preferred. Not typically needed.
		useFetch = false
		preferBinary = true
	} else if (opts.mode === 'prefer-streaming') {
		// If streaming is a high priority but binary compatibility and
		// the accuracy of the 'content-type' header aren't
		preferBinary = false
	} else if (opts.mode === 'allow-wrong-content-type') {
		// If streaming is more important than preserving the 'content-type' header
		preferBinary = !capability.overrideMimeType
	} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
		// Use binary if text streaming may corrupt data or the content-type header, or for speed
		preferBinary = true
	} else {
		throw new Error('Invalid value for opts.mode')
	}
	self._mode = decideMode(preferBinary, useFetch)
	self._fetchTimer = null
	self._socketTimeout = null
	self._socketTimer = null

	self.on('finish', function () {
		self._onFinish()
	})
}

inherits(ClientRequest, stream.Writable)

ClientRequest.prototype.setHeader = function (name, value) {
	var self = this
	var lowerName = name.toLowerCase()
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1)
		return

	self._headers[lowerName] = {
		name: name,
		value: value
	}
}

ClientRequest.prototype.getHeader = function (name) {
	var header = this._headers[name.toLowerCase()]
	if (header)
		return header.value
	return null
}

ClientRequest.prototype.removeHeader = function (name) {
	var self = this
	delete self._headers[name.toLowerCase()]
}

ClientRequest.prototype._onFinish = function () {
	var self = this

	if (self._destroyed)
		return
	var opts = self._opts

	if ('timeout' in opts && opts.timeout !== 0) {
		self.setTimeout(opts.timeout)
	}

	var headersObj = self._headers
	var body = null
	if (opts.method !== 'GET' && opts.method !== 'HEAD') {
        body = new Blob(self._body, {
            type: (headersObj['content-type'] || {}).value || ''
        });
    }

	// create flattened list of headers
	var headersList = []
	Object.keys(headersObj).forEach(function (keyName) {
		var name = headersObj[keyName].name
		var value = headersObj[keyName].value
		if (Array.isArray(value)) {
			value.forEach(function (v) {
				headersList.push([name, v])
			})
		} else {
			headersList.push([name, value])
		}
	})

	if (self._mode === 'fetch') {
		var signal = null
		if (capability.abortController) {
			var controller = new AbortController()
			signal = controller.signal
			self._fetchAbortController = controller

			if ('requestTimeout' in opts && opts.requestTimeout !== 0) {
				self._fetchTimer = global.setTimeout(function () {
					self.emit('requestTimeout')
					if (self._fetchAbortController)
						self._fetchAbortController.abort()
				}, opts.requestTimeout)
			}
		}

		global.fetch(self._opts.url, {
			method: self._opts.method,
			headers: headersList,
			body: body || undefined,
			mode: 'cors',
			credentials: opts.withCredentials ? 'include' : 'same-origin',
			signal: signal
		}).then(function (response) {
			self._fetchResponse = response
			self._resetTimers(false)
			self._connect()
		}, function (reason) {
			self._resetTimers(true)
			if (!self._destroyed)
				self.emit('error', reason)
		})
	} else {
		var xhr = self._xhr = new global.XMLHttpRequest()
		try {
			xhr.open(self._opts.method, self._opts.url, true)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}

		// Can't set responseType on really old browsers
		if ('responseType' in xhr)
			xhr.responseType = self._mode

		if ('withCredentials' in xhr)
			xhr.withCredentials = !!opts.withCredentials

		if (self._mode === 'text' && 'overrideMimeType' in xhr)
			xhr.overrideMimeType('text/plain; charset=x-user-defined')

		if ('requestTimeout' in opts) {
			xhr.timeout = opts.requestTimeout
			xhr.ontimeout = function () {
				self.emit('requestTimeout')
			}
		}

		headersList.forEach(function (header) {
			xhr.setRequestHeader(header[0], header[1])
		})

		self._response = null
		xhr.onreadystatechange = function () {
			switch (xhr.readyState) {
				case rStates.LOADING:
				case rStates.DONE:
					self._onXHRProgress()
					break
			}
		}
		// Necessary for streaming in Firefox, since xhr.response is ONLY defined
		// in onprogress, not in onreadystatechange with xhr.readyState = 3
		if (self._mode === 'moz-chunked-arraybuffer') {
			xhr.onprogress = function () {
				self._onXHRProgress()
			}
		}

		xhr.onerror = function () {
			if (self._destroyed)
				return
			self._resetTimers(true)
			self.emit('error', new Error('XHR error'))
		}

		try {
			xhr.send(body)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}
	}
}

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid (xhr) {
	try {
		var status = xhr.status
		return (status !== null && status !== 0)
	} catch (e) {
		return false
	}
}

ClientRequest.prototype._onXHRProgress = function () {
	var self = this

	self._resetTimers(false)

	if (!statusValid(self._xhr) || self._destroyed)
		return

	if (!self._response)
		self._connect()

	self._response._onXHRProgress(self._resetTimers.bind(self))
}

ClientRequest.prototype._connect = function () {
	var self = this

	if (self._destroyed)
		return

	self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode, self._resetTimers.bind(self))
	self._response.on('error', function(err) {
		self.emit('error', err)
	})

	self.emit('response', self._response)
}

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	var self = this

	self._body.push(chunk)
	cb()
}

ClientRequest.prototype._resetTimers = function (done) {
	var self = this

	global.clearTimeout(self._socketTimer)
	self._socketTimer = null

	if (done) {
		global.clearTimeout(self._fetchTimer)
		self._fetchTimer = null
	} else if (self._socketTimeout) {
		self._socketTimer = global.setTimeout(function () {
			self.emit('timeout')
		}, self._socketTimeout)
	}
}

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function (err) {
	var self = this
	self._destroyed = true
	self._resetTimers(true)
	if (self._response)
		self._response._destroyed = true
	if (self._xhr)
		self._xhr.abort()
	else if (self._fetchAbortController)
		self._fetchAbortController.abort()

	if (err)
		self.emit('error', err)
}

ClientRequest.prototype.end = function (data, encoding, cb) {
	var self = this
	if (typeof data === 'function') {
		cb = data
		data = undefined
	}

	stream.Writable.prototype.end.call(self, data, encoding, cb)
}

ClientRequest.prototype.setTimeout = function (timeout, cb) {
	var self = this

	if (cb)
		self.once('timeout', cb)

	self._socketTimeout = timeout
	self._resetTimers(false)
}

ClientRequest.prototype.flushHeaders = function () {}
ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'via'
]

}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./capability":26,"./response":28,"_process":19,"buffer":"buffer","inherits":18,"readable-stream":43}],28:[function(require,module,exports){
(function (process,global,Buffer){(function (){
var capability = require('./capability')
var inherits = require('inherits')
var stream = require('readable-stream')

var rStates = exports.readyStates = {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
}

var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode, resetTimers) {
	var self = this
	stream.Readable.call(self)

	self._mode = mode
	self.headers = {}
	self.rawHeaders = []
	self.trailers = {}
	self.rawTrailers = []

	// Fake the 'close' event, but only once 'end' fires
	self.on('end', function () {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		process.nextTick(function () {
			self.emit('close')
		})
	})

	if (mode === 'fetch') {
		self._fetchResponse = response

		self.url = response.url
		self.statusCode = response.status
		self.statusMessage = response.statusText
		
		response.headers.forEach(function (header, key){
			self.headers[key.toLowerCase()] = header
			self.rawHeaders.push(key, header)
		})

		if (capability.writableStream) {
			var writable = new WritableStream({
				write: function (chunk) {
					resetTimers(false)
					return new Promise(function (resolve, reject) {
						if (self._destroyed) {
							reject()
						} else if(self.push(Buffer.from(chunk))) {
							resolve()
						} else {
							self._resumeFetch = resolve
						}
					})
				},
				close: function () {
					resetTimers(true)
					if (!self._destroyed)
						self.push(null)
				},
				abort: function (err) {
					resetTimers(true)
					if (!self._destroyed)
						self.emit('error', err)
				}
			})

			try {
				response.body.pipeTo(writable).catch(function (err) {
					resetTimers(true)
					if (!self._destroyed)
						self.emit('error', err)
				})
				return
			} catch (e) {} // pipeTo method isn't defined. Can't find a better way to feature test this
		}
		// fallback for when writableStream or pipeTo aren't available
		var reader = response.body.getReader()
		function read () {
			reader.read().then(function (result) {
				if (self._destroyed)
					return
				resetTimers(result.done)
				if (result.done) {
					self.push(null)
					return
				}
				self.push(Buffer.from(result.value))
				read()
			}).catch(function (err) {
				resetTimers(true)
				if (!self._destroyed)
					self.emit('error', err)
			})
		}
		read()
	} else {
		self._xhr = xhr
		self._pos = 0

		self.url = xhr.responseURL
		self.statusCode = xhr.status
		self.statusMessage = xhr.statusText
		var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
		headers.forEach(function (header) {
			var matches = header.match(/^([^:]+):\s*(.*)/)
			if (matches) {
				var key = matches[1].toLowerCase()
				if (key === 'set-cookie') {
					if (self.headers[key] === undefined) {
						self.headers[key] = []
					}
					self.headers[key].push(matches[2])
				} else if (self.headers[key] !== undefined) {
					self.headers[key] += ', ' + matches[2]
				} else {
					self.headers[key] = matches[2]
				}
				self.rawHeaders.push(matches[1], matches[2])
			}
		})

		self._charset = 'x-user-defined'
		if (!capability.overrideMimeType) {
			var mimeType = self.rawHeaders['mime-type']
			if (mimeType) {
				var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/)
				if (charsetMatch) {
					self._charset = charsetMatch[1].toLowerCase()
				}
			}
			if (!self._charset)
				self._charset = 'utf-8' // best guess
		}
	}
}

inherits(IncomingMessage, stream.Readable)

IncomingMessage.prototype._read = function () {
	var self = this

	var resolve = self._resumeFetch
	if (resolve) {
		self._resumeFetch = null
		resolve()
	}
}

IncomingMessage.prototype._onXHRProgress = function (resetTimers) {
	var self = this

	var xhr = self._xhr

	var response = null
	switch (self._mode) {
		case 'text':
			response = xhr.responseText
			if (response.length > self._pos) {
				var newData = response.substr(self._pos)
				if (self._charset === 'x-user-defined') {
					var buffer = Buffer.alloc(newData.length)
					for (var i = 0; i < newData.length; i++)
						buffer[i] = newData.charCodeAt(i) & 0xff

					self.push(buffer)
				} else {
					self.push(newData, self._charset)
				}
				self._pos = response.length
			}
			break
		case 'arraybuffer':
			if (xhr.readyState !== rStates.DONE || !xhr.response)
				break
			response = xhr.response
			self.push(Buffer.from(new Uint8Array(response)))
			break
		case 'moz-chunked-arraybuffer': // take whole
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING || !response)
				break
			self.push(Buffer.from(new Uint8Array(response)))
			break
		case 'ms-stream':
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING)
				break
			var reader = new global.MSStreamReader()
			reader.onprogress = function () {
				if (reader.result.byteLength > self._pos) {
					self.push(Buffer.from(new Uint8Array(reader.result.slice(self._pos))))
					self._pos = reader.result.byteLength
				}
			}
			reader.onload = function () {
				resetTimers(true)
				self.push(null)
			}
			// reader.onerror = ??? // TODO: this
			reader.readAsArrayBuffer(response)
			break
	}

	// The ms-stream case handles end separately in reader.onload()
	if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
		resetTimers(true)
		self.push(null)
	}
}

}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"./capability":26,"_process":19,"buffer":"buffer","inherits":18,"readable-stream":43}],29:[function(require,module,exports){
'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;

},{}],30:[function(require,module,exports){
(function (process){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';
/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = require('./_stream_readable');

var Writable = require('./_stream_writable');

require('inherits')(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});
}).call(this)}).call(this,require('_process'))
},{"./_stream_readable":32,"./_stream_writable":34,"_process":19,"inherits":18}],31:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

require('inherits')(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":33,"inherits":18}],32:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = require('events').EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = require('util');

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = require('./internal/streams/buffer_list');

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

require('inherits')(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = require('./internal/streams/from');
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":29,"./_stream_duplex":30,"./internal/streams/async_iterator":35,"./internal/streams/buffer_list":36,"./internal/streams/destroy":37,"./internal/streams/from":39,"./internal/streams/state":41,"./internal/streams/stream":42,"_process":19,"buffer":"buffer","events":3,"inherits":18,"string_decoder/":44,"util":1}],33:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';

module.exports = Transform;

var _require$codes = require('../errors').codes,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = require('./_stream_duplex');

require('inherits')(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}
},{"../errors":29,"./_stream_duplex":30,"inherits":18}],34:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';

module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/

var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

require('inherits')(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":29,"./_stream_duplex":30,"./internal/streams/destroy":37,"./internal/streams/state":41,"./internal/streams/stream":42,"_process":19,"buffer":"buffer","inherits":18,"util-deprecate":47}],35:[function(require,module,exports){
(function (process){(function (){
'use strict';

var _Object$setPrototypeO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var finished = require('./end-of-stream');

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;
}).call(this)}).call(this,require('_process'))
},{"./end-of-stream":38,"_process":19}],36:[function(require,module,exports){
'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('buffer'),
    Buffer = _require.Buffer;

var _require2 = require('util'),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();
},{"buffer":"buffer","util":1}],37:[function(require,module,exports){
(function (process){(function (){
'use strict'; // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};
}).call(this)}).call(this,require('_process'))
},{"_process":19}],38:[function(require,module,exports){
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;
},{"../../../errors":29}],39:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],40:[function(require,module,exports){
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = require('../../../errors').codes,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = require('./end-of-stream');
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

module.exports = pipeline;
},{"../../../errors":29,"./end-of-stream":38}],41:[function(require,module,exports){
'use strict';

var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};
},{"../../../errors":29}],42:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":3}],43:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');
exports.finished = require('./lib/internal/streams/end-of-stream.js');
exports.pipeline = require('./lib/internal/streams/pipeline.js');

},{"./lib/_stream_duplex.js":30,"./lib/_stream_passthrough.js":31,"./lib/_stream_readable.js":32,"./lib/_stream_transform.js":33,"./lib/_stream_writable.js":34,"./lib/internal/streams/end-of-stream.js":38,"./lib/internal/streams/pipeline.js":40}],44:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":24}],45:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var punycode = require('punycode');
var util = require('./util');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

},{"./util":46,"punycode":20,"querystring":23}],46:[function(require,module,exports){
'use strict';

module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};

},{}],47:[function(require,module,exports){
(function (global){(function (){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],48:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],49:[function(require,module,exports){
module.exports=require("evernote")

},{"evernote":5}]},{},[49])(49)
});
