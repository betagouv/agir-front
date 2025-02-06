import { marked } from 'marked';

const renderer = new marked.Renderer();

renderer.strong = objet => {
  return `<span class="text--bold">${objet.text}</span>`;
};

marked.setOptions({
  renderer: renderer,
});

export default marked;
