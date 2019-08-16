import axios from 'axios'
import { CUSTOMER_DETAILS, SIGNUP_ACHIEVED, LOGIN_ACHIEVED } from './types'

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {

        const firebase = getFirebase()

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {

        const firebase = getFirebase()
        firebase.auth().signOut().then(() => {
            dispatch({
                type: "SIGNOUT_SUCCESS"
            })
        })
    }
}

export const signUp = (newUser) => {
    console.log("sign up inside actions")
    console.log(newUser)

    return (dispatch, getState, { getFirebase }) => {

        let signupstate = {}
        signupstate.signed = true;
        const firebase = getFirebase()
        let customer = {}
        customer.name = `${newUser.firstName} ${newUser.lastName}`
        customer.email = newUser.email
        customer.password = newUser.password
        console.log("printing customer inside authactions")
        console.log(customer)

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email, newUser.password
        ).then(resp => resp.data)
            .then((resp) => dispatch({
                type: 'SIGNUP_SUCCESS'
            }),
                dispatch({
                    type: SIGNUP_ACHIEVED
                }),
                dispatch({
                    type: CUSTOMER_DETAILS,
                    payload: customer
                }))
            .catch(err => {
                dispatch({ type: 'SIGNUP_ERROR', err })
            })
    }

}