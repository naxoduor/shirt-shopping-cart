import React, { Component } from 'react';
import { Navbar, Nav, NavbarBrand, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './containers/homepage'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import { signOut } from './action/authActions'
import { signupUser, signinUser } from './action/requestActions'
import CheckOut from './details/checkout'
import { Form, FormControl, Button } from 'react-bootstrap';
import localStorage from 'local-storage'
import { generateUniqueCartId, fetchShippingRegions } from './action/requestActions'
import { Link } from 'react-router-dom';
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

  componentWillMount() {
    console.log("inside component will mount")
    this.props.fetchShippingRegions()
    if (!localStorage.get("cartId")) {
      let carturl = "http://127.0.0.1:8080/shoppingcart/generateUniqueId"
      this.props.generateUniqueCartId(carturl)
      console.log("fetch shipping regions")
    }
  }

  render() {
    const { auth } = this.props;
    console.log(auth)
    let signedup = this.props.signing.logged
    if (auth.uid) {
      if (signedup) {
        this.props.signupUser(this.props.customer.items)
      }
    }

    if (auth.uid) {
      console.log("user authentication id has been found")
      if (!this.state.loggedin) {
        console.log("login the user")
        this.props.signinUser(auth.email)
        this.setState({ loggedin: true })
      }
    }

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
                <Nav.Link className={auth.uid ? '' : 'hidden'} href="#" tag={ReactLink} to="/" onClick={this.props.signOut}>Log Out</Nav.Link>
                <Nav.Link className={auth.uid ? 'hidden' : ''} href="#" tag={ReactLink} to="/" onClick={this.showSignInModal}>Sign In</Nav.Link>
                <Nav.Link className={auth.uid ? 'hidden' : ''} href="#" tag={ReactLink} to="/" onClick={this.showSignUpModal}>Sign Up</Nav.Link>
                <Nav.Link className="checkoutlink" href="#"><Link tag={ReactLink} to="/checkout">Checkout</Link></Nav.Link>
              </Nav>
            </Navbar>
            <SignIn show={this.state.showSignInModal} handleClose={this.hideSignInModal} />
            <SignUp show={this.state.showSignUpModal} handleClose={this.hideSignUpModal} />
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
    signupUser: (user) => dispatch(signupUser(user)),
    signinUser: (email) => dispatch(signinUser(email)),
    generateUniqueCartId: (carturl) => dispatch(generateUniqueCartId(carturl)),
    fetchShippingRegions: () => dispatch(fetchShippingRegions())
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    signing: state.signing,
    customer: state.customer
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
