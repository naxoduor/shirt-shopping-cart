import { combineReducers } from 'redux'
import productsReducer from './productsreducer'
import departmentsReducer from './departmentsreducer'
import categoriesReducer from './categoriesreducer'
import cartAmountReducer from './cartamountreducer'
import cartItemsReducer from './cartitemsreducer'
import customerReducer from './customerreducer'
import authReducer from './authReducer';
import totalItemsReducer from './totalitemsreducer'
import signingReducer from './signinandupreducer'
import customerIdReducer from './customeridreducer'
import { firebaseReducer } from 'react-redux-firebase'
import signInAndUpReducer from './signinandupreducer';
import shippingRegionsReducer from './shippingregionsreducer'
import shippingInfoReducer from './shippinginforeducer'


export default combineReducers({
    products: productsReducer,
    departments: departmentsReducer,
    categories: categoriesReducer,
    cartAmount: cartAmountReducer,
    cartItems: cartItemsReducer,
    totalItems: totalItemsReducer,
    signing:  signInAndUpReducer,
    customer: customerReducer,
    customerid: customerIdReducer,
    shippingRegions: shippingRegionsReducer,
    shippingInfo: shippingInfoReducer,
    auth: authReducer,
    firebase: firebaseReducer
})