import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavbarComponent from './components/NavbarComponent'
import Home from './pages/Home'
import Sukses from './pages/Sukses'

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/sukses" component={Sukses} />
            </Switch>
          </main>
      </Router>
    )
  }
}
