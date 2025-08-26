/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Find all content nodes for text/content ---
  // Use .post-content for the main article content
  const postContent = element.querySelector('.post-content');
  const contentNodes = postContent ? Array.from(postContent.childNodes) : [];

  // --- 2. Find the YouTube embed block ---
  const youtubeFigure = element.querySelector('.wp-block-embed-youtube');
  let videoUrl = '';
  let posterImg = null;
  if (youtubeFigure) {
    const iframe = youtubeFigure.querySelector('iframe');
    if (iframe && iframe.src) {
      videoUrl = iframe.src.split('?')[0];
    }
    // If a thumbnail image exists, include it
    const img = youtubeFigure.querySelector('img');
    if (img) posterImg = img;
  }

  // --- 3. Compose cell contents ---
  // All text/content nodes from postContent (includes headings, lists, etc.)
  // Then, video poster (if any) and video URL link
  let cellContents = [];
  if (contentNodes.length > 0) {
    // Filter out empty text nodes
    contentNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') return;
      cellContents.push(node);
    });
  }
  // Add the video poster above the link, if present
  if (posterImg) {
    cellContents.push(posterImg);
  }
  if (videoUrl) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = videoUrl;
    cellContents.push(link);
  }
  // If nothing found, ensure cell is not empty
  if (cellContents.length === 0) cellContents = [''];

  // --- 4. Create block table ---
  const cells = [
    ['Embed'], // Header row, exactly as example
    [cellContents]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
