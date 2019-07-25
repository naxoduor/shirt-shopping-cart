import axios from 'axios'
import { FETCH_CATALOGUE_PRODUCTS, FETCH_DEPARTMENTS, FETCH_CATEGORIES } from './types'

export const fetchCatalogueProducts = (productsurl) => dispatch => {

    axios.get(productsurl)
    .then(res => res.data)
    .then(products => dispatch({
        type: FETCH_CATALOGUE_PRODUCTS,
        payload: products
    }))
}

export const fetchDepartments = (departmentsurl) => dispatch => {
    axios.get(departmentsurl)
    .then(res => res.data)
    .then(departments => dispatch({
        type: FETCH_DEPARTMENTS,
        payload: departments
    }))
}

export const fetchCategories = (categoriesurl) => dispatch => {
    axios.get(categoriesurl)
    .then(res => res.data)
    .then(categories => dispatch({
        type: FETCH_CATEGORIES,
        payload: categories
    }))
}