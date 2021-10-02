/** HTML DOM parser.
 *  Credit: Jason Miller
 *  Source: https://github.com/developit/htmlParser/blob/master/src/htmlParser.js
 *  License: MIT
 *  @class
 */
define((function () {
    /** @exports exports as htmlParser# */
    var exports = {}, util = {}, splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim, domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
    util.extend = function (a, b) {
        for (var x in b) {
            if (b.hasOwnProperty(x)) {
                a[x] = b[x];
            }
        }
        return a;
    };
    util.inherit = function (a, b) {
        var p = a.prototype;
        function F() { }
        F.prototype = b.prototype;
        a.prototype = new F();
        util.extend(a.prototype, p);
        a.prototype.constructor = a;
    };
    util.selfClosingTags = { img: 1, br: 1, hr: 1, meta: 1, link: 1, base: 1, input: 1 };
    util.getElementsByTagName = function (el, tag) {
        var els = [], c = 0, i, n;
        if (!tag) {
            tag = '*';
        }
        tag = tag.toLowerCase();
        if (el.childNodes) {
            for (i = 0; i < el.childNodes.length; i++) {
                n = el.childNodes[i];
                if (n.nodeType === 1 && (tag === '*' || n.nodeName === tag)) {
                    els[c++] = n;
                }
                Array.prototype.splice.apply(els, [els.length, 0].concat(util.getElementsByTagName(n, tag)));
                c = els.length;
            }
        }
        return els;
    };
    util.splitAttrs = function (str) {
        var obj = {}, token;
        if (str) {
            splitAttrsTokenizer.lastIndex = 0;
            str = ' ' + (str || '') + ' ';
            while ((token = splitAttrsTokenizer.exec(str))) {
                obj[token[1]] = token[3];
            }
        }
        return obj;
    };
    // this section edited for the PopCLip extension (since we don't have 'document')
    // util.ta = document.createElement('textarea');
    // util.encodeEntities = function (str) {
    //     util.ta.value = str || '';
    //     return util.ta.innerHTML;
    // };
    util.decodeEntities = function (str) {
        //don't decode the entities....
        //util.ta.innerHTML = str || '';
        //return util.ta.value;
        return str;
    };
    util.htmlToText = function (html) {
        html = html.replace(/<\/?[a-z].*?>/gim, '');
        return util.decodeEntities(html);
    };
    function HTMLElement() {
        this.childNodes = [];
    }
    util.extend(HTMLElement.prototype, {
        nodeType: 1,
        textContent: '',
        getElementsByTagName: function (tag) {
            return util.getElementsByTagName(this, tag);
        },
        getAttribute: function (a) {
            if (this.attributes.hasOwnProperty(a)) {
                return this.attributes[a];
            }
        },
        setAttribute: function (name, value) {
            var lcName = (name + '').toLowerCase();
            this.attributes[name] = value + '';
            if (lcName === 'id' || lcName === 'name') {
                this[lcName] = value;
            }
            if (lcName === 'class') {
                this.className = value;
            }
        },
        getElementById: function (id) {
            var all = this.getElementsByTagName('*'), i;
            for (i = all.length; i--;) {
                if (all[i].id === id) {
                    return all[i];
                }
            }
        },
        appendChild: function (child) {
            if (child.parentNode) {
                child.parentNode.removeChild(child);
            }
            this.childNodes.push(child);
        },
        insertBefore: function (child, sibling) {
            if (child.parentNode) {
                child.parentNode.removeChild(child);
            }
            for (var i = 0; i < this.childNodes.length; i++) {
                if (this.childNodes[i] === sibling) {
                    break;
                }
            }
            this.childNodes.splice(i, 0, child);
        },
        removeChild: function (child) {
            for (var i = this.childNodes.length; i--;) {
                if (this.childNodes[i] === child) {
                    this.childNodes.splice(i, 1);
                    break;
                }
            }
        }
    });
    exports.HTMLElement = HTMLElement;
    function Node() { }
    util.extend(Node.prototype, {
        toString: function () { return this.textContent; }
    });
    function Document() {
        HTMLElement.call(this);
    }
    util.inherit(Document, HTMLElement);
    util.extend(Document.prototype, {
        nodeType: 9,
        nodeName: '#document'
    });
    exports.Document = Document;
    function TextNode() { }
    util.inherit(TextNode, Node);
    util.extend(TextNode.prototype, {
        nodeType: 3,
        nodeName: '#text'
    });
    exports.TextNode = TextNode;
    function CommentNode() { }
    util.inherit(CommentNode, Node);
    util.extend(CommentNode.prototype, {
        nodeType: 8,
        nodeName: '#comment'
    });
    exports.CommentNode = CommentNode;
    function CDATASectionNode() { }
    util.inherit(CDATASectionNode, Node);
    util.extend(CDATASectionNode.prototype, {
        nodeType: 4,
        nodeName: '#cdata-section'
    });
    exports.CDATASectionNode = CDATASectionNode;
    util.blockConstructors = {
        '<!--': CommentNode,
        '<![CDATA[': CDATASectionNode
    };
    /** Parse a string of HTML into an HTML DOM.
     *  @param {String} str		A string containing HTML
     *  @returns {Document}		A Node, the type corresponding to the type of the root HTML node.
     */
    exports.parse = function (str) {
        var tags, doc, parent, prev, token, text, i, bStart, bText, bEnd, BlockConstructor, commitTextNode, tag;
        tags = [];
        domParserTokenizer.lastIndex = 0;
        parent = doc = new Document();
        commitTextNode = function () {
            // note: this is moved out of the loop but still uses its scope!!
            if (parent && tags.length > 0) {
                prev = tags[tags.length - 1];
                i = (prev.documentPosition.closeTag || prev.documentPosition.openTag).end;
                if (prev.parentNode === parent && i && i < tag.documentPosition.openTag.start) {
                    text = str.substring(i, tag.documentPosition.openTag.start);
                    if (text) {
                        text = util.decodeEntities(text);
                        parent.childNodes.push(util.extend(new TextNode(), {
                            textContent: text,
                            nodeValue: text,
                            parentNode: parent
                        }));
                    }
                }
            }
        };
        while ((token = domParserTokenizer.exec(str))) {
            bStart = token[5] || token[8];
            bText = token[6] || token[9];
            bEnd = token[7] || token[10];
            if (bStart === '<!--' || bStart === '<![CDATA[') {
                i = domParserTokenizer.lastIndex - token[0].length;
                BlockConstructor = util.blockConstructors[bStart];
                if (BlockConstructor) {
                    tag = util.extend(new BlockConstructor(), {
                        textContent: bText,
                        nodeValue: bText,
                        parentNode: parent,
                        documentPosition: {
                            openTag: {
                                start: i,
                                end: i + bStart.length
                            },
                            closeTag: {
                                start: domParserTokenizer.lastIndex - bEnd.length,
                                end: domParserTokenizer.lastIndex
                            }
                        }
                    });
                    commitTextNode();
                    tags.push(tag);
                    tag.parentNode.childNodes.push(tag);
                }
            }
            else if (token[1] !== '/') {
                tag = util.extend(new HTMLElement(), {
                    nodeName: (token[2] + '').toLowerCase(),
                    attributes: util.splitAttrs(token[3]),
                    parentNode: parent,
                    documentPosition: {
                        openTag: {
                            start: domParserTokenizer.lastIndex - token[0].length,
                            end: domParserTokenizer.lastIndex
                        }
                    }
                });
                tag.className = tag.attributes['class'];
                tag.id = tag.attributes.id;
                tag.name = tag.attributes.name;
                commitTextNode();
                tags.push(tag);
                tag.parentNode.childNodes.push(tag);
                if ((token[4] && token[4].indexOf('/') > -1) || util.selfClosingTags.hasOwnProperty(tag.nodeName)) {
                    tag.documentPosition.closeTag = tag.documentPosition.openTag;
                    tag.isSelfClosingTag = true;
                    tag.innerHTML = '';
                    tag.outerHTML = str.substring(tag.documentPosition.openTag.start, tag.documentPosition.closeTag.end);
                }
                else {
                    parent = tag;
                }
            }
            else {
                // Close parent node if end-tag matches
                if ((token[2] + '').toLowerCase() === parent.nodeName) {
                    tag = parent;
                    parent = tag.parentNode;
                    delete tag.isSelfClosingTag;
                    tag.documentPosition.closeTag = {
                        start: domParserTokenizer.lastIndex - token[0].length,
                        end: domParserTokenizer.lastIndex
                    };
                    tag.innerHTML = str.substring(tag.documentPosition.openTag.end, tag.documentPosition.closeTag.start);
                    tag.outerHTML = str.substring(tag.documentPosition.openTag.start, tag.documentPosition.closeTag.end);
                    tag.textContent = util.htmlToText(tag.innerHTML);
                }
                // account for abuse of self-closing tags when an end-tag is also provided:
                else if ((token[2] + '').toLowerCase() === tags[tags.length - 1].nodeName && tags[tags.length - 1].isSelfClosingTag === true) {
                    tag = tags[tags.length - 1];
                    console.warn('HTML Error: discarding dangling <\/' + token[2] + '> tag. Already closed via: ' + tag.outerHTML);
                    delete tag.isSelfClosing;
                    tag.documentPosition.closeTag = {
                        start: domParserTokenizer.lastIndex - token[0].length,
                        end: domParserTokenizer.lastIndex
                    };
                }
                else {
                    console.warn('tag mismatch: "' + token[2] + '" vs "' + tag.nodeName + '"', tag);
                }
            }
        }
        doc.documentElement = doc.getElementsByTagName('html')[0];
        doc.body = doc.getElementsByTagName('body')[0];
        return doc;
    };
    return exports;
}()));
