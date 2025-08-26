/* global WebImporter */
export default function parse(element, { document }) {
  // Try to find the main article content that holds the legal articles
  // The content-article > post-content pattern is typical
  let content = element.querySelector('.content-article');
  if (!content) content = element.querySelector('.post-content');
  if (!content) return;

  // Find all h2.wp-block-heading in this content block
  const headers = Array.from(content.querySelectorAll('h2.wp-block-heading'));
  if (!headers.length) return;

  // Table setup: block header first
  const rows = [['Accordion (accordion31)']];
  // For each h2, collect all elements until the next h2
  headers.forEach((h2, i) => {
    // Title cell: use the existing h2 element directly
    const title = h2;
    // Content cell: gather everything between this h2 and the next h2
    let contentNodes = [];
    let node = h2.nextElementSibling;
    while (node && !(node.tagName === 'H2' && node.classList.contains('wp-block-heading'))) {
      contentNodes.push(node);
      node = node.nextElementSibling;
    }
    // If there's content, add to the rows; else, still create an empty cell
    // (preserves structure in case a section is just a heading)
    rows.push([
      title,
      contentNodes.length === 0 ? '' : (contentNodes.length === 1 ? contentNodes[0] : contentNodes)
    ]);
  });

  // Create and replace with Accordion table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
