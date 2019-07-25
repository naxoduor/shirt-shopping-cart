import { combineReducers } from 'redux'
import productsReducer from './productsreducer'
import departmentsReducer from './departmentsreducer'
import categoriesReducer from './categoriesreducer'


export default combineReducers({
    products: productsReducer,
    departments: departmentsReducer,
    categories: categoriesReducer
})