/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as example: 'Hero (hero30)'
  const headerRow = ['Hero (hero30)'];

  // Defensive: get content wrapper
  const contentHeader = element.querySelector('.content-header-home');
  if (!contentHeader) return;

  // Image row: Get first <img> (background/decor)
  const img = contentHeader.querySelector('img');

  // Text row: gather all text content preserving structure
  const textContainer = contentHeader.querySelector('.text-container');
  const textRowElements = [];
  if (textContainer) {
    // Subheading/label
    const label = textContainer.querySelector('.label-hp');
    if (label) textRowElements.push(label);
    // Main heading
    const h1 = textContainer.querySelector('h1');
    if (h1) textRowElements.push(h1);
    // Decorative SVG line (as shown in example screenshot)
    const graphicLine = textContainer.querySelector('.graphic-line');
    if (graphicLine) textRowElements.push(graphicLine);
  }

  // Compose table rows: header, image, text
  const cells = [
    headerRow,
    [img ? img : ''],
    [textRowElements]
  ];

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
