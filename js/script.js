const createPairInputEl = document.querySelector('.create-pair-input');
const createPairAddBtnEl = document.querySelector('.create-pair-add-btn');
const displayListEl = document.querySelector('.display-list');
const displayButtonDeleteEl = document.querySelector('.display-button-delete');
const displayButtonDeleteAllEl = document.querySelector(
  '.display-button-delete-all'
);
const displayButtonSortByNameEl = document.querySelector(
  '.display-button-sortByName'
);
const displayButtonSortByValueEl = document.querySelector(
  '.display-button-sortByValue'
);
const validationTextEl = document.querySelector('.validation-text');
const containerEL = document.querySelector('.container');
const displayButtonShowXmlEL = document.querySelector(
  '.display-button-show-xml'
);

// List data
let state = [];

// Data from local storage
if (localStorage.getItem('state')) {
  state = JSON.parse(localStorage.getItem('state'));
  render();
}

// Adding an element by pressing the enter button
containerEL.addEventListener('keydown', (event) => {
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    createPairAddBtnEl.click();
  }
});

// Adding an element by clicking on the  button add
createPairAddBtnEl.addEventListener('click', () => {
  if (createPairInputEl.value === '') return;
  let name;
  let value;
  let inputText = createPairInputEl.value.split('=');
  if (inputText[0] && inputText[1]) {
    name = inputText[0].trim();
    value = inputText[1].trim();
  }
  let newPair = {
    name,
    value,
    checked: false,
    id: Date.now(),
  };
  if (
    newPair.name &&
    newPair.value &&
    !newPair.name.match(/[\W_]/) &&
    !newPair.value.match(/[\W_]/)
  ) {
    state.push(newPair);
    createPairInputEl.value = '';
    render();
  } else {
    validationTextEl.textContent = `
      Incorrect data. Please input name=value.
      Example: Name=LastName. Names and Values can contain only latin alpha-numeric characters
    `;
    setTimeout(() => {
      validationTextEl.textContent = '';
    }, 7000);
  }
});

// Function render all added elements
function render() {
  if (!state.length) {
    displayListEl.innerHTML = '';
  }
  let displayElements = '';
  state.forEach((item, i) => {
    displayElements += `
    <li id=${item.id} class="display-list-element">
        <input
          type="checkbox"
          class="custom-checkbox"
          id=${item.id} ${item.checked ? 'checked' : ''}
        >
        <span id=${item.id} class="display-list-element-span">${item.name}=${
      item.value
    }</span>
    </li>
    `;
    localStorage.setItem('state', JSON.stringify(state));
  });
  displayListEl.innerHTML = displayElements;
}

// Changing the status of the checkbox
displayListEl.addEventListener('click', (event) => {
  const elementId = event.target.getAttribute('id');
  state.forEach((item, i) => {
    if (item.id === +elementId) {
      item.checked = !item.checked;
    }
  });
  render();
});

// Removing all added elements
displayButtonDeleteAllEl.addEventListener('click', () => {
  state = [];
  localStorage.setItem('state', JSON.stringify(state));
  render();
});

// Removing checked elements
displayButtonDeleteEl.addEventListener('click', () => {
  state = state.filter((item, i) => !item.checked);
  localStorage.setItem('state', JSON.stringify(state));
  render();
});

// Sorting by name
displayButtonSortByNameEl.addEventListener('click', () => {
  state.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem('state', JSON.stringify(state));
  render();
});

// Sorting by value
displayButtonSortByValueEl.addEventListener('click', () => {
  state.sort((a, b) => a.value.localeCompare(b.value));
  localStorage.setItem('state', JSON.stringify(state));
  render();
});

function xml2Str(xmlNode) {
  return new XMLSerializer().serializeToString(xmlNode);
}

displayButtonShowXmlEL.addEventListener('click', () => {
  xml2Str(displayListEl);
  alert(xml2Str(displayListEl));
});
