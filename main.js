const bookObject = [];
const RENDER_EVENT = "render-book";

document.addEventListener(RENDER_EVENT, function () {
  // console.log(bookObject);
  const incompleteBookList = document.getElementById("incompleteBookList");
  incompleteBookList.innerHTML = "";
  const completeBookList = document.getElementById("completeBookList");
  completeBookList.innerHTML = "";

  for (const book of bookObject) {
    const bookElement = makeBook(book);
    if (book.bookFormIsComplete == true) {
      completeBookList.append(bookElement);
    } else {
      incompleteBookList.append(bookElement);
    }
  }
});
function chekForStorage() {
  return typeof Storage !== "undefined";
}

// console.log(chekForStorage());

document.addEventListener("DOMContentLoaded", function () {
  const bookForm = document.getElementById("bookForm");
  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
});

function generateBookResult() {
  return bookObject.length + 1;
}

function generateBookId(bookFormTitle, bookFormAuthor, bookFormYear, bookFormIsComplete) {
  return {
    bookFormTitle,
    bookFormAuthor,
    bookFormYear,
    bookFormIsComplete,
  };
}
function addBook() {
  const bookFormTitle = document.getElementById("bookFormTitle").value;
  const bookFormAuthor = document.getElementById("bookFormAuthor").value;
  const bookFormYear = document.getElementById("bookFormYear").value;
  const bookFormIsComplete = document.getElementById("bookFormIsComplete").value;

  const timeStamp = generateBookResult();
  const newBookObject = generateBookId(bookFormTitle, bookFormAuthor, bookFormYear, bookFormIsComplete, timeStamp); // Memanggil generateBookId
  bookObject.push(newBookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBook(bookObject) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = bookObject.bookFormTitle;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = `Penulis: ${bookObject.bookFormAuthor}`;

  const textYear = document.createElement("div");
  textYear.innerText = `Tahun: ${bookObject.bookFormYear}`;
  textYear.appendChild(textTitle);

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.appendChild(textTitle);
  textContainer.appendChild(textAuthor);
  textContainer.appendChild(textYear);
  textContainer.setAttribute("data-test-id", `book-item-${bookObject.id}`);
  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.setAttribute("data-bookid", bookObject.id);
  return container;
}
