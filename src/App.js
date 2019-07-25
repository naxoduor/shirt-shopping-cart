import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './containers/homepage'
import './App.css';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className="App">
      <div>
        <Router>
          <header className="App-header">
            <h>App Header</h>
          </header>
          <Switch>
            <Route exact path='/' component={HomePage} />
          </Switch>
        </Router>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(App)
