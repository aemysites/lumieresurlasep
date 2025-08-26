/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block
  const columnsBlock = element.querySelector('.wp-block-columns');
  if (!columnsBlock) return;

  // Get the immediate column elements
  const columnEls = Array.from(columnsBlock.children).filter(child => child.classList.contains('wp-block-column'));

  // Build array for each column, referencing existing child nodes
  const columns = columnEls.map(col => {
    // Create a fragment to hold all direct children
    const frag = document.createDocumentFragment();
    Array.from(col.childNodes).forEach(child => frag.appendChild(child));
    return frag;
  });

  // Table header row
  const headerRow = ['Columns (columns20)'];
  const columnsRow = columns;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);

  // Replace the columns block with the table
  columnsBlock.replaceWith(table);
}
