/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion26) block for post-content section
  // 1. Find the main content area
  const postContent = element.querySelector('.post-content');
  if (!postContent) return;

  // 2. Find all top-level H3s within post-content (these are the accordion titles)
  // Only those that are direct children (or at most one wrapper deep)
  const allH3s = Array.from(postContent.querySelectorAll('h3'));
  if (allH3s.length === 0) return; // No accordions found

  // 3. For each H3, collect everything after it up until the next H3 (not including the next H3)
  const cells = [['Accordion (accordion26)']];
  for (let i = 0; i < allH3s.length; i++) {
    const title = allH3s[i];
    const contentNodes = [];
    let node = title.nextElementSibling;
    while (node && node.tagName !== 'H3') {
      // Only include nodes that are inside postContent
      if (postContent.contains(node)) {
        contentNodes.push(node);
      }
      node = node.nextElementSibling;
    }
    // If the content is empty, add an empty string; else, pass the array
    cells.push([title, contentNodes.length ? contentNodes : '']);
  }

  // 4. Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
