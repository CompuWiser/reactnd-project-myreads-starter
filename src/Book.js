import React from "react";
import PropTypes from "prop-types";

class Book extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  handleShelfChange = (evt) => {
    this.props.updateShelf(this.props.book, evt.target.value);
  }

  render() {
    const { title, authors, imageLinks, shelf, id } = this.props.book;

    return (
      <li key={id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
            style = {
              {
                width: 128,
                height: 193,
                backgroundImage: `url(${imageLinks.smallThumbnail})`
              }
            }/>
            <div className="book-shelf-changer">
              <select value={shelf || "none"} onChange={this.handleShelfChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    );
  }
}

export default Book