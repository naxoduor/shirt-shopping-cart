import React, { Component } from 'react';
import axios from 'axios';
import './auth.css';
import ForgotPasswordForm from '../components/forms/forgotpasswordform'
import ErrorForms from './errorforms'

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
                    <ForgotPasswordForm sendEmail={this.sendEmail} handleChange={this.handleChange} />
                    <ErrorForms showError={showError} showNullError={showNullError} messageFromServer={messageFromServer} email={email}/>
                </div>
            </div>
        );
    }
}

export default ForgotPassword