import React, { Component } from 'react';
import { signinUser } from '../action/requestActions'
import { connect } from 'react-redux'
import './auth.css';
import SignInForm from '../components/forms/signinform'

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
                    <SignInForm handleSubmit={this.handleSubmit} forgotPassword={this.forgotPassword} handleChange={this.handleChange}/>
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