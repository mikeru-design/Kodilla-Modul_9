const booksData = dataSource.books;
console.log(booksData);

const Selectors = {
  booksPanel: {
    ul: '.books-list',
    li: '.books-list .book',
    img: 'book__image',
  }
};

const DOMElements = {
  booksPanel: {
    list: document.querySelector(Selectors.booksPanel.ul),
  }
};


for (let book of booksData){
  const booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const booksGeneratedHTML = booksTemplate(book);

  const DOMElement = utils.createDOMFromHTML(booksGeneratedHTML);

  DOMElements.booksPanel.list.appendChild(DOMElement);
}

// -----------------------------------Add listener to books 1---------------------------

// const listElements = document.querySelectorAll(Selectors.booksPanel.li);
// console.log(listElements);

// for ( let listElement of listElements){
//   listElement.addEventListener('click', () => {

//     let listElementsFavorite = document.querySelectorAll('.book__image.favorite');
//     let listElementsFavoriteArray = Array.from(listElementsFavorite);

//     if(listElementsFavoriteArray.length === 0){
//       listElement.querySelector('.book__image').classList.add('favorite');
//     }
//     else if(listElementsFavoriteArray.includes(listElement.querySelector('.book__image'))){
//       listElement.querySelector('.book__image').classList.remove('favorite');
//     }
//     else if (listElementsFavoriteArray.length !== 0 && !listElementsFavoriteArray.includes(listElement.querySelector('.book__image'))){

//       for (let elementFavorite of listElementsFavoriteArray){
//         elementFavorite.classList.remove('favorite');
//       }
//       listElement.querySelector('.book__image').classList.add('favorite');
//     }
//   });
// }

// -----------------------------------Add listener to books 2---------------------------

const favoriteBooks = [];

const books = document.querySelectorAll(Selectors.booksPanel.li);
const booksArray = Array.from(books);
console.log('booksArray: ',booksArray);

function initAction(event) {
  if(event.target.localName === 'img'){
    const bookIMG = event.target.parentElement.parentElement;
    bookIMG.classList.toggle('favorite');

    if(bookIMG.classList.contains('favorite')){
      const bookId = bookIMG.getAttribute('data-id');
      const bookTitle = bookIMG.parentElement.querySelector('.book__name').innerHTML;
      favoriteBooks.push(bookId + '. ' + bookTitle);

      console.log('favoriteBooks: ',favoriteBooks);
    } else {
      const bookId = bookIMG.getAttribute('data-id');
      const bookTitle = bookIMG.parentElement.querySelector('.book__name').innerHTML;
      const bookIdIndex = favoriteBooks.indexOf(bookId + '. ' + bookTitle);
      favoriteBooks.splice(bookIdIndex, 1);

      console.log('favoriteBooks: ',favoriteBooks);
    }}
}

DOMElements.booksPanel.list.addEventListener('dblclick', initAction);