/* global WebImporter */
export default function parse(element, { document }) {
  // Find the correct content area for the accordion
  const postContent = element.querySelector('.post-content');
  if (!postContent) return;

  // Get all direct children of postContent
  const children = Array.from(postContent.children);

  // To find all accordion sections: look for h3, then take all siblings until next h3 or end
  const rows = [['Accordion (accordion44)']];

  let i = 0;
  while (i < children.length) {
    const child = children[i];
    if (/^H[1-6]$/.test(child.tagName)) {
      // This is a heading, candidate for title cell
      const titleCell = child;
      const contentEls = [];
      i++;
      // Collect all elements after heading until next heading or end
      while (i < children.length && !/^H[1-6]$/.test(children[i].tagName)) {
        // Exclude empty elements
        if (children[i].textContent.trim() || children[i].querySelector('*')) {
          contentEls.push(children[i]);
        }
        i++;
      }
      let contentCell;
      if (contentEls.length === 1) {
        contentCell = contentEls[0];
      } else if (contentEls.length > 1) {
        contentCell = contentEls;
      } else {
        // If there's no content, provide empty string (shouldn't happen in this sample)
        contentCell = '';
      }
      rows.push([titleCell, contentCell]);
    } else {
      // Not a heading, skip
      i++;
    }
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}
