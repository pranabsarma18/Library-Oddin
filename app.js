class Book {
    constructor(bookTitle, authorName, pagesCount, isRead) {
            this.bookID = crypto.randomUUID();
            this.title = bookTitle;
            this.author = authorName;
            this.pages = pagesCount;
            this.read = isRead;
    }
    
    toogleRead() {
        if (this.read === true) {
            this.read = false
        }
        else {
        this.read = true
        }
    }
}

class Library {
    #index;
    #myLibrary;

    constructor() {
        this.#myLibrary = [
            new Book("The Great Gatsby", "F. Scott Fitzgerald", "180", true),
            new Book("To Kill a Mockingbird", "Harper Lee", "281", true),
            new Book("1984", "George Orwell", "328", false),
            new Book("The Hobbit", "J.R.R. Tolkien", "310", true),
            new Book("Pride and Prejudice", "Jane Austen", "279", false),
            new Book("The Alchemist", "Paulo Coelho", "208", true),
            new Book("The Catcher in the Rye", "J.D. Salinger", "234", false),
            new Book("Atomic Habits", "James Clear", "320", true),
            new Book("The Kite Runner", "Khaled Hosseini", "371", true),
        ];
    }

    get books() {
        return this.#myLibrary;
    }

    addBook(book) {
        this.#myLibrary.push(book)
    }

    deleteBook(id) {
        this.#index = this.#myLibrary.findIndex(book => book.bookID === id);
        console.log(this.#index)
        if (this.#index !== -1) {
            this.#myLibrary.splice(this.#index, 1);
        }
    }
}


class DisplayController {
    #container;
    #library;
    #books;
    #book_obj;
    #addFormButton;
    #book;
    #author;
    #pages;
    #read;
    #bookDels;
    #DeletebookID;

    constructor() {
        this.#library = new Library();
        this.#books = this.#library.books;
        this.#addFormButton = document.querySelector("#book-form > button")
        this.#container = document.querySelector(".book-container");
        console.log(this.#bookDels)
    }

    renderPage() {
        this.#container.textContent = ""
        console.log(this.#books)
        this.#books.forEach((obj) => {
            const article = document.createElement("div");
            article.classList.add("book");

            const bookTitle = document.createElement("div");
            bookTitle.classList.add("book-name");
            bookTitle.textContent = "Book Title: ";
            const span = document.createElement("span")
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
            this.#container.appendChild(article)

            readCheck.addEventListener("click", (e) => {
            console.log("inside toggle")
            obj.toogleRead()
            this.renderPage()
            }
        )
    } )
    }

    addBookEventListener() {
        this.#addFormButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.#book = document.querySelector("input#title").value;
            this.#author = document.querySelector("input#author").value;
            this.#pages = document.querySelector("input#pages").value;
            this.#read = document.querySelector("input#read").checked ? true : false;

            this.#book_obj = new Book(this.#book, this.#author, this.#pages, this.#read);
            this.#library.addBook(this.#book_obj)
            this.renderPage()
            // this.deletBookEventListener()
            console.log("Book is added")
        })
    }

    deletBookEventListener() {
            this.#container.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(e.target);
            this.#DeletebookID = e.target.getAttribute("data-id");
            console.log(e.target.getAttribute)
            if (e.target.getAttribute("type") === "submit") {
            this.#library.deleteBook(this.#DeletebookID);
            this.renderPage();
            console.log("Book is deleted")
            }
        })
}
}


controller = new DisplayController();
controller.renderPage();
controller.addBookEventListener();
controller.deletBookEventListener();