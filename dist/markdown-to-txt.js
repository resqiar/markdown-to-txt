"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const marked_1 = require("marked");
const lodash_1 = require("lodash");
const block = (text) => text + "\n\n";
const escapeBlock = (text) => (0, lodash_1.escape)(text) + "\n\n";
const line = (text) => text + "\n";
const inline = (text) => text;
const newline = () => "\n";
const empty = () => "";
const TxtRenderer = {
    code: escapeBlock,
    blockquote: block,
    html: empty,
    heading: block,
    hr: newline,
    list: (text) => block(text.trim()),
    listitem: line,
    checkbox: empty,
    paragraph: block,
    table: (header, body) => line(header + body),
    tablerow: (text) => line(text.trim()),
    tablecell: (text) => text + " ",
    strong: inline,
    em: inline,
    codespan: inline,
    br: newline,
    del: inline,
    link: (_0, _1, text) => text,
    image: (_0, _1, text) => text,
    text: inline,
    options: {},
};
function markdownToTxt(markdown, options) {
    const unmarked = marked_1.marked.parse(markdown, {
        ...options,
        renderer: TxtRenderer,
    });
    const unescaped = (0, lodash_1.unescape)(unmarked);
    const trimmed = unescaped.trim();
    return trimmed;
}
exports.default = markdownToTxt;
