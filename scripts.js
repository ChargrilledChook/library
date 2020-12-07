// Elements
const form = document.querySelector(".form-container");
const libraryContainer = document.querySelector(".card-container");
const addBookButton = document.querySelector(".add-entry");
const submitButton = document.querySelector("#submit-btn");
//const deleteButton = document.querySelectorAll()

// Objects
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

class Book2 {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    const readStatus = this.read ? false : true;
    this.read = readStatus;
    return this; // Not really needed here but good practice as it allows us to chain methods
  }
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages long, ${
    this.read ? "already read" : "not read yet"
  }`;
};

Book.prototype.toggleRead = function () {
  const readStatus = this.read ? false : true;
  this.read = readStatus;
};

// Functions

// If a library key exists in local storage, parse it and set it as our library. Else return an empty array
const checkStorage = function checkStorageForLibraryArray() {
  if (!localStorage.getItem("library")) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("library"));
  }
};

const saveLibrary = function saveLibraryToLocalStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
};

const addBook = function addBookToLibrary(title, author, pages, read, library) {
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
  return library;
};

// DOM Functions

const createCard = function createCardHTML(book) {
  return `<h2>${book.title}</h2>
  <p>${book.author}</p>
  <p>${book.pages} pages</p>
  <p>${book.read ? "Read" : "Not Read"}</p>
  <button class="delete-btn">Delete</button>`;
};

const addCard = function addCardToDocument(book) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = createCard(book);
  libraryContainer.append(newCard);
};

function toggle() {
  form.style.display === "block"
    ? (form.style.display = "none")
    : (form.style.display = "block");
}

const displayLibray = function displayLibraryOnDocument(library = myLibrary) {
  for (book of library) {
    addCard(book);
  }
};

// This is mostly for testing and getting rid of garbage
function deleteLibrary() {
  myLibrary = [];
  displayLibray(myLibrary);
  saveLibrary();
}

// Declarations

let title;
let myLibrary = checkStorage();

console.table(myLibrary);

// Listeners

addBookButton.addEventListener("click", toggle);

// Form stuff. IDs target respective fields inside submit form
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").value;
  const bookToAdd = new Book(title, author, pages, read);
  myLibrary.push(bookToAdd);
  libraryContainer.innerHTML = "";
  displayLibray(myLibrary);
  saveLibrary();
});

// Running the scripts
displayLibray(myLibrary);
