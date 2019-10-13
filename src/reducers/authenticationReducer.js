import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../action/types';
const initState = {
    authenticated: null
}
const authenticationReducer = (state=initState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
        return{
            ...state,
           authenticated:action.payload
        }

        case LOGOUT_SUCCESS:
       return {
           ...state,
           authenticated: action.payload
       }

       default:
        return state
    }
}

export default authenticationReducer;
