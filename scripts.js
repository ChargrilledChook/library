/* Contents
 Elements
 Classes
 Functions
 DOM Functions
 Listeners
 Declarations
 Run script
*/

//  Elements --------------------------------------------

const addBookForm = document.querySelector(".form-container");
const libraryContainer = document.querySelector(".card-container");
const addBookButton = document.querySelector(".add-entry");
const submitButton = document.querySelector("#submit-btn");

//  Classes --------------------------------------------

class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  // Initialises all DOM logic for the object
  init() {
    this.element = document.createElement("div");
    this.element.classList.add("card");
    this.element.id = `book${this.id}`;
    this.element.innerHTML = this.createCard();
    libraryContainer.append(this.element);
    this.addListeners();
  }

  addListeners() {
    this.deleteButton = this.element.querySelector(".delete-btn");
    this.deleteButton.addEventListener("click", () => {
      myLibrary.deleteBook(this.id);
    });

    this.tickBox = this.element.querySelector(".read-tick");
    this.tickBox.addEventListener("change", () => {
      this.toggleRead();
      // Probably a better way to do this than destroying the entire card and readding listeners
      this.element.innerHTML = this.createCard();
      this.tickBox.checked = this.read.toString();
      this.addListeners();
    });
  }

  createCard() {
    return `
    <h2>${this.title}</h2>
    <p>${this.author}</p>
    <p>${this.pages} pages</p>
    <div>${
      this.read === true ? "Read" : "Not Read"
    }<input class="read-tick" type="checkbox"></div>
    <button class="delete-btn">Delete</button>`;
  }

  toggleRead() {
    const readStatus = !this.read;
    this.read = readStatus;
    return this; // Not really needed here but good practice as it allows us to chain methods
  }
}

// Functions --------------------------------------------

// When storing class objects as JSON they become generic objects when deserialised. They
// need to be reconverted each time we retrieve them from storage
const revive = function reviveObjectsToBooks(obj) {
  return new Book(obj.title, obj.author, obj.pages, obj.read, obj.id);
};

// If a library key exists in local storage, parse it and set it as our library.
// Else return a default library object with a counter for ids and an array for books
const checkStorage = function checkStorageForLibraryArray() {
  if (!localStorage.getItem("library")) return new Library(libraryContainer);

  const deserialisedLibrary = JSON.parse(localStorage.getItem("library"));
  deserialisedLibrary.books = deserialisedLibrary.books.map(revive);
  return deserialisedLibrary;
};

const saveLibrary = function saveLibraryToLocalStorage() {
  return localStorage.setItem("library", JSON.stringify(myLibrary));
};

// DOM Functions --------------------------------------------

// Probably a more efficient way to render than redoing the entire screen every time;
// but for now it's not noticeable
// const render = function renderCardsOnDOM(library = myLibrary) {
//   libraryContainer.innerHTML = "";
//   displayLibray(library.books);
//   saveLibrary();
//   console.table(library.books);
// };

const toggle = function toggleFormPopup() {
  addBookForm.style.display === "block"
    ? (addBookForm.style.display = "none")
    : (addBookForm.style.display = "block");
};

// const displayLibray = function displayLibraryOnDocument(
//   library = myLibrary.books
// ) {
//   for (const book of library) {
//     book.init();
//   }
// };

// const deleteBook = function deleteBook(bookID) {
//   const idx = myLibrary.books.findIndex((book) => book.id === bookID);
//   myLibrary.books.splice(idx, 1);
//   render();
// };

// Listeners --------------------------------------------

addBookButton.addEventListener("click", toggle);

// Form stuff. IDs target respective fields inside submit form
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const isFormValid = addBookForm.checkValidity();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  if (isFormValid) {
    const bookToAdd = new Book(title, author, pages, read, myLibrary.idCounter);
    myLibrary.addBook(bookToAdd);
    toggle();
    addBookForm.reset();
    myLibrary.renderCards();
  }
});

class Library {
  constructor(container, idCounter = 0, books = []) {
    this.container = container;
    this.idCounter = idCounter;
    this.books = books;
  }
  renderCards() {
    this.container.innerHTML = "";
    this.displayBooks();
    saveLibrary();
    console.table(this.books);
  }

  deleteBook(bookID) {
    const idx = this.books.findIndex((book) => book.id === bookID);
    this.books.splice(idx, 1);
    this.renderCards();
    return this;
  }

  addBook(book) {
    this.books.push(book);
    this.idCounter += 1;
    return this;
  }

  displayBooks() {
    for (const book of this.books) {
      book.init();
    }
    return this;
  }
}
// Declarations --------------------------------------------

const myLibrary = new Library(libraryContainer);

// Running the scripts --------------------------------------------

myLibrary.displayBooks();
