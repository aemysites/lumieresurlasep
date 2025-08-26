/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the quiz form section
  const formWrap = element.querySelector('.form-wrapper');
  const gform = formWrap ? formWrap.querySelector('.gform_wrapper') : element.querySelector('.gform_wrapper');

  // 2. Extract the question (h3 in .gform_heading)
  let questionElem = null;
  if (gform) {
    const heading = gform.querySelector('.gform_heading h3');
    if (heading) questionElem = heading;
  }

  // 3. Extract the quiz image (img inside .image-wrapper)
  let imageElem = null;
  if (gform) {
    const img = gform.querySelector('.image-wrapper img');
    if (img) imageElem = img;
  }

  // 4. Extract the quiz options (radio button choices' labels)
  let optionElems = [];
  if (gform) {
    const radioLabels = gform.querySelectorAll('.gfield_radio label');
    radioLabels.forEach(label => {
      optionElems.push(label);
    });
  }

  // 5. Build columns
  // Col 1: question above the image
  const col1 = document.createElement('div');
  if (questionElem) col1.appendChild(questionElem);
  if (imageElem) col1.appendChild(imageElem);

  // Col 2: options as vertical list
  const col2 = document.createElement('div');
  if (optionElems.length) {
    optionElems.forEach(label => {
      col2.appendChild(label);
      col2.appendChild(document.createElement('br'));
    });
  }

  // The example describes a columns block with 2 columns (Q+image, choices)
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns3)'],
    [col1, col2]
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
