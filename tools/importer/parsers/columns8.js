/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the left column: main article content
  let leftCol = null;
  const postContent = element.querySelector('.post-content');
  if (postContent) {
    leftCol = postContent;
  } else {
    const articleBody = element.querySelector('.article-body');
    if (articleBody) {
      leftCol = articleBody;
    }
  }

  // Extract the right column: sidebar comments
  let rightCol = null;
  const commentBox = element.querySelector('.comment-box');
  if (commentBox) {
    rightCol = commentBox;
  }

  // Ensure at least empty placeholders so structure is always correct
  const left = leftCol || document.createElement('div');
  const right = rightCol || document.createElement('div');

  // The header row must be a single cell to match the example
  const cells = [
    ['Columns (columns8)'],
    [left, right]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
