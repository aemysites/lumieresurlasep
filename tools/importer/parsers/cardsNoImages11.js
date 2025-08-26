/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const cells = [['Cards']];

  // Find the items container
  const itemsContainer = element.querySelector('.block-posts__items');
  if (itemsContainer) {
    // Find all card elements
    const cardEls = itemsContainer.querySelectorAll('.block-posts__cta');
    cardEls.forEach(cardEl => {
      // Gather card content: title, description, CTA (if present)
      const rowContent = [];
      // Title (may contain <span> for color)
      const title = cardEl.querySelector('h3');
      if (title) rowContent.push(title);
      // Description
      const desc = cardEl.querySelector('p');
      if (desc) rowContent.push(desc);
      // CTA link
      const cta = cardEl.querySelector('a');
      if (cta) rowContent.push(cta);
      // All sub-elements are referenced directly, not cloned
      cells.push([rowContent]);
    });
  }
  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original block element with the table
  element.replaceWith(table);
}