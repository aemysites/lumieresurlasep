/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content node containing the accordion items
  const postContent = element.querySelector('.post-content');
  if (!postContent) return;

  // Accordion: We want each major section (h2 or h3 + content until next h2 or h3)
  // Find all headings inside postContent (h2 or h3)
  const allChildren = Array.from(postContent.children);
  // Accordion items: both h2 and h3, but skip "Sources" (last h2)
  const headingIndexes = allChildren
    .map((el, idx) => {
      if ((el.tagName === 'H2' || el.tagName === 'H3') && !el.textContent.match(/sources/i)) {
        return idx;
      }
      return -1;
    })
    .filter(idx => idx !== -1);

  const rows = [];
  for (let i = 0; i < headingIndexes.length; i++) {
    const startIdx = headingIndexes[i];
    const endIdx = (i + 1 < headingIndexes.length) ? headingIndexes[i + 1] : allChildren.length;
    const titleEl = allChildren[startIdx];

    // Content is all elements between this heading and the next heading
    const contentEls = [];
    for (let j = startIdx + 1; j < endIdx; j++) {
      // Skip empty paragraphs
      const el = allChildren[j];
      if (el.tagName === 'P' && el.textContent.trim() === '') continue;
      // Only include relevant elements (stop at sources h2)
      contentEls.push(el);
    }
    // Only create a row if there's content
    if (contentEls.length > 0) {
      rows.push([titleEl, contentEls.length === 1 ? contentEls[0] : contentEls]);
    }
  }

  // Table header row must match block name
  const headerRow = ['Accordion (accordion35)'];
  const tableCells = [headerRow, ...rows];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
