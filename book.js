
const buttonSend = document.getElementById('send');
let library = [];

buttonSend.addEventListener('click', addBookToLibrary)

function Book(title, author, pages, read){
	this.titles = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function(){
		return title + ' by ' + author + ', ' + pages + 'pages' + ', ' + read;
	}
}

function addBookToLibrary(){
	const titles = document.querySelector("input[name='title']");
	const author = document.querySelector("input[name='author']");
	const pages = document.querySelector("input[name='pages']");
	const read = document.querySelector("input[name='read']");
	const addBook = new Book(titles.value, author.value, pages.value, read.value);
	library.push(addBook);
	console.log(library);
}

const theHobbit = new Book('The Hobbit','J.R.R Tolkien','295','not read yet');
console.log(theHobbit.info());