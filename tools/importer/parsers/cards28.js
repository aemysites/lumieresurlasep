/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row, must match example exactly
  const headerRow = ['Cards (cards28)'];
  const cells = [headerRow];

  // Collect all article.tease cards
  const articles = element.querySelectorAll('article.tease');
  articles.forEach(article => {
    // First cell: image (always present)
    let img = article.querySelector('.img-container img');

    // Second cell: all text content in .post-content (including post-type, h2, etc)
    // Must include all text content as in source HTML
    let textEl;
    const postContent = article.querySelector('.post-content');
    if (postContent) {
      // Wrap text content in link if card is clickable
      const link = article.querySelector('a[href]');
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        if (link.target) a.target = link.target;
        // Move all postContent children into link (preserves formatting)
        Array.from(postContent.childNodes).forEach(node => a.appendChild(node));
        textEl = a;
      } else {
        textEl = postContent;
      }
    } else {
      textEl = document.createTextNode('');
    }
    cells.push([img, textEl]);
  });

  // Replace original element with the new block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
