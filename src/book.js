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
      deleteBook(this.id);
    });

    this.tickBox = this.element.querySelector(".read-tick");
    this.tickBox.addEventListener("change", () => {
      this.toggleRead();
      this.element.innerHTML = this.createCard(); // Probably a better way to do this than destroying the entire card and readding listeners
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
    const readStatus = this.read ? false : true;
    this.read = readStatus;
    return this; // Not really needed here but good practice as it allows us to chain methods
  }
}

export default Book;
