import React, { Component } from 'react';
import { search } from './BooksAPI';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
    }

  }
  handleSearch = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
    search(e.target.value)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    const { searchValue } = this.state;
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" name="searchValue" value={searchValue} onChange={this.handleSearch} placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default Search;
