import React from 'react'
import { Navbar, Nav, NavbarBrand, NavItem } from 'react-bootstrap';
import { NavLink as ReactLink } from 'react-router-dom';
import LabelInput from "../elements/labelInput"
import SubmitButtons from "../elements/submitButtons"

export default function SignInForm(props) {

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

    const white = {
        margin: "20px"
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
            <form onSubmit={props.handleSubmit} className={white}>
                <div style={header}>Sign In</div>
                <div style={box}>
                    <LabelInput htmlFor="email" name="Email" type="email" id="email" placeholder="Email" handleChange={props.handleChange}/>
                    <LabelInput htmlFor="password" name="Password" type="password" id="password" placeholder="Password" handleChange={props.handleChange}/>
                    <SubmitButtons text="Login"/>
                    <div style={linkin}>
                        <Nav>
                            <Nav.Link href="#" tag={ReactLink} to="/" onClick={props.forgotPassword}>Forgot Password</Nav.Link>
                        </Nav>
                    </div>
                    <div className="red-text center">
                    </div>
                </div>
            </form>
        </div>
    )
}
