import { combineReducers } from 'redux'
import productsReducer from './productsreducer'


export default combineReducers({
    products: productsReducer
})