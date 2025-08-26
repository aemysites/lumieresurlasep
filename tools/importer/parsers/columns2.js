/* global WebImporter */
export default function parse(element, { document }) {
  // Build first column: quiz text including headings and options
  const formBlock = element.querySelector('.gform_wrapper');
  const contentCol = document.createElement('div');

  if (formBlock) {
    // Add quiz heading/title if present
    const heading = formBlock.querySelector('.gform_heading');
    if (heading) {
      contentCol.appendChild(heading);
    }

    // Add main question label
    const quizLabel = formBlock.querySelector('.gquiz-field .gfield_label');
    if (quizLabel) {
      const labelDiv = document.createElement('div');
      labelDiv.appendChild(quizLabel);
      contentCol.appendChild(labelDiv);
    }

    // Add options as a <ul>
    const radioLabels = formBlock.querySelectorAll('.gfield_radio > li label');
    if (radioLabels.length) {
      const ul = document.createElement('ul');
      radioLabels.forEach(label => {
        // Reference each label directly
        const li = document.createElement('li');
        li.appendChild(label);
        ul.appendChild(li);
      });
      contentCol.appendChild(ul);
    }
  }

  // Second column: image
  let img = element.querySelector('.image-wrapper img') || element.querySelector('img');

  // Compose the table: header row is one cell, then a single row with two columns
  const rows = [
    ['Columns (columns2)'],
    [contentCol, img ? img : '']
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
