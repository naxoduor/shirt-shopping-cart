import axios from 'axios'
import { FETCH_CATALOGUE_PRODUCTS, FETCH_DEPARTMENTS, FETCH_CATEGORIES, FETCH_CATEGORIES_BY_DEPARTMENT, FETCH_PRODUCTS_BY_DEPARTMENT, FETCH_PRODUCTS_BY_CATEGORY } from './types'

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