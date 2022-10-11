function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  //returns 2 arrays within an array so we want to create 2 different arrays. One for all the items that are checked out currently and all that are returned currently
  let checkedOut = books.filter((book) => book.borrows[0].returned === false);
  let returnedBook = books.filter((book) => book.borrows[0].returned === true);
  return [checkedOut, returnedBook];
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book; //destructure to use method on the borrows array easier
  let fullListofBorrows = borrows.map((accBorrow) => {
    //find all accounts that matches the ids listed in the borrows array
    let accountMatch = accounts.find((account) => account.id === accBorrow.id);
    //combines the borrows information with the relavent account information
    return { ...accBorrow, ...accountMatch };
  });
  return fullListofBorrows.length > 10 ? fullListofBorrows.slice(0, 10) : fullListofBorrows;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
