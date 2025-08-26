/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content row containing all columns
  const contentRow = element.querySelector('.content.row');
  if (!contentRow) return;

  // Get all direct ul children (= columns)
  const columns = Array.from(contentRow.querySelectorAll(':scope > ul'));
  // Defensive: if no columns, don't output block
  if (!columns.length) return;

  // Table header matches the example precisely
  const headerRow = ['Columns (columns38)'];

  // Table body row with all columns as elements (preserving all child markup & links)
  const tableRows = [columns];

  // Compose table data
  const tableData = [headerRow, ...tableRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table
  element.replaceWith(block);
}
