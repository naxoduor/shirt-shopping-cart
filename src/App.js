import React, { Component } from 'react';
import {Helmet} from 'react-helmet'
import { Navbar, Nav, NavbarBrand, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './containers/homepage'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import ForgotPassword from './auth/forgotpassword'
import ResetPassword from './auth/resetpassword'
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
      showForgotPassword: false,
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

  showForgotPassword = () => {
    this.setState({ showForgotPassword: true})
  }

  hideForgotPassword = () => {
    this.setState({ showForgotPassword: false})
  }

  signTheUserOut = (e) => {
    this.props.signOutUser()
  }

  
  componentWillMount() {
    this.props.fetchShippingRegions()
    let token = localStorage.get("token")
    if(token){
    this.props.authorizeCheckout(token.token)
    }
    if (!localStorage.get("cartId")) {
      let carturl = "http://127.0.0.1:8080/shoppingcart/generateUniqueId"
      this.props.generateUniqueCartId(carturl)
    }
  }

  render() {
    return (
      <div className="App">
        <div>
        <Helmet>
         <title>PowerAfrica! Kenyan based online shop for solar Panels, Power Equipment and Electronics</title>
         <meta name="description" content="Power Africa is your one stop shop for solaa panels, power equipment and amazing electronics" />
        </Helmet>

          <Router>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home">
                <h>PowerAfrica</h> 
              </Navbar.Brand>
              <Nav className="ml-auto linkItems">
                <Nav.Link className={this.props.authentication.authenticated ? '' : 'hidden'} href="#" tag={ReactLink} to="/" onClick={this.signTheUserOut}>Log Out</Nav.Link>
                <Nav.Link className={this.props.authentication.authenticated ? 'hidden' : ''} href="#" tag={ReactLink} to="/" onClick={this.showSignInModal}>Sign In</Nav.Link>
                <Nav.Link className={this.props.authentication.authenticated ? 'hidden' : ''} href="#" tag={ReactLink} to="/" onClick={this.showSignUpModal}>Sign Up</Nav.Link>
              </Nav>
            </Navbar>
            <SignIn show={this.state.showSignInModal} handleClose={this.hideSignInModal} showForgot={this.showForgotPassword} />
            <SignUp show={this.state.showSignUpModal} handleClose={this.hideSignUpModal} displaySignIn={this.showSignInModal}/>
            <ForgotPassword showForgotPass={this.state.showForgotPassword} handleClose={this.hideForgotPassword}/>
            <Switch>
              <Route exact path='/' render={() => <HomePage showSignIn={this.showSignInModal} showSignUp={this.showSignUpModal} />} />
              <Route exact path='/checkout' render={() => <CheckOut />} />
              <Route exact path='/forgotpassword' render={() =><ForgotPassword/>}/>
              <Route exact path='/resetpassword/:token' component={ResetPassword}/>
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
