/* global WebImporter */
export default function parse(element, { document }) {
  // Find the left (logos) and right (content) columns
  const leftCol = element.querySelector('aside');
  const rightCol = element.querySelector('.content');

  // Compose left cell (logos)
  const leftCell = leftCol || '';

  // Compose right cell (heading + paragraphs)
  let rightCell = '';
  if (rightCol) {
    const frag = document.createDocumentFragment();
    const heading = rightCol.querySelector('h2');
    if (heading) frag.appendChild(heading);
    rightCol.querySelectorAll('p').forEach(p => frag.appendChild(p));
    rightCell = frag;
  }

  // Build the table manually to ensure the header row's th spans both columns
  const table = document.createElement('table');

  // Header row: single th with colspan=2
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.setAttribute('colspan', '2');
  headerTh.textContent = 'Columns (columns47)';
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);

  // Content row: two td cells
  const contentTr = document.createElement('tr');
  const td1 = document.createElement('td');
  if (leftCell) td1.append(leftCell);
  const td2 = document.createElement('td');
  if (rightCell) td2.append(rightCell);
  contentTr.appendChild(td1);
  contentTr.appendChild(td2);
  table.appendChild(contentTr);

  // Replace original element with table
  element.replaceWith(table);
}
