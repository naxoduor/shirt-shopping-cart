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
import idsReducer from './categoriesdepartmentidreducer'
import shippingIdReducer from  './shippingidreducer'
import attributesReducer from './attributesreducer'
import authenticationReducer from './authenticationReducer'
import transactonReducer from './transactionreducer'
import shippingcostReducer from './shippingcostreducer'


export default combineReducers({
    authentication: authenticationReducer,
    products: productsReducer,
    departments: departmentsReducer,
    categories: categoriesReducer,
    cartAmount: cartAmountReducer,
    cartItems: cartItemsReducer,
    totalItems: totalItemsReducer,
    signing:  signInAndUpReducer,
    customer: customerReducer,
    customerId: customerIdReducer,
    shippingRegions: shippingRegionsReducer,
    shippingInfo: shippingInfoReducer,
    selectedId: idsReducer,
    shippingId: shippingIdReducer,
    attributes: attributesReducer,
    auth: authReducer,
    firebase: firebaseReducer,
    trxNumber: transactonReducer,
    shippingCost: shippingcostReducer
})