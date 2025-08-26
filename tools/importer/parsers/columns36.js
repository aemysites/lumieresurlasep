/* global WebImporter */
export default function parse(element, { document }) {
  // Find left and right content
  const leftCol = element.querySelector('.logo');
  const rightCol = element.querySelector('.secondary-logo');

  // Prepare table rows: header row with one cell, second row with two cells
  const cells = [
    ['Columns (columns36)'],
    [leftCol, rightCol]
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix: Ensure the header row has exactly one <th> with proper colspan
  if (table.rows.length && table.rows[0].cells.length === 1 && table.rows[1] && table.rows[1].cells.length > 1) {
    table.rows[0].cells[0].setAttribute('colspan', table.rows[1].cells.length);
  }

  // Replace original element with the new table
  element.replaceWith(table);
}
