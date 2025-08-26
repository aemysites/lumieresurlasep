/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Find all article cards (direct children of the posts items container)
  const itemsContainer = element.querySelector('.block-posts__items');
  const articles = itemsContainer.querySelectorAll('article.tease');

  articles.forEach((article) => {
    // First cell: the image element
    const img = article.querySelector('.img-container img');

    // Second cell: all content from .post-content (including all text, tags, etc.)
    const postContent = article.querySelector('.post-content');
    // Instead of cloning, reference the postContent element directly (as per guidelines)
    rows.push([img, postContent]);
  });

  // Create the Cards block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
