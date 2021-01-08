import React from 'react'
import SubmitButtons from '../SubmitButtons'

export default function forgotpasswordform(props) {
    const passwordbox={
        display:"flex",
        flex: "1",
        flexWrap: "wrap",
        flexDirection: "column"
      }
      
      const forgotfirst={
        display: "flex",
        flexDirection: "column",
        width: "85%",
        margin:"auto",
        padding: "1em"
      }

      const forgotagain={
        width: "80%",
        margin: "auto",
        padding:"5px"
      }

    const forgotButton = {
        background: 'purple',
        padding: '0.5px',
        width: '100%',
       // margin: '1em',
      };
    
      const input={
          padding:"5px"
      }
      
    return (
        <div>
            <form onSubmit={props.sendEmail}>
                    <div style={passwordbox}>
                        <div style={forgotfirst}>
                            <input style={input} id="email"
                                label="email"
                                value={props.email}
                                onChange={props.handleChange}
                                placeholder="Email Address"></input>
                        </div>
                        <div style={forgotagain}>
                            <SubmitButtons
                                buttonStyle={forgotButton}
                                buttonText="Send Password Reset Email" />
                        </div>
                    </div>
                </form>
        </div>
    )
}
