import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelves: [
        {id: 'currentlyReading', title: 'Currently Reading'},
        {id: 'wantToRead', title: 'Want to Read'},
        {id: 'read', title: 'Read'}
      ],
      books: [],
    }
  }

  getBooks = () => {
    //fetch books
    BooksAPI.getAll()
    .then((books) => {
      this.setState({
        books: books,
      })
    })
    .catch(err => {
      this.setState({
        error: true,
        errorMessage: 'Unable to get books, please refresh the page to try again.',
      })
    })
  }

  componentDidMount(){
    this.getBooks()
  }

  handleUpdate = (id,shelf) => {
    BooksAPI.update(id,shelf)
    .then(res => {
      // this.getBooks();
      let books = this.state.books.map(b => {
        if (b.id === id) {
          return ({
            ...b,
            shelf,
          })
        } else {
          return({
            ...b,
          })
        }
      })
      this.setState({books})
    })
    .catch(err=>{
      console.log(err)
    })
  }

  handleSelect = (id,e) => {
    this.handleUpdate(id,e.target.value)
  }

  render() {
    let { books, loading, shelves } = this.state;
    let allShelves = {};
    for (let shelf of shelves) {
      allShelves = {
        ...allShelves,
        [shelf.id]: <div className="bookshelf" key={shelf.id}>
          <h2 className="bookshelf-title">{shelf.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.filter(b => b.shelf === shelf.id).sort((a,b)=>(a.title - b.title)).map(b => (
                <li key={b.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${b.imageLinks.thumbnail}')` }}></div>
                      <div className="book-shelf-changer">
                        <select value="move" onChange={(e) => this.handleSelect(b.id, e)}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{b.title}</div>
                    <div className="book-authors">{b.authors}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      }
    }
    return(
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {allShelves.currentlyReading}
              {allShelves.wantToRead}
              {allShelves.read}
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Homepage
