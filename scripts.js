let myLibrary = [];

// Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  // First way to add functions to an object
  // this.info = function() {
  //  return `${title} by ${author}, ${pages} pages long, ${read ? 'already read' : 'not read yet'}`
  // }
}

// Alternate / better practice - prototypes. This way the function is only created once and shared, rather than re-created
// every instantiation
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages long, ${
    this.read ? "already read" : "not read yet"
  }`;
};

// For testing
const hatred = new Book("A little Hatred", "Joe Abercrombie", "350", true);
const gravity = new Book(
  "Gravity's Rainbow",
  "David Foster Wallace",
  "6780",
  false
);
const prince = new Book("Prince of Thorns", "Mark Lawrence", "280", true);
const spot = new Book("Spot goes to the Zoo", "Arthur B. Legend", "27", false);

myLibrary.push(hatred, gravity, prince, spot);

const addBook = function addBookToLibrary(title, author, pages, read, library) {
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
  return library;
};

console.table(myLibrary);

// DOM / EVENT LISTENERS

const createCard = function createCardHTML(book) {
  return `<p>${book.title}</p>
  <p>${book.author}</p>
  <p>${book.pages}</p>
  <p>${book.read}</p>`;
};

const addCard = function addCardToDocument(book) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = createCard(book);
  libraryContainer.append(newCard);
};

const libraryContainer = document.querySelector(".card-container");
const addBookButton = document.querySelector(".add-entry");
addBookButton.addEventListener("click", addCard);

// Local Storage mess around =>

/*
Use localStorage.setItem or .getItem. To store an array or object we need to call
JSON.stringify(library) when storing and JSON.parse(library) when retrieving it


*/
