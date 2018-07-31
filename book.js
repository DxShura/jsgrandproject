
const buttonSend = document.getElementById('send');
const bookShelf = document.getElementById('bookShelf');
let library = [];
let bookIndex = 0;

buttonSend.addEventListener('click', addBookToLibrary)

function Book(title, author, pages, read){
	bookIndex += 1;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.bookIndex = bookIndex;
	this.info = function(){
		return title + ' by ' + author + ', ' + pages + 'pages' + ', ' + read;
	}
}

function addBookToLibrary(){
	const title = document.querySelector("input[name='title']");
	const author = document.querySelector("input[name='author']");
	const pages = document.querySelector("input[name='pages']");
	const read = document.querySelector("input[name='read']");
	addBook = new Book(title.value, author.value, pages.value, read.value);
	library.push(addBook);
	console.log(library);
	console.log(bookIndex);
	render(library);
}

function render(books){
	let tableRow = document.createElement('tr');
	let tableTitle = document.createElement('td');
	let tableAuthor = document.createElement('td');
	let tablePages = document.createElement('td');
	let tableRead = document.createElement('td');

	books.forEach((book, index) => {	
		tableTitle.textContent = `${book.title}`;
		tableAuthor.textContent = `${book.author}`;
		tablePages.textContent = `${book.pages}`;
		tableRead.textContent = `${book.read}`;

		tableRow.appendChild(tableTitle);
		tableRow.appendChild(tableAuthor);
		tableRow.appendChild(tablePages);
		tableRow.appendChild(tableRead);

		bookShelf.appendChild(tableRow);	
	});
}
