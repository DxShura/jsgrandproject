
const buttonSend = document.getElementById('send');
const bookShelf = document.getElementById('bookShelf');
let library = [];

buttonSend.addEventListener('click', addBookToLibrary);

function Book(title, author, pages, read){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
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
	render();
}

function deleteBook() {
  library.splice(this.dataset.bookNumber, 1);
  let deleteRow = document.getElementById(this.dataset.bookNumber);
  deleteRow.parentNode.removeChild(deleteRow);
}

function render(){
	let tableRow = document.createElement('tr');
	let tableTitle = document.createElement('td');
	let tableAuthor = document.createElement('td');
	let tablePages = document.createElement('td');
	let tableRead = document.createElement('td');
	let deleteButton = document.createElement('button');
	deleteButton.textContent = 'Supprimer';

	library.forEach((book, index) => {
		tableRow.id = index;
		deleteButton.className = 'delete_Button';
		tableTitle.textContent = `${book.title}`;
		tableAuthor.textContent = `${book.author}`;
		tablePages.textContent = `${book.pages}`;
		tableRead.textContent = `${book.read}`;

		tableRow.appendChild(tableTitle);
		tableRow.appendChild(tableAuthor);
		tableRow.appendChild(tablePages);
		tableRow.appendChild(tableRead);

		deleteButton.dataset.bookNumber = index;
		deleteButton.addEventListener("click", deleteBook);

		tableRow.appendChild(deleteButton);

		bookShelf.appendChild(tableRow);

	});

}


