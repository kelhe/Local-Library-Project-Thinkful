function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = books.filter((book) => {
    const { borrows } = book;
    const currentlyReturned = borrows[0].returned;
    return currentlyReturned === false;
  });
  return borrowedBooks.length;
}

function getMostCommonGenres(books) {
  let notSorted = books.reduce((acc, currentBook) => {
    const { genre } = currentBook;
    //if the current accumalator does not already contain an obj with the current genre then make one and use helper function to get the count number
    if (!acc.some((currentGenre) => currentGenre.name == genre)) {
      acc.push({ name: genre, count: countByGenre(books, genre)});
    }
    return acc;
  }, []);
  //sort into count order with largest count (most common) first then limit it to top 5 using slice
  return notSorted.sort((genre1, genre2) => genre2.count - genre1.count).slice(0, 5);
}
//helper function to count total amount of times a genre appears
const countByGenre = function (arr, search) {
  let filterByGenre = arr.filter((book) => book.genre === search);
  return filterByGenre.length;
}

function getMostPopularBooks(books) {
  //use reduce and borrows.length
  let allBooks = books.reduce((popular,book) => {
    const {title,borrows}=book;
     popular.push({name:title,count:borrows.length});
     return popular;
  },[])
  return allBooks.sort((book1,book2) => book2.count - book1.count).slice(0,5)
}

function getMostPopularAuthors(books, authors) {
  let unsorted = authors.map((author) => {
    //destucture to access first and last name
    const {id,name:{first,last}} = author
    //filters books array for only books that the current author has published
    let authorsBooks = books.filter((book) => book.authorId === id)
    //get a count of all the borrows for each book
    let borrowedCount = authorsBooks.reduce((total,book) => {
      total += book.borrows.length;
      return total;
    },0)
    let obj = {name: `${first} ${last}`, count: borrowedCount}
    return obj
  })
  return unsorted.sort((author1,author2) => author2.count - author1.count).slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
