
const buttonSend = document.getElementById('send');
const bookShelf = document.getElementById('bookShelf');
let library = [];
let checkedButton;
let bookIndex = 0;

buttonSend.addEventListener('click', addBookToLibrary);

document.addEventListener('DOMContentLoaded', function(){
	restore();
});

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
	bookIndex--;
}
function Book(title, author, pages, read){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(){
	const title = document.querySelector("input[name='title']");
	const author = document.querySelector("input[name='author']");
	const pages = document.querySelector("input[name='pages']");
	const read = document.querySelector("input[name='read']");
	var testAuhtorName = /^[A-Za-z]+$/;
	let titleEmpty;
	let authorEmpty;
	let pagesEmpty;

	if(title.value.trim().length){
		titleEmpty = true;
	}else{
		titleEmpty = false;
		// ajouter bordure rouge ici si le champ est vide !!!
	}

	if(author.value.trim().length){
		authorEmpty = true;
	}else{
		authorEmpty = false;
	}

	if(pages.value.trim().length){
		pagesEmpty = true;
	}else{
		pagesEmpty = false;
	}

	/*if(isNaN(pages.value) === false && testAuhtorName.test(author.value) === true && titleEmpty === true && authorEmpty === true && pagesEmpty === true){
		addBook = new Book(title.value, author.value, pages.value, read.checked);
		library.push(addBook);
		console.log(library);
		bookIndex++;
		render();
		store();
	} else if(isNaN(pages.value) === true) {
		console.log('pages isNaN');
	} else if(testAuhtorName.test(author.value) === false){
		console.log('Author has a number');
	} else if(titleEmpty === false){
		console.log('Title is empty');
	}*/

	if(titleEmpty === true && authorEmpty === true && pagesEmpty === true){
		if(isNaN(pages.value) === false && testAuhtorName.test(author.value) === true){
		addBook = new Book(title.value, author.value, pages.value, read.checked);
		library.push(addBook);
		console.log(library);
		bookIndex++;
		render();
		store();
		} else if(isNaN(pages.value) === true) {
			console.log('pages isNaN');
		} else if(testAuhtorName.test(author.value) === false){
			console.log('Author has a number');
		}
	} else if(titleEmpty === false){
		console.log('Title is empty');
	} else if(authorEmpty === false){
		console.log('author is empty');
	} else if(pagesEmpty === false){
		console.log('pages is empty');
	}


}

function deleteBook() {
	library.splice(this.dataset.bookNumber, 1);
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
	location.reload();
	console.log(bookIndex);
	store();
	console.log(localStorage);
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
		store();
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


