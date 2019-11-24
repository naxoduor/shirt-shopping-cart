import React, { Component } from 'react';
import axios from 'axios';
import './auth.css';
import {
    LinkButtons,
    SubmitButtons,
    registerButton,
    homeButton,
    forgotButton,
    email,
    passwordform,
    forgotfirst,
    forgotsecond
} from '../components'

const title = 'Forgot Password Screen'


class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            showError: false,
            messageFromServer: '',
            showNullError: false,
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    sendEmail = async (e) => {
        e.preventDefault();
        console.log(this.state)
        const { email } = this.state;
        if (email == '') {
            this.setState({
                showError: false,
                messageFromServer: '',
                showNullError: true,
            });
        } else {
            try {
                const response = await axios.post('http://localhost:8080/customers/forgotpassword', { email });
                console.log(response.data)
                if (response.data === 'recovery email sent') {
                    this.setState({
                        showError: false,
                        messageFromServer: 'recovery email sent',
                        showNullError: false
                    })
                }
            } catch (error) {
                console.error(error.response.data);
                if (error.response.data === 'email not in db') {
                    this.setState({
                        showError: true,
                        messageFromServer: '',
                        showNullError: false
                    })
                }
            }
        }
    }

    render() {
        const {
            email, messageFromServer, showNullError, showError
        } = this.state;
        const showHideClassName = this.props.showForgotPass ? "signinmodal display-block" : "signinmodal display-none";

        return (
            <div className={showHideClassName}>
            <div className="signinmodal-main">
            <span className="close" onClick={this.props.handleClose}>&times;</span>
                <h1 className='title'>{title}</h1>
                <form onSubmit={this.sendEmail}>
                    <div className="passwordbox">
                        <div className="forgotfirst">
                            <input id="email"
                                label="email"
                                value={email}
                                onChange={this.handleChange}
                                placeholder="Email Address"></input>
                        </div>
                        <div className="forgotagain">
                            <SubmitButtons
                                buttonStyle={forgotButton}
                                buttonText="Send Password Reset Email" />
                        </div>
                    </div>
                </form>
                {showNullError && (
                    <div>
                        <p>The email address cannot be null</p>
                    </div>
                )}
                {showError && (
                    <div>
                        <p>
                            That email address isn&apos;t recognized. Please try again or
                            register for a new account.
                        </p>
                        <LinkButtons
                            buttonText="Register"
                            buttonStyle={registerButton}
                            link="/register" />
                    </div>
                )}
                {messageFromServer === 'recovery email sent' && (
                    <div>
                        <h3>Password Reset Emaill Successfully Sent!</h3>
                    </div>
                )}
                <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" />
            </div>
            </div>
        );
    }
}

export default ForgotPassword