
const buttonSend = document.getElementById('send');
const bookShelf = document.getElementById('bookShelf');
let library = [];
let checkedButton;

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
	addBook = new Book(title.value, author.value, pages.value, read.checked);
	library.push(addBook);
	console.log(library);
	render();
}

function deleteBook() {
  library.splice(this.dataset.bookNumber, 1);
  let deleteRow = document.getElementById(this.dataset.bookNumber);
  deleteRow.parentNode.removeChild(deleteRow);
}

function readBook(e){
	if(`${e.read}` === 'true') {
		checkedButton.textContent = 'v';
	}else{
		checkedButton.textContent = 'x';
	}
}

Book.prototype.switchReadBook = function(){
		library[this.dataset.bookNumber].read = !library[this.dataset.bookNumber].read;
		let a = document.getElementById(this.dataset.bookNumber);
		if(library[this.dataset.bookNumber].read){
			a.childNodes[3].childNodes[0].innerHTML = "v";
		}else{
			a.childNodes[3].childNodes[0].innerHTML = "x";
		}

}

function render(){
	let tableRow = document.createElement('tr');
	let tableTitle = document.createElement('td');
	let tableAuthor = document.createElement('td');
	let tablePages = document.createElement('td');
	let tableRead = document.createElement('td');
	checkedButton = document.createElement('button');
	let deleteButton = document.createElement('button');
	deleteButton.textContent = 'Supprimer';

	library.forEach((book, index) => {
		tableRow.id = index;
		deleteButton.className = 'delete_Button';
		tableTitle.textContent = `${book.title}`;
		tableAuthor.textContent = `${book.author}`;
		tablePages.textContent = `${book.pages}`;
		readBook(book);

		tableRow.appendChild(tableTitle);
		tableRow.appendChild(tableAuthor);
		tableRow.appendChild(tablePages);
		tableRow.appendChild(tableRead);
		tableRead.appendChild(checkedButton);

		checkedButton.dataset.bookNumber = index;
		checkedButton.addEventListener("click", book.switchReadBook);

		deleteButton.dataset.bookNumber = index;
		deleteButton.addEventListener("click", deleteBook);

		tableRow.appendChild(deleteButton);

		bookShelf.appendChild(tableRow);

	});

}


