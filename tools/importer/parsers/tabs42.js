/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab labels (anchor elements)
  const container = element.querySelector('.container');
  if (!container) return;
  const ul = container.querySelector('ul.list');
  if (!ul) return;
  const lis = ul.querySelectorAll(':scope > li');

  // Build the header row: one cell only
  const rows = [['Tabs (tabs42)']];

  // Build each tab row: two cells (label, content), even if content is empty
  lis.forEach((li) => {
    const a = li.querySelector('a');
    if (!a) return;
    rows.push([a, '']); // always two cells per row after header
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
