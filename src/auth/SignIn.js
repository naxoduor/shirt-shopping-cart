import React, { Component } from 'react';
import { signinUser } from '../action/requestActions'
import { connect } from 'react-redux'
import './auth.css';
import { Navbar, Nav, NavbarBrand, NavItem } from 'react-bootstrap';
import { NavLink as ReactLink } from 'react-router-dom';

class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    forgotPassword = () => {
        this.props.handleClose();
        this.props.showForgot();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let email=this.state.email
        let password=this.state.password
        this.props.signinUser(email, password)
        this.props.handleClose()
    }
    render() {
        const showHideClassName = this.props.show ? "signinmodal display-block" : "signinmodal display-none";
        console.log(showHideClassName)
        return (
            <div className={showHideClassName}>
                <div className="signinmodal-main">
                    <span className="close" onClick={this.props.handleClose}>&times;</span>
                    <form onSubmit={this.handleSubmit} className="white">
                        <div className="header">Sign In</div>
                        <div className="box">
                            <div className="input-group">
                                <label htmlFor="email" className="login-register-label">Email</label>
                                <input type="email" id="email" className="login-register-input" placeholder="Email" onChange={this.handleChange}></input>
                            </div>

                            <div className="input-group">
                                <label htmlFor="password" className="login-register-label">Password</label>
                                <input type="password" id="password" className="login-register-input" placeholder="Password" onChange={this.handleChange}></input>
                            </div>

                            <div className="input-group">
                                <button className="login-register-btn">Login</button>
                            </div>
                            <div className="linkin">
                            <Nav>
                                <Nav.Link  href="#" tag={ReactLink} to="/" onClick={this.forgotPassword}>Forgot Password</Nav.Link>
                            </Nav>
                            </div>
                            <div className="red-text center">
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signinUser: (email, password) => dispatch(signinUser(email, password))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)