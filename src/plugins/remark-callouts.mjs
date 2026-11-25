/**
 * Transforma blockquote-urile de forma `> [!TIP]` / `> [!NOTE]` in blocurile din designul Figma:
 *  - [!TIP]  -> "Pro Tip" (bara laterala)
 *  - [!NOTE] -> "Key Concepts" (cutie cu margine)
 * Titlul se alege dupa limba din calea fisierului (`.../ro/...` sau `.../en/...`).
 */
const TITLES = {
  ro: { tip: 'Sfat', note: 'Concepte cheie' },
  en: { tip: 'Pro Tip', note: 'Key Concepts' },
};

function visit(node, fn) {
  fn(node);
  if (Array.isArray(node.children)) node.children.forEach((child) => visit(child, fn));
}

export default function remarkCallouts() {
  return (tree, file) => {
    const lang = /[\\/]en[\\/]/.test(file.path ?? '') ? 'en' : 'ro';

    visit(tree, (node) => {
      if (node.type !== 'blockquote') return;
      const paragraph = node.children?.[0];
      const text = paragraph?.type === 'paragraph' ? paragraph.children?.[0] : undefined;
      if (text?.type !== 'text') return;

      const match = text.value.match(/^\[!(TIP|NOTE)\]\s*/);
      if (!match) return;

      const kind = match[1].toLowerCase();
      text.value = text.value.slice(match[0].length);
      if (text.value === '' && paragraph.children.length === 1) {
        node.children.shift();
      } else if (text.value === '') {
        paragraph.children.shift();
      }

      node.children.unshift({
        type: 'paragraph',
        data: { hProperties: { className: ['callout-title'] } },
        children: [{ type: 'text', value: TITLES[lang][kind] }],
      });
      node.data = {
        hName: 'aside',
        hProperties: { className: ['callout', `callout-${kind}`] },
      };
    });
  };
}
