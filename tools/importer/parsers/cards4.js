/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Cards (cards4)'];
  const cells = [headerRow];

  // Find the items container
  const itemsContainer = element.querySelector('.block-posts__items');
  if (itemsContainer) {
    // All card articles
    const articles = Array.from(itemsContainer.querySelectorAll('article.tease'));
    articles.forEach(article => {
      // Left column: image
      let imageEl = null;
      const img = article.querySelector('.img-container img');
      if (img) {
        imageEl = img;
      } else {
        imageEl = '';
      }
      // Right column: text content
      let textEls = [];
      const typeEl = article.querySelector('.post-content .post-type');
      const titleEl = article.querySelector('.post-content .h2.title');
      if (typeEl) textEls.push(typeEl);
      if (titleEl) textEls.push(titleEl);
      cells.push([imageEl, textEls]);
    });
    // CTA card, if present
    const ctaEl = itemsContainer.querySelector('.block-posts__cta');
    if (ctaEl) {
      cells.push(['', ctaEl]);
    }
  }

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
