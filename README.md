# Library

Project for Odin to practice basic object construction

## TODO

Next problem: connecting objects with their DOM representation. Maintains methods and allows deletion etc

### Core Logic

- [x] Add a delete button to the card
  - [ ] ID or something similar?
- [ ] Read toggle
 - [ ] Add function to book prototype
- [ ] Update DOM properly on data change (adding, deleting) - care of duplication
- [ ] Need to use object.assign when destringifying?

### Code Organisation

- [x] Group code into sections
  - [x] Elements
  - [x] Objects
  - [x] Functions
  - [x] Listeners
- [ ] README

### UI
- [x] Turn the form into a popup
- [ ] CSS Reset
- [ ] Fonts
- [ ] Colours
- [ ] Various stylings (cards, buttons, etc)

### UX
- [x] Clear form data on submission
- [x] Pop down on submission
- [ ] Fully responsive

### Bonus Features

- [x] Refactor to classes
- [ ] Add firebase (plus option to choose?)
- [ ] Add a view toggle (table / card)
- [ ] Recipie version with links and ratings

Think about app flow.
* Button is clicked
* Form comes up
* Book is created and pushed to array
* displayBooks is called to update DOM
* library is copied to localstorage
