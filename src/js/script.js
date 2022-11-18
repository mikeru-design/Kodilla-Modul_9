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

const templates = {
  booksTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

class BooksList {

  constructor(booksData){

    this.getDomElements();
    this.renderBookPanel(booksData);
    this.initAction();
  }

  getDomElements() {
    this.list = document.querySelector(selectors.booksPanel.ul);
    this.filtersForm = document.querySelector(selectors.forms.filter);
  }

  determineRatingBgc (rating) {
    let background = '';
    if( rating < 6 ){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }
    if( rating > 6 && rating <= 8 ){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }
    if( rating > 8 && rating <= 9 ){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    if( rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }

  renderBookPanel (booksData) {
    for (let book of booksData){

      book.ratingWidth = book.rating * 10;
      book.ratingBgc = this.determineRatingBgc(book.rating);

      const booksGeneratedHTML = templates.booksTemplate(book);

      const domElement = utils.createDOMFromHTML(booksGeneratedHTML);

      this.list.appendChild(domElement);
    }
  }

  initAction() {

    const favoriteBooks = [];

    this.list.addEventListener('dblclick', (event) => {

      if(event.target.localName === 'img' && event.target.parentElement.parentElement.classList.contains('book__image')){
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
    });

    this.forms.filtersForm.addEventListener('change', (event) => {
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
    });

  }
}

const app = new BooksList(booksData);

app();
