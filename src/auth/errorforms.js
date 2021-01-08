import React from 'react'
import LinkButtons from '../components/LinkButtons'

export default function errorforms(props) {

    const registerButton = {
        background: 'green',
        padding: '1em',
        margin: '1em',
    };

    const homeButton = {
        background: 'mediumpurple',
        padding: '0.5em',
        margin: '0.5em',
    };

    return (
        <div>
            {props.showNullError && (
                <div>
                    <p>The email address cannot be null</p>
                </div>
            )}
            {props.showError && (
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
            {props.messageFromServer === 'recovery email sent' && (
                <div>
                    <h3>Password Reset Emaill Successfully Sent!</h3>
                </div>
            )}
            <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" />
        </div>
    )
}
