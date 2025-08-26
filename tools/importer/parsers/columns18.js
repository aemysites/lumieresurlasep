/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified by the example
  const headerRow = ['Columns (columns18)'];

  // Get only the immediate .wp-block-column children for columns layout
  const columns = Array.from(element.querySelectorAll(':scope > .wp-block-column'));

  // Prepare column cell content, omitting anything not in columns
  let leftCellContent = [];
  let rightCellContent = [];
  if (columns.length > 0) {
    leftCellContent = Array.from(columns[0].children);
  }
  if (columns.length > 1) {
    rightCellContent = Array.from(columns[1].children);
  }

  // Compose the rows according to the markdown example (header + 2-column content)
  const rows = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];
  // Do NOT include any non-column content (such as the privacy notice) at all.

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
