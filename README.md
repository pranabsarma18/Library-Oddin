# Library App

A small browser-based library app for keeping track of books you have read and books still on your reading list.

## Features

- Displays a starter collection of books
- Adds books with a title, author, page count, and reading status
- Toggles a book's read status using a checkbox
- Removes books from the library
- Creates a unique ID for every book with `crypto.randomUUID()`

## Run locally

No dependencies or build step are required.

1. Open `index.html` in a modern web browser.
2. Click **Add more Books** to open the book form.
3. Fill in the form and select **Add Book**.

For the best development experience, serve the folder with a local development server (for example, VS Code's Live Server extension).

## Project structure

```
.
├── index.html  # Page structure and add-book dialog
├── style.css   # Application styles
└── app.js      # Book, Library, and DisplayController classes
```

## Implementation overview

- `Book` represents one book and stores its metadata and read status.
- `Library` owns the collection of books and provides add/delete operations.
- `DisplayController` renders the library and connects the UI to the library data.

## Notes

Books are stored in memory only. Refreshing the page restores the default starter collection; no data is persisted yet.
