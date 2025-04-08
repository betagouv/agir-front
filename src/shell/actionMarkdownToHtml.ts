import { marked } from 'marked';

const renderer = new marked.Renderer();

renderer.strong = objet => {
  const text = marked.parseInline(objet.text);
  return `<span class="text--bold">${text}</span>`;
};

renderer.heading = ({ tokens, depth }) => {
  const text = marked.parseInline(tokens.map(token => token.raw).join(''));
  if (depth === 1) {
    return `<h2>${text}</h2>`;
  }
  return `<h${depth}>${text}</h${depth}>`;
};

renderer.link = ({ href, title, text }) => {
  const parsedText = marked.parseInline(text);
  return `<a href="${href}" title="${title}" target="_blank" rel="noopener noreferrer">${parsedText}</a>`;
};

marked.setOptions({
  renderer: renderer,
});

export default marked;
