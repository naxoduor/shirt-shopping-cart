const initState = {
    logged: null
}
const signInAndUpReducer = (state=initState, action) => {
    switch(action.type){
        
        case 'LOGIN_ACHIEVED':
       console.log('login success')
       return {
           ...state, 
           logged: true
       }

       case 'SIGNUP_ACHIEVED':
       console.log('signup success')
       return{
           ...state, logged: true
       }

       case 'SIGNEDUP_LOCALLY':
       console.log("logged user into our database")
       return {
           ...state,
           logged: false
       }

       case 'SIGNOUT_SUCCESS':
       console.log('signout success')
       return{
           ...state, logged: false
       }

      
       default:
        return state
    }
}

export default signInAndUpReducer;