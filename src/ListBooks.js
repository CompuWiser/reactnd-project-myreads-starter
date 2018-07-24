import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {
    const { books, updateShelf } = this.props;

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <Book
            book={book}
            key={book.id}
            updateShelf={updateShelf}
          />
        ))}
      </ol>
    )
  }
}

export default ListBooks