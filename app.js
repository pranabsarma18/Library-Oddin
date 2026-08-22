const myLibrary = [];

function Book(bookTitle, authorName, pagesCount, isRead) {
    this.bookID = crypto.randomUUID();
    this.title = bookTitle;
    this.author = authorName;
    this.pages = pagesCount;
    this.read = isRead;

}

Book.prototype.toogleRead = function () {
    if (this.read === true) {
        this.read = false
    }
    else {
        this.read = true
    }
}

function addBookToLibrary(bookTitle, authorName, pagesCount, isRead) {
  // take params, create a book then store it in the array
  book = new Book(bookTitle, authorName, pagesCount, isRead);
  myLibrary.push(book)
}

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", "180", true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "281", true);
addBookToLibrary("1984", "George Orwell", "328", false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310", true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", "279", false);
addBookToLibrary("The Alchemist", "Paulo Coelho", "208", true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", "234", false);
addBookToLibrary("Atomic Habits", "James Clear", "320", true);
addBookToLibrary("The Kite Runner", "Khaled Hosseini", "371", true);

const container = document.querySelector(".book-container");
function display() {
    container.textContent = ""
    myLibrary.forEach(function(obj) {
        const article = document.createElement("div");
        article.classList.add("book");

        const bookTitle = document.createElement("div");
        bookTitle.classList.add("book-name");
        bookTitle.textContent = "Book Title: ";
        span = document.createElement("span")
        span.classList.add("bold")
        span.textContent = `${obj.title}`
        bookTitle.appendChild(span)

        const authorName = document.createElement("div");
        authorName.classList.add("author");
        authorName.textContent = `Author Name: ${obj.author}`

        const pagesCount = document.createElement("div");
        pagesCount.classList.add("page-count");
        pagesCount.textContent = `Total Number of pages: ${obj.pages}`

        const isRead = document.createElement("div");
        isRead.classList.add("is-read");
        const readCheck = document.createElement("input")
        readCheck.setAttribute("type", "checkbox")
        readCheck.setAttribute("data-id", obj.bookID)
        if (obj.read === true) {
            readCheck.checked = true
        }
        isRead.textContent = `Done Reading?: ${obj.read}`

        const deleteBtn = document.createElement("button")
        deleteBtn.setAttribute("type", "submit")
        deleteBtn.setAttribute("data-id", obj.bookID)
        deleteBtn.textContent = "Delete Book"

        article.append(bookTitle, authorName, pagesCount, readCheck, isRead, deleteBtn)
        container.appendChild(article)

        readCheck.addEventListener("click", (e) => {
        console.log("inside toggle")
        obj.toogleRead()
        display()
        }
    )
    } )
    
    const bookDels = document.querySelectorAll(".book button");
    bookDels.forEach(function(delBtn) {
    delBtn.addEventListener("click", (e) => {
        var bookID = e.target.getAttribute("data-id");
        console.log(bookID)
        deleteBook(bookID)
    })
}
)
}

display()

const addFormButton = document.querySelector("#book-form > button")
addFormButton.addEventListener("click", function (event) {
    event.preventDefault();
    const book = document.querySelector("input#title").value;
    const author = document.querySelector("input#author").value;
    const pages = document.querySelector("input#pages").value;
    const read = document.querySelector("input#read").checked ? true : false;

    book_obj = new Book(book, author, pages, read);
    myLibrary.push(book_obj)
    display()
    
    console.log("Book is added")
})

function deleteBook(id) {
    const index = myLibrary.findIndex(book => book.bookID === id);
    
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
    display()
}




