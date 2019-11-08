import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../action/authActions'
import { signupUser } from '../action/requestActions'
import './auth.css';
class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        let username = `${this.state.firstName} ${this.state.lastName}`
        let email = this.state.email
        let password = this.state.password
        let mobile = this.state.mobile
        e.preventDefault();
        this.props.signupUser(username, email, password, mobile)
        this.props.handleClose()
        this.props.displaySignIn()
    }
    render() {
        const showHideClassName = this.props.show ? "signinmodal display-block" : "signinmodal display-none";
        console.log(showHideClassName)
        return (
            <div className={showHideClassName}>
                <div className="signinmodal-main">
                    <span className="close" onClick={this.props.handleClose}>&times;</span>
            <form onSubmit={this.handleSubmit} className="white">
            <div className="acontainer">
                <div className="header">Sign Up</div>
                <div className="box">
                    <div className="input-group">
                        <label className="login-register-label" htmlFor="email">Email</label>
                        <input className="login-register-input" type="email" id="email" placeholder="Email" onChange={this.handleChange}></input>
                    </div>

                    <div className="input-group">
                        <label className="login-register-label" htmlFor="password">Password</label>
                        <input className="login-register-input" type="password" id="password" placeholder="password" onChange={this.handleChange}></input>
                    </div>

                    
                    <div className="input-group">
                        <label className="login-register-label" htmlFor="firstName">First Name</label>
                        <input className="login-register-input" type="text" id="firstName" placeholder="First Name" onChange={this.handleChange}></input>
                    </div>

                    <div className="input-group">
                        <label className="login-register-label" htmlFor="lastName">Last Name</label>
                        <input className="login-register-input" type="text" id="lastName" placeholder="Last Name" onChange={this.handleChange}></input>
                    </div>

                    <div className="input-group">
                        <label className="login-register-label" htmlFor="lastName">Mobile Number</label>
                        <input className="login-register-input" type="text" id="mobile" placeholder="mobile Number" onChange={this.handleChange}></input>
                    </div>

                    <div className="input-group">
                        <button className="login-register-btn">Sign Up</button>

                    </div>
                    <div className="red-text center">
                    </div>
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
        auth: state.firebase.auth,
        authError: state.auth.authError
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        signupUser: (username, email, password, mobile) => dispatch(signupUser(username, email, password, mobile)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)