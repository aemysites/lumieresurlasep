/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards33)'];
  // Find all card blocks: columns with one image/logo block and one text block
  const postContent = element.querySelector('.post-content');
  if (!postContent) return;
  // Select all direct .wp-block-columns children
  const columnsBlocks = Array.from(postContent.querySelectorAll(':scope > .wp-block-columns'));
  // Filter out last block (footer meta), and any non-card blocks
  const cardColumns = columnsBlocks.filter((block) => {
    // A card block has 2 columns, one contains an image, one contains text
    const cols = Array.from(block.querySelectorAll(':scope > .wp-block-column'));
    if (cols.length !== 2) return false;
    // At least one column must have an <img>
    return cols.some(col => col.querySelector('img'));
  });

  // For each block, extract image and text
  const rows = cardColumns.map((block) => {
    const cols = Array.from(block.querySelectorAll(':scope > .wp-block-column'));
    // Identify image and text columns
    let imgCol = cols.find(col => col.querySelector('img'));
    let textCol = cols.find(col => !col.querySelector('img'));
    if (!imgCol || !textCol) {
      // fallback for variant ordering
      imgCol = cols[0].querySelector('img') ? cols[0] : cols[1];
      textCol = imgCol === cols[0] ? cols[1] : cols[0];
    }
    // Image element
    const img = imgCol.querySelector('img');
    // Text content: heading, description, CTA
    // Heading: h3, h2, h4 (prefer h3)
    const heading = textCol.querySelector('h3, h2, h4');
    // First paragraph after heading
    let desc = null;
    if (heading) {
      let next = heading.nextElementSibling;
      while (next && next.tagName !== 'P') {
        next = next.nextElementSibling;
      }
      desc = next;
    } else {
      // fallback: first <p>
      desc = textCol.querySelector('p');
    }
    // CTA: .wp-block-buttons (contains the button)
    const ctaWrap = textCol.querySelector('.wp-block-buttons');
    // Compose content array
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (desc) cellContent.push(desc);
    if (ctaWrap) cellContent.push(ctaWrap);
    return [img, cellContent];
  }).filter(([img, cellContent]) => img && cellContent.length > 0);

  // Create the cards block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
