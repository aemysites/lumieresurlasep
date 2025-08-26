/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the cards block (must be .block-posts__items)
  const itemsParent = element.querySelector('.block-posts__items');
  if (!itemsParent) return;

  // Get all direct children: each card is either <article> or .block-posts__cta
  const cards = Array.from(itemsParent.children)
    .filter(child => child.tagName === 'ARTICLE' || child.classList.contains('block-posts__cta'));
  if (cards.length === 0) return;

  // Header row: must match example exactly
  const rows = [['Cards (cards1)']];

  cards.forEach(card => {
    // First cell: image (first <img> descendant)
    let img = card.querySelector('img');
    // Second cell: all text content (for articles: .post-content, for CTA: all except img)
    let textContent;
    if (card.tagName === 'ARTICLE') {
      // Grab .post-content node - reference it directly, not cloned
      textContent = card.querySelector('.post-content');
      // If not found, fallback to all text in card
      if (!textContent) textContent = document.createTextNode(card.textContent.trim());
    } else {
      // For CTA: reference existing card but remove any images
      // We want to preserve semantic HTML and all original text
      // Remove image(s) from reference
      // To avoid removing from DOM, we build an array of child nodes excluding <img>
      textContent = Array.from(card.childNodes).filter(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IMG') return false;
        return true;
      });
      // If array only has one item, use it directly
      if (textContent.length === 1) textContent = textContent[0];
    }
    // Add row (do not create empty cells)
    rows.push([img || '', textContent || '']);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  itemsParent.replaceWith(table);
}
