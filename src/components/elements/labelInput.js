import React from 'react'

export default function labelInput(props) {
    const loginRegisterLabel = {
        fontFamily: "sans-serif",
        fontSize: "20px",
        fontWeight: "600",
        padding: "8px 0px"
    }

    const inputGroup = {
        display: "flex",
        flexDirection: "column",
        width: "80%",
        margin: "auto"

    }

    const loginRegisterInput = {
        textAlign: "center",
        padding: "10px, 10px",
        margin: "3px, 3px",
        border: "none",
        borderBottom: "1px solid black",
        fontFamily: "sans-serif",
        fontSize: "15px",
        background: "rgba(red, green, blue, alpha)"
    }
    return (
        <div>
            <div style={inputGroup}>
                <label style={loginRegisterLabel} htmlFor={props.htmlFor}>{props.name}</label>
                <input style={loginRegisterInput} type={props.type} id={props.id} placeholder={props.placeholder} onChange={props.handleChange}></input>
            </div>
        </div>
    )
}
