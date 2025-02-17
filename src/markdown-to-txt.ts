import { marked, Renderer } from "marked";
import { escape, unescape } from "lodash";

const block = (text: string) => text + "\n\n";
const escapeBlock = (text: string) => escape(text) + "\n\n";
const line = (text: string) => text + "\n";
const inline = (text: string) => text;
const newline = () => "\n";
const empty = () => "";

const TxtRenderer: Renderer = {
	// Block elements
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
	// Inline elements
	strong: inline,
	em: inline,
	codespan: inline,
	br: newline,
	del: inline,
	link: (_0, _1, text) => text,
	image: (_0, _1, text) => text,
	text: inline,
	// etc.
	options: {},
};

/**
 * Converts markdown to plaintext using the marked Markdown library.
 * Accepts [MarkedOptions](https://marked.js.org/using_advanced#options) as
 * the second argument.
 *
 * NOTE: The output of markdownToTxt is NOT sanitized. The output may contain
 * valid HTML, JavaScript, etc. Be sure to sanitize if the output is intended
 * for web use.
 *
 * @param markdown the markdown text to txtify
 * @param options  the marked options
 * @returns the unmarked text
 */
export default function markdownToTxt(
	markdown: string,
	options?: marked.MarkedOptions
): string {
	const unmarked = marked.parse(markdown, {
		...options,
		renderer: TxtRenderer,
	});
	const unescaped = unescape(unmarked);
	const trimmed = unescaped.trim();
	return trimmed;
}
