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
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
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

// When storing class objects as JSON they become generic objects when deserialised. They
// need to be reconverted each time we retrieve them from storage
const revive = function reviveObjectsToBooks(obj) {
  return new Book2(obj.title, obj.author, obj.pages, obj.read, obj.id);
};

// If a library key exists in local storage, parse it and set it as our library. Else return an empty array
const checkStorage = function checkStorageForLibraryArray() {
  if (!localStorage.getItem("library")) {
    return {
      idCounter: 0,
      books: [],
    };
  } else {
    const deserialised = JSON.parse(localStorage.getItem("library"));
    deserialised.books = deserialised.books.map(revive);
    return deserialised;
  }
};

const saveLibrary = function saveLibraryToLocalStorage() {
  return localStorage.setItem("library", JSON.stringify(myLibrary)); // CHECK THIS IF BROKEN IN CHROME - REMOVE RETURN
};

const addBook = function addBookToLibrary(title, author, pages, read, library) {
  const newBook = new Book(title, author, pages, read);
  library.books.push(newBook);
  return library;
};

// DOM Functions

const createCard = function createCardHTML(book) {
  return `
  <h2>${book.title}</h2>
  <p>${book.author}</p>
  <p>${book.pages} pages</p>
  <p>${book.read === "on" ? "Read" : "Not Read"}</p>
  <button class="delete-btn">Delete</button>`;
};

const render = function renderCardsOnDOM(library = myLibrary) {
  libraryContainer.innerHTML = "";
  displayLibray(library.books);
  saveLibrary();
};

const deleteCard = function deleteCardFromDOM(idx, library = myLibrary) {
  library.books.splice(idx, 1); // Conceptually fine but the idx needs to be hooked up to the listener on the card of the item to be deleted
  render();
};

const addCard = function addCardToDocument(book) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.id = `book${book.id}`;
  newCard.innerHTML = createCard(book);
  libraryContainer.append(newCard);
};

const toggle = function toggleFormPopup() {
  form.style.display === "block"
    ? (form.style.display = "none")
    : (form.style.display = "block");
};

const displayLibray = function displayLibraryOnDocument(
  library = myLibrary.books
) {
  for (book of library) {
    addCard(book);
  }
};

// This is mostly for testing and getting rid of garbage
function deleteLibrary() {
  myLibrary.books = [];
  displayLibray(myLibrary.books);
  saveLibrary();
}

// Declarations

let title;
let myLibrary = checkStorage();

console.table(myLibrary.books);

// Listeners

addBookButton.addEventListener("click", toggle);

// Form stuff. IDs target respective fields inside submit form
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").value;
  const bookToAdd = new Book2(title, author, pages, read, myLibrary.idCounter);
  myLibrary.idCounter++;
  myLibrary.books.push(bookToAdd);
  toggle();
  form.reset();
  render();
});

// Running the scripts
displayLibray(myLibrary.books);

// Experimental
