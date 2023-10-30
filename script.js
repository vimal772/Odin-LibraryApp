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

function pushObject(title,author,pages,isRead){
    collectionBooks.push(new Book(title,author,pages,isRead));
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

//dialog box form value
const submitBtn = document.querySelector('.submitBtn');

// submitBtn.addEventListener('click', () => {
//     const form = document.querySelector('.dialogForm');
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const data = new FormData(e.target);
//         const name = data.get("bookName");
//         console.log(name);
//     })
//     modal.close();
// })

submitBtn.addEventListener('click', ()=> {
    const bookTitle = document.querySelector('#bookName').value;
    const bookAuthor = document.querySelector('#bookWriter').value;
    const page = document.querySelector('#pages').value;
    const isRead = document.querySelector('input[name="isRead"]:checked').getAttribute("value");
    
    pushObject(bookTitle,bookAuthor,page,isRead);
    addBookCard(bookTitle,bookAuthor,page,isRead);
    countBooks();
})

function addBookCard(title,author,pages,isRead) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const heading = document.createElement('h2');
    heading.textContent = title;
    const writer = document.createElement('p');
    writer.textContent = author;
    const noOfPage = document.createElement('p');
    noOfPage.textContent = pages
    const readed = document.createElement('p');
    readed.textContent = isRead;

    bookCard.appendChild(heading);
    bookCard.appendChild(writer);
    bookCard.appendChild(noOfPage);
    bookCard.appendChild(readed);

    const main = document.querySelector('.main');
    main.appendChild(bookCard);
}

function countBooks() {
    let length = collectionBooks.length;
    const para = document.querySelector('.count');
    para.textContent = length;
}