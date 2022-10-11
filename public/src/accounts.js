function findAccountById(accounts, id) {
  return accounts.find((account) => {
    return account.id === id;
  });
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((account1, account2) =>
    account1.name.last.toLowerCase() < account2.name.last.toLowerCase() ? -1 : 1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let allBorrowed = books.filter((book) => book.borrows.find((borrow) => borrow.id === account.id));
  return allBorrowed.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  //we want to find all books currently possesed by the account so we will search through books array to see which book obj includes the id number of the account and if they returned it
  let currentlyBorrowed = books.filter((book) =>
    book.borrows.find((borrow) => {
      return borrow.id === account.id && borrow.returned == false;
    })
  );
  return currentlyBorrowed.map((book) => {
    let author = authors.find((authorKey) => authorKey.id === book.authorId);
    return book = { ...book, author };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
