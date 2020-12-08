// Elements --------------------------------------------
const addBookForm = document.querySelector(".form-container");
const libraryContainer = document.querySelector(".card-container");
const addBookButton = document.querySelector(".add-entry");
const submitButton = document.querySelector("#submit-btn");

// Objects --------------------------------------------
class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

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
      deleteBook(this.id);
    });

    this.tickBox = this.element.querySelector(".read-tick");
    this.tickBox.addEventListener("change", () => {
      this.toggleRead();
      this.element.innerHTML = this.createCard();
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
    const readStatus = this.read ? false : true;
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

// If a library key exists in local storage, parse it and set it as our library. Else return a default library object
// with a counter for ids and an array for books
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
  return localStorage.setItem("library", JSON.stringify(myLibrary));
};

const addBook = function addBookToLibrary(title, author, pages, read, library) {
  const newBook = new Book(title, author, pages, read);
  library.books.push(newBook);
  return library;
};

// DOM Functions --------------------------------------------
const render = function renderCardsOnDOM(library = myLibrary) {
  libraryContainer.innerHTML = "";
  displayLibray(library.books);
  saveLibrary();
  console.table(library.books);
};

const deleteCard = function deleteCardFromDOM(idx, library = myLibrary) {
  library.books.splice(idx, 1); // Conceptually fine but the idx needs to be hooked up to the listener on the card of the item to be deleted
  render();
};

const toggle = function toggleFormPopup() {
  addBookForm.style.display === "block"
    ? (addBookForm.style.display = "none")
    : (addBookForm.style.display = "block");
};

const displayLibray = function displayLibraryOnDocument(
  library = myLibrary.books
) {
  for (book of library) {
    book.init();
  }
};

// This is mostly for testing and getting rid of garbage
function deleteLibrary() {
  myLibrary.books = [];
  displayLibray(myLibrary.books);
  saveLibrary();
}

function deleteBook(bookID) {
  const idx = myLibrary.books.findIndex((book) => book.id === bookID);
  myLibrary.books.splice(idx, 1);
  render();
}

// Listeners --------------------------------------------
addBookButton.addEventListener("click", toggle);

// Form stuff. IDs target respective fields inside submit form
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;
  const bookToAdd = new Book(title, author, pages, read, myLibrary.idCounter);
  myLibrary.idCounter++;
  myLibrary.books.push(bookToAdd);
  toggle();
  addBookForm.reset();
  render();
});

// Declarations --------------------------------------------
const myLibrary = checkStorage();

// Running the scripts --------------------------------------------
displayLibray(myLibrary.books);
