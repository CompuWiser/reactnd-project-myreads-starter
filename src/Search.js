import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListBooks from "./ListBooks";

class Search extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBooksShown: PropTypes.func.isRequired,
    searchFunction: PropTypes.func.isRequired
  }

  handleSearch = (evt) => {
    this.props.searchFunction(evt.target.value);

  }

  render() {
    return (
      <div className="search-books">

        <div className="search-books-bar">

          <Link
            to='/'
            className="close-search"
          >Close
          </Link>

          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleSearch}/>
          </div>

        </div>

        <div className="search-books-results">
          <ListBooks
            books={this.props.books}
            updateShelf={this.props.updateBooksShown}
          />
        </div>
      </div>
    )
  }
}

export default Search