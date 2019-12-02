import nodemailer from 'nodemailer'
import axios from 'axios'
import localStorage from 'local-storage'
import {
    FETCH_CATALOGUE_PRODUCTS, FETCH_DEPARTMENTS, FETCH_CATEGORIES,
    FETCH_CATEGORIES_BY_DEPARTMENT, FETCH_PRODUCTS_BY_DEPARTMENT,
    FETCH_PRODUCTS_BY_CATEGORY, FETCH_CART_ITEMS, FETCH_CART_AMOUNT,
    CATEGORY_OR_PRODUCT_ITEMS_NUMBER, FETCH_DEPARTMENT_PAGE_PRODUCTS,
    FETCH_CATEGORY_PAGE_PRODUCTS, SIGNED_UP_LOCALLY, FETCH_CATEGORY_PAGINATION_PRODUCTS,
    FETCH_DEPARTMENT_PAGINATION_PRODUCTS, UPDATE_CUSTOMER_ID, FETCH_SHIPPING_REGIONS,
    FETCH_SHIPPING_INFO, UPDATE_CATEGORYID, UPDATE_DEPARTMENTID, UPDATE_SHIPPING_ID,
    FETCH_SEARCH_PRODUCTS, LOGIN_SUCCESS, LOGOUT_SUCCESS,
    FETCH_ATTRIBUTES, UPDATE_AUTHORIZATION, TOKEN_ERROR, FETCH_ORDER_DETAILS,
    UPDATE_TRANSACTION_NUMBER, UPDATE_SHIPPING_COST, CUSTOMER_DETAILS
} from './types'

export const fetchCatalogueProducts = (productsurl) => dispatch => {

    let productsurl = "http://104.248.73.139:8080/products"
    axios.get(productsurl)
        .then(res => res.data)
        .then(products => dispatch({
            type: FETCH_CATALOGUE_PRODUCTS,
            payload: products
        }))
}

export const searchProducts = (searchurl, params) => dispatch => {

    let searchurl = "http://104.248.73.139:8080/products/search"
    axios.post(searchurl, { params })
        .then(res => res.data)
        .then(products => dispatch({
            type: FETCH_SEARCH_PRODUCTS,
            payload: products
        }))
}

export const fetchDepartments = (departmentsurl) => dispatch => {

    let departmentsurl = "http://104.248.73.139:8080/departments"
    axios.get(departmentsurl)
        .then(res => res.data)
        .then(departments => dispatch({
            type: FETCH_DEPARTMENTS,
            payload: departments
        }))
}

export const fetchCategories = (categoriesurl) => dispatch => {

    let categoriesurl = "http://104.248.73.139:8080/categories"
    axios.get(categoriesurl)
        .then(res => res.data)
        .then(categories => dispatch({
            type: FETCH_CATEGORIES,
            payload: categories
        }))
}

export const fetchCategoriesByDepartment = (departmentcategoriesurl, id) => dispatch => {

    let departmentcategoriesurl = `http://104.248.73.139:8080/categories/inDepartment/${id}`;
    axios.get(departmentcategoriesurl)
        .then(res => res.data)
        .then(categories => dispatch({
            type: FETCH_CATEGORIES_BY_DEPARTMENT,
            payload: categories
        }))
}

export const fetchProductsByDepartment = (departmentproductsurl, id) => dispatch => {
    let departmentproductsurl = `http://104.248.73.139:8080/products/inDepartment/${id}`;
    let obj = {}
    obj.department_id = id
    axios.get(departmentproductsurl)
        .then(res => res.data)
        .then(products => dispatch({
            type: FETCH_PRODUCTS_BY_DEPARTMENT,
            payload: products
        }),
            dispatch({
                type: UPDATE_DEPARTMENTID,
                payload: obj
            }));
}

export const fetchProductsByCategory = (productsurl, id) => dispatch => {

    let productsurl = `http://104.248.73.139:8080/products/inCategory/${id}`
    let obj = {}
    obj.category_id = id
    axios.get(productsurl)
        .then(res => res.data)
        .then(products => dispatch({
            type: FETCH_PRODUCTS_BY_CATEGORY,
            payload: products
        }),
            dispatch({
                type: UPDATE_CATEGORYID,
                payload: obj
            })
        )
}

