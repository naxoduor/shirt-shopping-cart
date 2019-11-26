import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
 
import {
    LinkButtons,
    updateButton,
    homeButton,
    loginButton,
    forgotButton,
    SubmitButtons
 } from '../components';
 
const loading = {

    margin: '1em',
    fontSize: '24px',
}
 
const title = 'Password Reset Screen'

export default class ResetPassword extends Component {
 
    constructor() {
        super()

        this.state= {
             username: '',
             password: '',
             updated: false,
             isLoading: true,
             error: false,
         }
     }
 
     async componentDidMount() {
     const {
             match: {
                 params: { token }
             },
         } = this.props
         console.log("log the props inside resetpassword")
         console.log(this.props)
         console.log("make a request")
         try {
             const response = await axios.get('http://localhost:8080/customers/reset', { headers: { authorization: `Bearer ${token}` } }, {
                 params: {
                     resetPasswordToken: token,
                 },
             });
             console.log("print the response")
             console.log(response.data)
 
             if(response.data.message==='password reset link a-ok'){
                 this.setState({
                     username: response.data.username,
                     updated:false,
                     isLoading:false,
                     error: false
                 })
             }
         } catch(error){
             console.log("error")
             console.log(error.response.data)
             this.setState({
                 updated:false,
                 isLoading:false,
                 error: true
             })
         }

     }
          
     handleChange = (e) => {
         this.setState({
            [e.target.id]: e.target.value
             });
     };
 
    updatePassword = async (e) => {
        e.preventDefault()
        const { username, password } = this.state;
        const {
            match: {
                params: { token }
                },
            } = this.props
            console.log(this.props)
             try {
                 let res='password updated'
                 const response = axios.put('http://localhost:8080/customers/updatePasswordViaEmail', { headers: { authorization: `Bearer ${token}` } },
                 {
                     username,
                     password,
                     resetPasswordToken: token
                 });
                 console.log(response.data)
                 //if(response.data.message)
                 if(res ==='password updated'){
                     this.setState({
                         updated:true,
                         error: false
                     });
                 } else {
                     this.setState({
                         updated: false,
                         error: true
                     })
                 }
             }
             catch(error){
                 console.log("error caugh")
                 //console.log(error.response.data)
             }
         };
     
     render() {
         console.log("console the props")
         console.log(this.props)
         const { password, error, isLoading, updated 
         } = this.state
 
         if(error) {
             return (
                 <div>
                     <h1>{title}</h1>
                     <div style={loading}>
                     <h4>Problem resetting password. Please send another reset link</h4>
                     <LinkButtons
                     buttonText="Go Home"
                     buttonStyle={homeButton}
                     link="/"
                     />
                     <LinkButtons
                     buttonStyle={forgotButton}
                     buttonText="Forgot Password?"
                     link="/forgotpassword"/>
                     </div>
                 </div>
             )
         }
         if(isLoading){
             return (    
                 <div>
                     <h1>{title}</h1>
                     <div style={loading}>Loading User Data...</div>
                 </div>           
                  );
         }
         
         return (
             <div>
                 <h1>{title}</h1>
                 <form className="password-form" onSubmit={this.updatePassword}>
                 <input
                 id="password"
                 label="password"
                 onChange={this.handleChange('password')}
                 value={password}
                 type="pasword"
                 />
                 <SubmitButtons
                  buttonStyle={updateButton}
                  buttonText="Update Password"/>
                 </form>
                 {updated && (
                     <div>
                         <p>Your password has been succesfully reset, Please try again</p>
                         <LinkButtons
                         buttonStyle={loginButton}
                         buttonText="Login"
                         link="/login"/>
                     </div>
                 )}
                 <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/"/>
             </div>
         )
            
     }
 }
 
 ResetPassword.propTypes = {
   // eslint-disable-next-line react/require-default-props
   match: PropTypes.shape({
     params: PropTypes.shape({
       token: PropTypes.string.isRequired,
     }),
   }),
 };
 