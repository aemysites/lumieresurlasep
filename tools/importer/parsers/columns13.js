/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be a single cell array!
  const headerRow = ['Columns (columns13)'];

  // Find all columns: any immediate child with class 'col'
  const columns = Array.from(element.children).filter(
    (child) => child.classList && child.classList.contains('col')
  );
  // Fallback: if no .col elements, use all immediate children
  const actualColumns = columns.length > 0 ? columns : Array.from(element.children);

  // For each column, collect all content (text nodes and elements)
  const contentRowCells = actualColumns.map((col) => {
    const cellContent = [];
    col.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // If this is an iframe, replace with a link
        if (node.tagName === 'IFRAME' && node.hasAttribute('src')) {
          const a = document.createElement('a');
          a.href = node.getAttribute('src');
          a.textContent = node.getAttribute('title') || 'Video';
          cellContent.push(a);
        } else {
          cellContent.push(node);
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        const txt = node.textContent.replace(/\s+/g, ' ').trim();
        if (txt) cellContent.push(txt);
      }
    });
    if (cellContent.length === 1) return cellContent[0];
    if (cellContent.length > 1) return cellContent;
    return '';
  });

  // Table construction: header row must have exactly one cell
  // Content row must be a single array with N cells for N columns
  const cells = [headerRow, contentRowCells];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
