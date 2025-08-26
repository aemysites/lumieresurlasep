/* global WebImporter */
export default function parse(element, { document }) {
  // Find the left column: article main content (ignore sidebar-article) and the right column: sidebar (comments)
  let leftCol = null;
  let rightCol = null;

  // The outer .article-content section contains a .wrapper > .container > .article-body
  // Within .article-body, .content-article contains .sidebar-article (left) and .post-content (main part)
  // But in this case, .sidebar-article contains the share block and return button (left side)
  // .post-content contains the paragraphs (main content)
  // The Comments column is the .comment-box element

  // Let's get the main, left column: everything except the sidebar (so: .post-content and .sidebar-article)
  // We'll combine .sidebar-article + .post-content, for all content on the left
  const contentArticle = element.querySelector('.content-article');
  if (contentArticle) {
    const sidebar = contentArticle.querySelector('.sidebar-article');
    const postContent = contentArticle.querySelector('.post-content');
    // Combine both as a wrapper div for left col
    leftCol = document.createElement('div');
    if (sidebar) leftCol.appendChild(sidebar);
    if (postContent) leftCol.appendChild(postContent);
  }

  // For the right column, get the section.comment-box (comments)
  rightCol = element.querySelector('section.comment-box');

  // Defensive: if for some reason either is missing, use a placeholder div to keep columns aligned
  if (!leftCol) {
    leftCol = document.createElement('div');
  }
  if (!rightCol) {
    rightCol = document.createElement('div');
  }

  // Table header matches the block name
  const headerRow = ['Columns (columns15)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
