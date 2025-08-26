/* global WebImporter */
export default function parse(element, { document }) {
  // Get the columns for the block: direct children with .content.col.col-4
  const columns = Array.from(element.querySelectorAll(':scope > .content'));
  // Edge case: If no .content children, fallback to all immediate children
  const columnCells = columns.length > 0 ? columns : Array.from(element.children);

  // The header row should be a single cell: ['Columns (columns45)']
  // The second row should have as many cells as there are columns
  const cells = [ ['Columns (columns45)'], columnCells ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
