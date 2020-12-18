const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages long, ${this.read ? 'already read' : 'not read yet'}`
  }
}

// For testing
const hatred = new Book('A little Hatred', 'Joe Abercrombie', '350', true);
const gravity = new Book('Gravity\'s Rainbow', 'David Foster Wallace', '6780', false);
const prince = new Book('Prince of Thorns', 'Mark Lawrence', '280', true)
const spot = new Book ('Spot goes to the Zoo', 'Arthur B. Legend', '27', false)

console.log(hatred.info())
