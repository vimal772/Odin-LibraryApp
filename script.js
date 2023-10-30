// const addItem = document.querySelector('.addItem');
const collectionBooks = [];

// This is a Constructor for adding books
function Book(title,author,pages,isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.info = function() {
        return (`${title} By ${author}, ${pages} pages, ${isRead} yet`);
    }
}

function pushObject(){

}


//dialog toggle code below
const addItem = document.querySelector('.addItem');
const cancelBtn = document.querySelector('.closeModal');
const addBook = document.querySelector('.submitBtn');
const modal = document.querySelector('.modal');

addItem.addEventListener('click', () => {
    modal.showModal();
})

cancelBtn.addEventListener('click',() => {
    modal.close();
})