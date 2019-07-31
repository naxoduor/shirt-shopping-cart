import axios from 'axios'
import localStorage from 'local-storage'
import { FETCH_CATALOGUE_PRODUCTS, FETCH_DEPARTMENTS, FETCH_CATEGORIES, FETCH_CATEGORIES_BY_DEPARTMENT, FETCH_PRODUCTS_BY_DEPARTMENT, FETCH_PRODUCTS_BY_CATEGORY, FETCH_CART_ITEMS, FETCH_CART_AMOUNT } from './types'

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

export const fetchCategoriesByDepartment = (departmentcategoriesurl) => dispatch => {
    axios.get(departmentcategoriesurl)
    .then(res => res.data)
    .then(categories => dispatch({
        type: FETCH_CATEGORIES_BY_DEPARTMENT,
        payload: categories
    }))
}

export const fetchProductsByDepartment = (departmentproductsurl) => dispatch => {
    axios.get(departmentproductsurl)
    .then(res => res.data)
    .then(products => dispatch({
        type: FETCH_PRODUCTS_BY_DEPARTMENT,
        payload: products
    }))
}

export const fetchProductsByCategory = (productsurl) => dispatch => {
    axios.get(productsurl)
    .then(res => res.data)
    .then(products => dispatch({
        type: FETCH_PRODUCTS_BY_CATEGORY,
        payload: products
    }))
}

export const generateUniqueCartId = (carturl) => dispatch => {
    axios.get(carturl)
    .then(res => res.data)
    .then(cartid => {
        localStorage.set("cartId", cartid)
    })
}

export const addToCart = (carturl, cartId, item) => dispatch => {
    let params = {}
    params.cartId = cartId
    params.productId = item.product_id
    params.attributes = `Color is ${item.color} and size is ${item.size}`
    axios.post(carturl,{ params })
}

export const fetchCartItems =  (carturl) => dispatch => {

console.log(carturl)
    axios.get(carturl)
    .then(res => res.data)
    .then(cartItems => dispatch({
        type: FETCH_CART_ITEMS,
        payload: cartItems
    }))
}

export const fetchCartTotalAmount = (carturl) => dispatch => {

    axios.get(carturl)
    .then(res => res.data)
    .then(cartAmount => dispatch({
        type: FETCH_CART_AMOUNT,
        payload: cartAmount
    }))
}