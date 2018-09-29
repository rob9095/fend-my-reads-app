import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Homepage from './Homepage';
import Search from './Search';
import './App.css'

class BooksApp extends React.Component {
  state = {}

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact path="/"
            component={Homepage}
            />
          <Route
            exact path="/search"
            component={Search}
          />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
