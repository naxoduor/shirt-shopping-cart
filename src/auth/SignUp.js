import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../action/authActions'
import { signupUser } from '../action/requestActions'
import RegisterForm from '../components/forms/registerform'

import './auth.css';
class SignUp extends Component {

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: ''
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
                    <RegisterForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
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