export const generateUniqueCartId = (carturl) => dispatch => {

    let carturl = "http://104.248.73.139:8080/shoppingcart/generateUniqueId"
    axios.get(carturl)
        .then(res => res.data)
        .then(cartid => {
            localStorage.set("cartId", cartid)
        })
}

export const addToCart = (carturl, cartId, item, quantity) => dispatch => {
    let carturl = 'http://104.248.73.139:8080/shoppingcart/add'
    let params = {}
    params.cartId = cartId
    params.productId = item.product_id
    params.attributes = `Color is ${item.color} and size is ${item.size}`
    params.quantity = quantity
    axios.post(carturl, { params })
}

export const updateCartItem = (carturl, item_id, quantity) => dispatch => {

    let carturl = `http://104.248.73.139:8080/shoppingcart/update/${item_id}`
    let params = {}
    params.quantity = quantity
    axios.put(carturl, { params })

}

export const fetchCartItems = (carturl, cart_id) => dispatch => {

    let carturl = `http://104.248.73.139:8080/shoppingcart/${cart_id}`
    console.log(carturl)
    axios.get(carturl)
        .then(res => res.data)
        
        .then(cartItems => dispatch({
            type: FETCH_CART_ITEMS,
            payload: cartItems
        }))
}

export const fetchCartTotalAmount = (carturl, cart_id) => dispatch => {

    let carturl = `http://104.248.73.139:8080/shoppingcart/totalamount/${cart_id}`
    axios.get(carturl)
        .then(res => res.data)
        .then(cartAmount => dispatch({
            type: FETCH_CART_AMOUNT,
            payload: cartAmount
        }))
}

export const fetchTotalDepartmentItems = (totalitemsurl, id) => dispatch => {

    let totalitemsurl = `http://104.248.73.139:8080/departments/totalitems/${id}`
    axios.get(totalitemsurl)
        .then(res => res.data)
        .then(totalItems => dispatch({
            type: CATEGORY_OR_PRODUCT_ITEMS_NUMBER,
            payload: totalItems
        }))
}

export const fetchTotalCategoryItems = (totalitemsurl, id) => dispatch => {

    let totalitemsurl = `http://104.248.73.139:8080/categories/totalitems/${id}`

    axios.get(totalitemsurl)
        .then(res => res.data)
        .then(totalItems => dispatch({
            type: CATEGORY_OR_PRODUCT_ITEMS_NUMBER,
            payload: totalItems
        }))
}

export const fetchDepartmentPageProducts = (finalurl, params) => dispatch => {

    axios.post(finalurl, { params })
        .then(res => res.data)
        .then(products => dispatch({
            type: FETCH_DEPARTMENT_PAGE_PRODUCTS,
            payload: products
        }))
}

export const removeCartProduct = (carturl, item_id) => dispatch => {

    let carturl = `http://104.248.73.139:8080/shoppingcart/removeProduct/${item_id}`
    axios.delete(carturl)
        .then(res => res.data)
        .then(response => {

        })
}

export const fetchCategoryPageProducts = (finalurl, params) => dispatch => {

    axios.post(finalurl, { params })
        .then(res => res.data)
        .then(products => dispatch({
            type: FETCH_CATEGORY_PAGE_PRODUCTS,
            payload: products
        })
        )
}

export const signupUser = (username, email, password, mobile) => dispatch => {
    axios.post('http://104.248.73.139:8080/customers', { username, email, password, mobile })
        .then((res) => res.data)
        .then(data => dispatch({
            type: SIGNED_UP_LOCALLY
        }))
}

export const signinUser = (email, password) => dispatch => {
    axios.post('http://104.248.73.139:8080/customers/login', { email, password })
        .then(res => res.data)
        .then(token => {
            localStorage.set("token", token)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: true
            })
        })
        .catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
}

export const signOutUser = () => dispatch => {
    axios.get('http://104.248.73.139:8080/customers/logout')
        .then((res) => {
            localStorage.set("token", null)
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: false
            })
        })
        .catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
}

