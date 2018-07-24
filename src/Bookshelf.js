import React from "react";
import PropTypes from "prop-types";
import ListBooks from "./ListBooks";

class Bookshelf extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {

    const { title, shelf, books, updateShelf } = this.props;
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ListBooks
            books={
              books.filter((book) => (
                book.shelf === shelf
              ))
            }
            updateShelf={updateShelf}
          />
        </div>
      </div>
    )
  }
}

export default Bookshelf