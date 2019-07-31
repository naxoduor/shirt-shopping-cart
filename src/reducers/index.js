import { combineReducers } from 'redux'
import productsReducer from './productsreducer'
import departmentsReducer from './departmentsreducer'
import categoriesReducer from './categoriesreducer'
import cartAmountReducer from './cartamountreducer'
import cartItemsReducer from './cartitemsreducer'
import authReducer from './authReducer';
import { firebaseReducer } from 'react-redux-firebase'


export default combineReducers({

    products: productsReducer,
    departments: departmentsReducer,
    categories: categoriesReducer,
    cartAmount: cartAmountReducer,
    cartItems: cartItemsReducer,
    auth: authReducer,
    firebase: firebaseReducer
})