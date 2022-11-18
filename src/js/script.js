const booksData = dataSource.books;
console.log(booksData);

const selectors = {
  booksPanel: {
    ul: '.books-list',
    li: '.books-list .book',
    img: 'book__image',
  },
  forms: {
    filter: '.filters',
    filterInputs: '.filters input',
  }
};

const domElements = {
  booksPanel: {
    list: document.querySelector(selectors.booksPanel.ul),
  },
  forms: {
    filtersForm: document.querySelector(selectors.forms.filter),
  },
};

const templates = {
  booksTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

function renderBookPanel (booksData) {
  for (let book of booksData){
    const booksGeneratedHTML = templates.booksTemplate(book);

    const domElement = utils.createDOMFromHTML(booksGeneratedHTML);

    domElements.booksPanel.list.appendChild(domElement);
  }
}

renderBookPanel(booksData);

// -----------------------------------Add listener to books 1---------------------------

// const listElements = document.querySelectorAll(selectors.booksPanel.li);
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

function filteringBooks(event) {
  if(event.target.localName === 'input'){

    if(event.target.checked){
      const targetValue = event.target.value;

      for ( let book of booksData){

        if( book.details[targetValue]){
          const bookId = book.id;
          const filteredBooks = document.querySelectorAll('[data-id="' + bookId +'"]');

          for ( let filteredBook of filteredBooks){
            filteredBook.classList.add('hidden');
          }
        }
      }
    } else {
      console.log(event.target.value, 'has been unchecked');

      const targetValue = event.target.value;
      for ( let book of booksData){

        if( book.details[targetValue]){
          const bookId = book.id;
          const filteredBooks = document.querySelectorAll('[data-id="' + bookId +'"]');

          for ( let filteredBook of filteredBooks){
            filteredBook.classList.remove('hidden');
          }
        }
      }
    }
  }
}

domElements.booksPanel.list.addEventListener('dblclick', initAction);

domElements.forms.filtersForm.addEventListener('change', filteringBooks);