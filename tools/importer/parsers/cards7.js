/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per example
  const headerRow = ['Cards (cards7)'];
  // Prepare rows array
  const cells = [headerRow];

  // Find the items block
  const itemsWrapper = element.querySelector('.block-posts__items');
  if (!itemsWrapper) return;

  // Select all card articles
  const articles = Array.from(itemsWrapper.querySelectorAll('article.tease'));
  
  articles.forEach(article => {
    // Image: always present in the left cell
    const imgElem = article.querySelector('.img-container img');
    // For the right cell, collect all text content in order and reference existing elements
    const postContent = article.querySelector('.post-content');
    const textCellContent = [];
    if (postContent) {
      // Reference all children (e.g., post-type, h2, etc.) in order, preserving structure and inline styles
      Array.from(postContent.childNodes).forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE || (child.nodeType === Node.TEXT_NODE && child.textContent.trim())) {
          textCellContent.push(child);
        }
      });
    }
    // Add the row with image and text content
    cells.push([imgElem, textCellContent]);
  });

  // Build and replace with the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
