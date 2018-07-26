import React from "react"
import { Route } from "react-router-dom"
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI"
import Bookshelf from "./Bookshelf";
import Search from "./Search";
import "./App.css"


class BooksApp extends React.Component {
  state = {
    books: [],
    booksInSearchBox: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        })
      })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf
        this.setState(prevState => ({
          books: prevState.books.filter(item =>
            (item.id !== book.id))
            .concat([book])
        }))
      })
  }

  searchBooksList = (query) => {
    if (!query.length) {
      this.clearTheSearchBox();
      return;
    }

    BooksAPI.search(query)
      .then((newBooks) => {
        const booksOnShelf = this.state.books;
        newBooks.forEach((newBook) => {
          booksOnShelf.forEach((oldBook) => {
            if (newBook.id === oldBook.id) {
              newBook.shelf = oldBook.shelf;
            }
          });
        });

        this.setState({ booksInSearchBox: newBooks })
      })
      .catch(this.clearTheSearchBox);
  };

  clearTheSearchBox = () => {
    this.setState({ booksInSearchBox: [] });
  };



  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({history}) => (
          <div className="list-books">
            
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>
                <Bookshelf
                  title="Currently Reading"
                  shelf="currentlyReading"
                  books={this.state.books}
                  updateShelf={this.updateShelf}
                />
                <Bookshelf
                  title="Want to Read"
                  shelf="wantToRead"
                  books={this.state.books}
                  updateShelf={this.updateShelf}
                />
                <Bookshelf
                  title="Read"
                  shelf="read"
                  books={this.state.books}
                  updateShelf={this.updateShelf}
                />
              </div>
            </div>

            <div className="open-search">
              <Link
                to='/search'
                onClick={() => {
                  this.clearTheSearchBox();
                  history.push("/");
                }}
              > Add a book
              </Link>
            </div>

          </div>
        )}/>
        <Route path="/search" render={({ history }) => (
          <Search
            books={this.state.booksInSearchBox}
            updateBooksShown={this.updateShelf}
            searchFunction={this.searchBooksList}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
