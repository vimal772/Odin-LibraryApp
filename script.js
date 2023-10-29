const addItem = document.querySelector('.addItem');
const collectionBooks = [];

addItem.addEventListener('click',() => {
    console.log("hello");
});

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