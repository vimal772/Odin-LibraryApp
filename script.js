// const addItem = document.querySelector('.addItem');
const collectionBooks = [];
let     newArr = [];
let isLoged = false;

// This is a Constructor for adding books
// function Book(title,author,pages,isRead) {
//     this.title = title
//     this.author = author
//     this.pages = pages
//     this.isRead = isRead
//     this.info = function() {
//         return (`${title} By ${author}, ${pages} pages, ${isRead} yet`);
//     }
// }

class Book {
    constructor(title,author,pages,isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead; 
    }

    info() {
        return (`${this.title} By ${this.author}, ${this.pages}, ${this.isRead} Yet`)
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
    if(!isLoged){
        loginModal.showModal();
    }else{
        modal.showModal();
    }
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
    
    if(bookTitle){
        if(bookAuthor){
            if(page){
                pushObject(bookTitle,bookAuthor,page,isRead);
                addBookCard(bookTitle,bookAuthor,page,isRead);
                countBooks();

                storeInLocaleStorage();
            }else{
                return;
            }
        }else{
            return;
        }
    }else{
        return;
    }
})

function addBookCard(title,author,pages,isRead) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    const div = document.createElement('div');
    div.classList.add('card-container');
    const heading = document.createElement('h2');
    heading.textContent = title;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "DELETE";
    deleteBtn.classList.add('deleteBtn');
    div.appendChild(heading);
    div.appendChild(deleteBtn);
    const writer = document.createElement('p');
    writer.textContent = author;
    const noOfPage = document.createElement('p');
    noOfPage.textContent = pages
    const readed = document.createElement('p');
    readed.textContent = isRead;

    bookCard.appendChild(div);
    bookCard.appendChild(writer);
    bookCard.appendChild(noOfPage);
    bookCard.appendChild(readed);

    const main = document.querySelector('.main');
    deleteBtn.addEventListener("click",()=> {
        bookCard.remove();
    })
    main.appendChild(bookCard);
}

function countBooks() {
    let length = collectionBooks.length;
    const para = document.querySelector('.count');
    para.textContent = length;
}

const myForm = document.querySelector('.dialogForm');

myForm.addEventListener('submit',(e) => {
    myForm.reset();
    modal.close();
    e.preventDefault();
})


// storing and retriving data in local storage
function storeInLocaleStorage() {
    const arrayString = JSON.stringify(collectionBooks);
    localStorage.setItem("booksArr",arrayString);
}

function retriveArray() {
    const arrayString = localStorage.getItem("booksArr");
    if(arrayString === null){
        return;
    }else{
        newArr = JSON.parse(arrayString);
        newArr = Array.from(newArr);
        newArr.forEach(arr => {
            collectionBooks.push(arr);
            addBookCard(arr.title,arr.author,arr.pages,arr.isRead);             
        })
    }
}


document.addEventListener('DOMContentLoaded',() => {
    retriveArray();
    countBooks();
});


const icon = document.querySelector('.header > .login-icon');
const loginModal = document.querySelector('.modal-login');
const closeBtn = document.querySelector('.btn-close');
const form = document.querySelector('.modal-form');  

icon.addEventListener('click',()=> {
    loginModal.showModal();

})

closeBtn.addEventListener('click',()=> {
    loginModal.close();
})

const submitForm = document.querySelector('.btn-submit');

submitForm.addEventListener('click',(event)=> {
    event.preventDefault()
    document.querySelector('.showMsg').textContent = ''
    checkFormValidity();
})

function checkFormValidity() {
    if(!form.checkValidity()){
        document.querySelector('.showMsg').textContent = "Please Fill the Above Form";
        form.reportValidity();
    }else {
        isLoged = true;
        loginModal.close()
    }
}

form.addEventListener('input',(event)=> {
    const target = event.target;
    const validity = target.validity
    console.log(validity);
    
    if(target.id === 'email' ){
        const nextSpan = document.querySelector("#myModal > form > div:nth-child(1) > span")
        if(validity.valueMissing)   nextSpan.textContent = 'Email is required';
        nextSpan.textContent = ''
    }
    if(target.id === 'country' ){
        const nextSpan = document.querySelector("#myModal > form > div:nth-child(2) > span")
        if(validity.valueMissing)   nextSpan.textContent = 'Enter Valid Country';
        if(validity.tooShort) nextSpan.textContent = 'Type Fullname of the Country'
        if(validity.tooLong) nextSpan.textContent = 'Use shortName of the Country'
        else nextSpan.textContent = ''
    }
    if(target.id === 'zip' ){
        const nextSpan = document.querySelector("#myModal > form > div:nth-child(3) > span")
        const isValid = /^\d{3}-\d{3}$/.test(target.value);
        if(validity.valueMissing)  {
            nextSpan.textContent = 'Zip code Must be 6 digit';  
        } 
        if(!isValid) {
            nextSpan.textContent = 'follow this format XXX-XXX'
        }else {
            nextSpan.textContent = ''
        }
    }
})