export const fetchDepartmentPaginationProducts = (finalurl, id, params) => dispatch => {

    let finalurl = `http://104.248.73.139:8080/products/inDepartment/pagination/${id}`
    let obj = {}
    obj.department_id = params.department_id
    axios.post(finalurl, { params })
        .then(res => res.data)
        .then(products => dispatch({
            type: FETCH_DEPARTMENT_PAGINATION_PRODUCTS,
            payload: products
        }))
}

export const fetchAttributes = (product_id) => dispatch => {

    let attributesurl = `http://104.248.73.139:8080/attributes/inAttribute/${product_id}`
    axios.get(attributesurl)
        .then(res => res.data)
        .then(attributes => dispatch({
            type: FETCH_ATTRIBUTES,
            payload: attributes
        }))
}

export const fetchCategoryPaginationProducts = (finalurl, id, params) => dispatch => {

    let finalurl = `http://104.248.73.139:8080/products/inCategory/pagination/${id}`
    let obj = {}
    obj.category_id = params.category_id
    axios.post(finalurl, { params })
        .then(res => res.data)
        .then(products => dispatch({
            type: FETCH_CATEGORY_PAGINATION_PRODUCTS,
            payload: products
        })
        )
}

export const fetchShippingRegions = () => dispatch => {
    console.log("fetching shipping regions")

    axios.get('http://104.248.73.139:8080/shipping/regions/')
        .then(res => res.data)
        .then(shippingRegions => dispatch({
            type: FETCH_SHIPPING_REGIONS,
            payload: shippingRegions
        }))
}

export const fetchShippingInformation = (shipping_id) => dispatch => {
    let shipping = {}
    let shippinginfourl = `http://104.248.73.139:8080/shipping/regions/regionId/${shipping_id}`
    axios.get(shippinginfourl)
        .then(res => res.data)
        .then(shippinginfo => dispatch({
            type: FETCH_SHIPPING_INFO,
            payload: shippinginfo
        }))
}

export const updateShippingId = (shipping_id) => dispatch => {
    let obj = {}
    obj.shippingId = shipping_id
    dispatch({
        type: UPDATE_SHIPPING_ID,
        payload: obj
    })
}

export const updateShippingCost = (shipping_cost) => dispatch =>{
    dispatch({
        type: UPDATE_SHIPPING_COST,
        payload: shipping_cost
    })
}

export const createOrder = (order) => dispatch => {
    axios.post('http://104.248.73.139:8080/orders', { order })
        .then(res => {
            console.log(res)
        })
}

export const authorizeCheckout = (token) => dispatch => {
    console.log("authorizeCheckout actions")
    console.log(token)
    axios.get('http://104.248.73.139:8080/protected', { headers: { authorization: `Bearer ${token}` } })
        .then(res => res.data)
        .then(customer => dispatch({
            type: CUSTOMER_DETAILS,
            payload: customer,
        }))
        .then(dispatch({
            type:LOGIN_SUCCESS,
            payload:true
        }))
        .catch(err => dispatch({
            type: LOGIN_SUCCESS,
            payload: false
        }))
}

export const findOrderDetails = (dates) => dispatch => {
    axios.post('http://104.248.73.139:8080/orderdetails', { dates })
        .then(res => res.data)
        .then(orderdetails => dispatch({
            type: FETCH_ORDER_DETAILS,
            payload: orderdetails
        }))
}

export const generateTransactionNumber = () => dispatch => {
    let transactionNumber = ""
    let possible = "ABCDEFGHIJKLMNopqrstuvwxyz123456"
    for (let i = 0; i < 5; i++)
        transactionNumber += possible.charAt(Math.floor(Math.random() * possible.length))

    dispatch({
        type: UPDATE_TRANSACTION_NUMBER,
        payload: transactionNumber
    })
}

export const passwordReset = (email) => dispatch => {
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'naxoduor7@gmail.com',
            pass: 'Maradonabingwa86'
        }
    });
    axios.post('http://104.248.73.139:8080/customers/passwordreset', { email })
        .then(res => res.data)
        .then(token => {
            const message = {
                from: 'naxoduor7@gmail.com',
                to: 'naxochieng86@gmail.com',
                subject: 'Design Your Model S | Tesla',
                html: '<h1>Have the most fun you can in a car!</h1><p>Get your Tesla</p>'
            }
            transport.sendMail(message, function(err,info){

            })
        })
        .catch(err => {

        })
}

