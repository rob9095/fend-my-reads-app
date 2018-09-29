import React, { Component } from 'react';

class BookListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  handleSelect = (e) => {
    this.props.onSelect(this.props.book.id,e.target.value)
  }
  render() {
    let {id, imageLinks, title, authors, shelf} = this.props.book
    //set authors to N/A if undefined otherwise comma seperate authors
    authors = authors === undefined ? 'N/A' : authors.map((a,i)=>{
      if(i === authors.length-1) {
        return a
      } else {
        return `${a}, `
      }
    })
    //set placeholder image if thumbnail is undefined
    let image = imageLinks === undefined ? 'url("/images/placeholder.png")' : `url('${imageLinks.thumbnail}')`;
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: image }}></div>
            <div className="book-shelf-changer">
              <select value={shelf} onChange={this.handleSelect}>
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
    )
  }
}

export default BookListItem;
