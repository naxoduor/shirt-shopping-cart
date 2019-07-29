import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './containers/homepage'
import localStorage from 'local-storage'
import { generateUniqueCartId } from './action/requestActions'
import './App.css';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    if(!localStorage.get("cartId")){
    let carturl = "http://127.0.0.1:8080/shoppingcart/generateUniqueId"
    this.props.generateUniqueCartId(carturl)
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

const mapDispatchToProps = (dispatch) => {
  return {
    generateUniqueCartId: (carturl) => dispatch(generateUniqueCartId(carturl))
  }
}
export default connect(null, mapDispatchToProps)(App)
