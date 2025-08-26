/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main content area containing the tab sections
  let postContent = element.querySelector('.post-content');
  if (!postContent) postContent = element;

  // Get an array of all nodes (not just elements) for robust content extraction
  const nodes = Array.from(postContent.childNodes);

  // Find all <h3> elements (tab headers) in order
  const h3s = nodes.filter(n => n.nodeType === 1 && n.tagName === 'H3');

  // If no <h3>, treat it as a single tab
  if (h3s.length === 0) {
    const allContent = nodes.filter(n => !(n.nodeType === 3 && !n.textContent.trim()));
    const cells = [
      ['Tabs (tabs9)'],
      ['Tab', allContent.length === 1 ? allContent[0] : allContent]
    ];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    return;
  }

  // For each <h3>, extract corresponding tab content (until next <h3> or end)
  let tabRows = [];
  for (let i = 0; i < h3s.length; i++) {
    const h3 = h3s[i];
    // Tab label: grab the text content and trim whitespace
    const tabLabel = h3.textContent.replace(/\s+/g, ' ').trim();
    // Find the index of the <h3> in nodes
    const startIdx = nodes.indexOf(h3);
    // Find the index of the next <h3> or end
    let endIdx = nodes.length;
    for (let j = startIdx + 1; j < nodes.length; j++) {
      if (nodes[j].nodeType === 1 && nodes[j].tagName === 'H3') {
        endIdx = j;
        break;
      }
    }
    // Collect all content between this <h3> and the next <h3>
    let contentNodes = [];
    for (let k = startIdx + 1; k < endIdx; k++) {
      // Skip empty text nodes
      if (nodes[k].nodeType === 3 && !nodes[k].textContent.trim()) continue;
      contentNodes.push(nodes[k]);
    }
    // If only one node, pass as is; else as array
    const tabContent = contentNodes.length === 0 ? '' : (contentNodes.length === 1 ? contentNodes[0] : contentNodes);
    tabRows.push([tabLabel, tabContent]);
  }

  // Compose the final table
  const cells = [
    ['Tabs (tabs9)'],
    ...tabRows
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
