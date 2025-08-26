/* global WebImporter */
export default function parse(element, { document }) {
  // Main left column: only the main article content, not sidebar/return/share
  let leftCell = null;
  const postContent = element.querySelector('.post-content');
  leftCell = postContent || element;

  // Right column: the comment box
  const rightCell = element.querySelector('section.comment-box');

  // Build cells array with a SINGLE-CELL HEADER row, and a row of two cells
  const cells = [
    ['Columns (columns24)'], // header row - exactly one cell
    [leftCell, rightCell]    // content row - two columns as per example
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
