import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookListItem from './BookListItem';
import { search, update, getAll } from './BooksAPI';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      books: [],
      error: false,
      errorMessage: '',
      currentBooks: [],
    }

  }

  getBooks = () => {
    //fetch books
    getAll()
    .then((books) => {
      this.setState({
        currentBooks: books,
      })
    })
    .catch(err => {
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  handleSearch = (e) => {
    //clear errors set state for new input
    this.setState({
      [e.target.name]: e.target.value,
      error: false,
    })
    //if search value is empty return
    if (e.target.value === '') {
      this.setState({
        error: true,
        errorMessage: `Please enter a search value`
      })
      return
    }
    // search books API
    search(e.target.value)
    .then(books => {
      if (books.error) {
        this.setState({
          error: true,
          errorMessage: `No Books Found`,
        })
      } else {
        console.log(books)
        this.setState({
          books,
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleUpdate = (id,shelf) => {
    update(id,shelf)
    .then(res => {
    })
    .catch(err=>{
      console.log(err)
    })
  }

  render() {
    const { searchValue, books, error, errorMessage, currentBooks } = this.state;
    let results = [];
    if (books.length > 0) {
      results = books.sort((a,b)=>(a.title - b.title)).map(b => {
        let currentBook = currentBooks.find(cb=>cb.id === b.id)
        if (currentBook) {
          return (
            <BookListItem
              key={b.id}
              book={{...b, shelf: currentBook.shelf,}}
              onSelect={this.handleUpdate}
            />
          )
        } else {
          return(
            <BookListItem
              key={b.id}
              book={{...b, shelf: 'none'}}
              onSelect={this.handleUpdate}
            />
          )
        }
      })
    }
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input autoFocus type="text" name="searchValue" value={searchValue} onChange={this.handleSearch} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {error ? <span>{errorMessage}</span> : results}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
