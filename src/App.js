import React, { Component } from 'react';
import { Navbar, Nav, NavbarBrand, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './containers/homepage'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import { signOut } from './action/authActions'
import { signupUser, signinUser, signOutUser } from './action/requestActions'
import CheckOut from './details/checkout'
import localStorage from 'local-storage'
import { generateUniqueCartId, fetchShippingRegions, authorizeCheckout } from './action/requestActions'
import { NavLink as ReactLink } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSignInModal: false,
      showSignUpModal: false,
      loggedin: false
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

  signTheUserOut = (e) => {
    this.props.signOutUser()
  }

  componentWillMount() {
    console.log("inside component will mount")
    this.props.fetchShippingRegions()
    let token = localStorage.get("token")
    console.log("The said token is")
    console.log(token)
    this.props.authorizeCheckout(token)
    if (!localStorage.get("cartId")) {
      let carturl = "http://127.0.0.1:8080/shoppingcart/generateUniqueId"
      this.props.generateUniqueCartId(carturl)
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <Router>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home">
                <img
                  src="/images/tshirtshop.png"
                  width="15"
                  height="30"
                  className="d-inline-block align-top"
                  alt="tshirt shop logo"
                /> 
              </Navbar.Brand>
              <Nav className="ml-auto linkItems">
                <Nav.Link className={this.props.authentication.authenticated ? '' : 'hidden'} href="#" tag={ReactLink} to="/" onClick={this.signTheUserOut}>Log Out</Nav.Link>
                <Nav.Link className={this.props.authentication.authenticated ? 'hidden' : ''} href="#" tag={ReactLink} to="/" onClick={this.showSignInModal}>Sign In</Nav.Link>
                <Nav.Link className={this.props.authentication.authenticated ? 'hidden' : ''} href="#" tag={ReactLink} to="/" onClick={this.showSignUpModal}>Sign Up</Nav.Link>
              </Nav>
            </Navbar>
            <SignIn show={this.state.showSignInModal} handleClose={this.hideSignInModal} />
            <SignUp show={this.state.showSignUpModal} handleClose={this.hideSignUpModal} displaySignIn={this.showSignInModal}/>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/checkout' render={() => <CheckOut />} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    signupUser: (username, email, password) => dispatch(signupUser(username, email, password)),
    signinUser: (email, password) => dispatch(signinUser(email, password)),
    generateUniqueCartId: (carturl) => dispatch(generateUniqueCartId(carturl)),
    fetchShippingRegions: () => dispatch(fetchShippingRegions()),
    signOutUser: () => dispatch(signOutUser()),
    authorizeCheckout:(token) => dispatch(authorizeCheckout(token))
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    signing: state.signing,
    customer: state.customer,
    authentication: state.authentication
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
