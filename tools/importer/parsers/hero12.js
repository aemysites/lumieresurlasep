/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block name, as in the example
  const headerRow = ['Hero (hero12)'];

  // --- Background image row ---
  // Find the background image set by the .background div's style
  let bgImgEl = '';
  const bgDiv = [...element.children].find(child => child.classList.contains('background'));
  if (bgDiv && bgDiv.style && bgDiv.style.backgroundImage) {
    const match = bgDiv.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
    if (match && match[1]) {
      bgImgEl = document.createElement('img');
      bgImgEl.src = match[1];
      bgImgEl.alt = '';
    }
  }

  // --- Title/content row ---
  // Find the .article-header__content div
  let contentCellContent = [];
  const contentDiv = [...element.children].find(child => child.classList.contains('article-header__content'));
  if (contentDiv) {
    // Get the title (h1 inside .article-header__title)
    const titleWrapper = contentDiv.querySelector('.article-header__title');
    if (titleWrapper) {
      // Push all its children (usually the h1)
      for (const node of [...titleWrapper.children]) {
        contentCellContent.push(node);
      }
    }
    // Push the image inside .article-header__content if present
    const heroImg = contentDiv.querySelector('img.paysage-img');
    if (heroImg) {
      contentCellContent.push(heroImg);
    }
  }

  // Fallback: If no content found, insert empty string to keep cell shape correct
  if (contentCellContent.length === 0) contentCellContent = [''];

  // Assemble the block table
  const cells = [
    headerRow,
    [bgImgEl || ''],
    [contentCellContent]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
