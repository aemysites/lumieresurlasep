/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell, block name
  const headerRow = ['Columns (columns40)'];

  // Content row: one column per link in the element
  const links = Array.from(element.querySelectorAll(':scope > a'));
  // If no links, maintain correct structure
  const contentRow = links.length ? links : [''];

  // Compose cells: header is always 1 column; content row is N columns
  const cells = [
    headerRow,
    contentRow
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
