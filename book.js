const buttonSend = document.querySelector('#send');
const bookShelf = document.querySelector('#bookShelf');
const title = document.querySelector("input[name='title']");
const author = document.querySelector("input[name='author']");
const pages = document.querySelector("input[name='pages']");
const read = document.querySelector("input[name='read']");
let paraEmptyInput = document.getElementsByClassName('warningEmptyInput')[0];
let library = [];
let checkedButton;
let bookIndex;

buttonSend.addEventListener('click', addBookToLibrary);

if(localStorage){
	restore();
}

function store(){
	library.forEach((book, index) => {
		localStorage.setItem(`${index}-title`, book.title);
		localStorage.setItem(`${index}-author`, book.author);
		localStorage.setItem(`${index}-pages`, book.pages);
		localStorage.setItem(`${index}-read`, book.read);
	});
	localStorage.setItem('lastindex', bookIndex);
}

function restore(){
	let i = 0;
	while(localStorage.getItem(`${i}-title`)){
		const restoredBook = new Book(localStorage.getItem(`${i}-title`),
								localStorage.getItem(`${i}-author`),
								localStorage.getItem(`${i}-pages`),
								JSON.parse(localStorage.getItem(`${i}-read`)));
		library.push(restoredBook);
		i++;
		render();
	}
	bookIndex = Number(localStorage.getItem('lastindex'));
	if(bookIndex === 0){
		bookIndex = -1;
	}else if(bookIndex === -2){
		bookIndex = -1;
	}
	if(library.length === 0){
		localStorage.clear();
	}
	
}
function Book(title, author, pages, read){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(){
	let titleEmpty;
	let authorEmpty;
	let pagesEmpty;
	let addBook;

	if(title.value.trim().length){
		titleEmpty = true;
	}else{
		titleEmpty = false;
		title.classList.add('emptyInput');
		paraEmptyInput.classList.add('displayVisible');
	}

	if(author.value.trim().length){
		authorEmpty = true;
	}else{
		authorEmpty = false;
		author.classList.add('emptyInput');
		paraEmptyInput.classList.add('displayVisible');
	}

	if(pages.value.trim().length){
		pagesEmpty = true;
	}else{
		pagesEmpty = false;
		pages.classList.add('emptyInput');
		paraEmptyInput.classList.add('displayVisible');
	}

	if(titleEmpty === true && authorEmpty === true && pagesEmpty === true){
		addBook = new Book(title.value, author.value, pages.value, read.checked);
		library.push(addBook);
		bookIndex++;
		render();
		store();
		quitForm();
		emptyInput();
	}
}

function deleteBook() {
	library = library.slice(0, this.dataset.bookNumber).concat(library.slice(Number(this.dataset.bookNumber)+1, library.length));
	
	let deleteRow = document.getElementById(this.dataset.bookNumber);
	deleteRow.parentNode.removeChild(deleteRow);
	localStorage.removeItem(this.dataset.bookNumber + '-title');
	localStorage.removeItem(this.dataset.bookNumber + '-author');
	localStorage.removeItem(this.dataset.bookNumber + '-pages');
	localStorage.removeItem(this.dataset.bookNumber + '-read');
	localStorage.removeItem(bookIndex + '-title');
	localStorage.removeItem(bookIndex + '-author');
	localStorage.removeItem(bookIndex + '-pages');
	localStorage.removeItem(bookIndex + '-read');
	if(library.length === 0){
		localStorage.clear();
	}
	bookIndex = library.length-1;
	store();
	location.reload();
}
function readBook(focusedBook){
	if(`${focusedBook.read}` === 'true') {
		checkedButton.textContent = 'Oui';
	}else{
		checkedButton.textContent = 'Non';
	}
}

function switchReadBook(){
	library[this.dataset.bookNumber].read = !library[this.dataset.bookNumber].read;
	let bookToSwitchRead = document.getElementById(this.dataset.bookNumber);
	if(library[this.dataset.bookNumber].read){
		bookToSwitchRead.childNodes[4].childNodes[0].innerText = "Oui";
	}else{
		bookToSwitchRead.childNodes[4].childNodes[0].innerText = "Non";
	}
	store();
}

function render(){
	let tableRow = document.createElement('tr');
	let tableIndex = document.createElement('td');
	let tableTitle = document.createElement('td');
	let tableAuthor = document.createElement('td');
	let tablePages = document.createElement('td');
	let tableRead = document.createElement('td');
	checkedButton = document.createElement('p');
	let tableDelete = document.createElement('td');
	let deleteButton = document.createElement('button');

	library.forEach((book, index) => {
		tableRow.id = index;
		tableIndex.textContent = index + 1;
		tableTitle.textContent = `${book.title}`;
		tableAuthor.textContent = `${book.author}`;
		tablePages.textContent = `${book.pages}`;
		readBook(book);

		tableRow.appendChild(tableIndex);
		tableRow.appendChild(tableTitle);
		tableRow.appendChild(tableAuthor);
		tableRow.appendChild(tablePages);
		tableRow.appendChild(tableRead);
		tableRead.appendChild(checkedButton);
		tableRow.appendChild(tableDelete);
		tableDelete.appendChild(deleteButton);

		checkedButton.dataset.bookNumber = index;
		checkedButton.addEventListener("click", switchReadBook);

		deleteButton.dataset.bookNumber = index;
		deleteButton.addEventListener("click", deleteBook);

		bookShelf.appendChild(tableRow);
	});
}

//form

let myForm = document.getElementById('myForm');
let popForm = document.getElementById('newBook');
let stopForm = document.getElementById('stop');
let closeForm = document.getElementsByClassName('close')[0];

popForm.addEventListener("click", function(){
	myForm.classList.add('open');
});

closeForm.addEventListener("click", function(){
	quitForm();
	emptyInput();
});
stopForm.addEventListener("click", function(){
	quitForm();
	emptyInput();
});

window.addEventListener("click", function(event){
	if(event.target == myForm){
		quitForm();
		emptyInput();
	}
});

function quitForm(){
	myForm.classList.remove('open');
	title.classList.remove('emptyInput');
	author.classList.remove('emptyInput');
	pages.classList.remove('emptyInput');
	paraEmptyInput.classList.remove('displayVisible');
}

function emptyInput(){
	title.value="";
	pages.value="";
	author.value="";
	read.checked=false;
}

author.addEventListener("keyup", function(){
	let regexLetter = /[^a-zA-Z\s.]*$/;
	author.value = author.value.replace(regexLetter, "");
});

pages.addEventListener("keyup", function(){
	let regexNumber = /[^0-9]/gi;
	pages.value = pages.value.replace(regexNumber, "");
});

title.addEventListener("input", function(){
	title.classList.remove('emptyInput');
	paraEmptyInput.classList.remove('displayVisible');
});

author.addEventListener("input", function(){
	author.classList.remove('emptyInput');
	paraEmptyInput.classList.remove('displayVisible');
});

pages.addEventListener("input", function(){
	pages.classList.remove('emptyInput');
	paraEmptyInput.classList.remove('displayVisible');
});