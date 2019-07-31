import React, { Component } from 'react';
import { Navbar, Nav, NavbarBrand, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './containers/homepage'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import { Form, FormControl, Button } from 'react-bootstrap';
import localStorage from 'local-storage'
import { generateUniqueCartId } from './action/requestActions'
import { NavLink as ReactLink } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showSignInModal: false,
      showSignUpModal: false
    }
  }

  showSignInModal = () => {
    this.setState({ showSignInModal: true });
  }

  hideSignInModal = () => {
    this.setState({ showSignInModal: false });
  }

  showSignUpModal = () => {
    this.setState({ showSignUpModal: true })
  }

  hideSignUpModal = () => {
    this.setState({ showSignUpModal: false })
  }




  componentWillMount() {
    if (!localStorage.get("cartId")) {
      let carturl = "http://127.0.0.1:8080/shoppingcart/generateUniqueId"
      this.props.generateUniqueCartId(carturl)
    }
  }

  render() {
    const { auth } = this.props;
    console.log(auth)
    return (
      <div className="App">
        <div>
          <Router>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home">
                <img
                  src="/logo.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Navbar.Brand>
              <Nav className="ml-auto linkItems">
                <Nav.Link href="#home" tag={ReactLink} to="/" onClick={this.showSignInModal}>Sign In</Nav.Link>
                <Nav.Link href="#features" tag={ReactLink} to="/" onClick={this.showSignUpModal}>Sign Up</Nav.Link>
              </Nav>
            </Navbar>
            <SignIn show={this.state.showSignInModal} handleClose={this.hideSignInModal} />
            <SignUp show={this.state.showSignUpModal} handleClose={this.hideSignUpModal} />
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
