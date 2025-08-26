/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match the example exactly
  const headerRow = ['Cards (cards34)'];
  const cells = [headerRow];

  // Get the container with all cards
  const itemsContainer = element.querySelector('.shared-posts__items');
  if (!itemsContainer) return;

  // Get the card elements
  const cardEls = Array.from(itemsContainer.children).filter(child => child.classList.contains('carousel-item'));

  cardEls.forEach(cardEl => {
    let img = null;
    let contentCell = document.createElement('div');

    // CTA card
    const cta = cardEl.querySelector('.shared-posts__cta');
    if (cta) {
      img = cta.querySelector('img');
      // Copy all children except the image
      Array.from(cta.children).forEach(child => {
        if (child.tagName !== 'IMG') {
          contentCell.appendChild(child);
        }
      });
      cells.push([img, contentCell]);
      return;
    }

    // Shared post card
    const sharedPost = cardEl.querySelector('a.shared-post');
    if (sharedPost) {
      // Get image
      const imgContainer = sharedPost.querySelector('.img-container');
      if (imgContainer) {
        img = imgContainer.querySelector('img');
      }
      // Get the text content block
      const sharedContent = sharedPost.querySelector('.shared-post__content');
      if (sharedContent) {
        // For each child of sharedContent, append to contentCell
        Array.from(sharedContent.children).forEach(child => {
          contentCell.appendChild(child);
        });
      }
      cells.push([img, contentCell]);
      return;
    }
  });

  // Create block table from the cells and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
