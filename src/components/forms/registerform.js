import React from 'react'
import LabelInput from '../../components/elements/labelInput'
import SubmitButtons from '../elements/submitButtons'

export default function registerForm(props) {

    const header = {
        textAlign: "center",
        padding: "5px",
        marginBottom: "14px",
        fontFamily: "sans-serif",
        fontSize: "22px",
        borderBottom: "2px solid gray",
        width: "90%",
        margin: "auto"
    }

    const box = {
        display: "flex",
        flexDirection: "column"
    }
    const white = {
        margin: "20px"
    }

    const inputGroup = {
        display: "flex",
        flexDirection: "column",
        width: "80%",
        margin: "auto"

    }

    const loginRegisterLabel = {
        fontFamily: "sans-serif",
        fontSize: "20px",
        fontWeight: "600",
        padding: "8px 0px"
    }

    const loginRegisterInput = {
        textAlign: "center",
        padding: "10px, 10px",
        margin: "3px 5px",
        border: "none",
        borderBottom: "1px solid black",
        fontFamily: "sans-serif",
        fontSize: "15px",
        background: "rgba(red, green, blue, alpha)"
    }

    const loginRegisterBtn = {
        padding: "12px, 20px",
        margin: "10px 8px",
        textAlign: "center",
        border: "0",
        fontSize: "18px",
        borderRadius: "5px",
        border: "2px solid grey",
        cursor: "pointer",
        backgroundColor: "#db4a62",
        color: "#ffffff",
        textDecoration: "none"
    }

    const linkin = {
        margin: "auto",
        background: "2px solid brown"
    }

    return (
        <div>
            <form onSubmit={props.handleSubmit} style={white}>
                <labelInput/>
                <submitButtons/>
                <div className="acontainer">
                    <div style={header}>Sign Up</div>
                    <div style={box}>
                        <LabelInput htmlFor="email" type="email" id="email" placeholder="Email" name="Email" handleChange={props.handleChange} />
                        <LabelInput htmlFor="password" type="passwrd" id="password" placeholder="password" name="Password" handleChange={props.handleChange} />
                        <LabelInput htmlFor="firstName" type="text" id="firstName" placeholder="First Name" name="First Name" handleChange={props.handleChange} />
                        <LabelInput htmlFor="lastName" type="text" id="lastName" placeholder="Last Name" name="Last Name" handleChange={props.handleChange} />
                        <LabelInput htmlFor="mobileNumber" type="text" id="mobile" placeholder="Mobile Number" name="Mobile Number" handleChange={props.handleChange} />
                        <SubmitButtons text="Sign Up"/>
                        <div className="red-text center">
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}
