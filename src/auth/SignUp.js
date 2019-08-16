import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../action/authActions'
import './auth.css';
class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("handle submit")
        console.log("we are signing up the useerrrrrr")
        this.props.signUp(this.state)
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
                        <input className="login-register-input" type="text" id="firstName" placeholder="FirstName" onChange={this.handleChange}></input>
                    </div>

                    <div className="input-group">
                        <label className="login-register-label" htmlFor="lastName">Last Name</label>
                        <input className="login-register-input" type="text" id="lastName" placeholder="LastName" onChange={this.handleChange}></input>
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
        signUp: (newUser) => dispatch(signUp(newUser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)