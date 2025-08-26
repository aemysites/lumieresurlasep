/* global WebImporter */
export default function parse(element, { document }) {
  // Find the relevant content: breadcrumbs and search/logo row
  const breadcrumbsWrapper = element.querySelector('.breadcrumbs-wrapper');
  const headerRight = element.querySelector('.header-container__right');

  // Compose the right column cell: include all headerRight children in a div
  let rightCell = '';
  if (headerRight) {
    const rightDiv = document.createElement('div');
    Array.from(headerRight.children).forEach(child => {
      rightDiv.appendChild(child);
    });
    rightCell = rightDiv;
  }

  // The header row must be a single column (block name only), as in the example
  // The next row contains as many columns as needed (2 here: breadcrumbs, right cell)
  const cells = [
    ['Columns (columns14)'],
    [breadcrumbsWrapper || '', rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}