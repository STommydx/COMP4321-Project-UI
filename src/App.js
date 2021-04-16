import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './home/Home'
import Search from './search/Search'
import Navbar from './Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
