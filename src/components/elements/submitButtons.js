import React from 'react'

export default function submitButtons(props) {
    return (
        <div className="input-group">
            <button className="login-register-btn">{props.text}</button>
        </div>
    )
}
