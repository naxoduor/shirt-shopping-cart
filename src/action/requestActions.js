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
    FETCH_SEARCH_PRODUCTS
} from './types'

export const fetchCatalogueProducts = (productsurl) => dispatch => {

    let productsurl="http://104.248.73.139:8080/products"
    axios.get(productsurl)
        .then(res => res.data)
        .then(products => dispatch({
            type: FETCH_CATALOGUE_PRODUCTS,
            payload: products
        }))
}

export const searchProducts = (searchurl, params) => dispatch => {

let searchurl="http://104.248.73.139:8080/products/search"
    axios.post(searchurl, {params})
    .then(res => res.data)
    .then(products => dispatch({
        type: FETCH_SEARCH_PRODUCTS,
        payload:products
    }))
}

export const fetchDepartments = (departmentsurl) => dispatch => {

    let departmentsurl="http://104.248.73.139:8080/departments"
    axios.get(departmentsurl)
        .then(res => res.data)
        .then(departments => dispatch({
            type: FETCH_DEPARTMENTS,
            payload: departments
        }))
}

export const fetchCategories = (categoriesurl) => dispatch => {

    let categoriesurl="http://104.248.73.139:8080/categories"
    axios.get(categoriesurl)
        .then(res => res.data)
        .then(categories => dispatch({
            type: FETCH_CATEGORIES,
            payload: categories
        }))
}

export const fetchCategoriesByDepartment = (departmentcategoriesurl, id) => dispatch => {

    let departmentcategoriesurl=`http://104.248.73.139:8080/categories/inDepartment/${id}`;
    console.log(departmentcategoriesurl)
    axios.get(departmentcategoriesurl)
        .then(res => res.data)
        .then(categories => dispatch({
            type: FETCH_CATEGORIES_BY_DEPARTMENT,
            payload: categories
        }))
}

export const fetchProductsByDepartment = (departmentproductsurl, id) => dispatch => {
    console.log("the department id is")
    console.log(id)
    let departmentproductsurl=`http://104.248.73.139:8080/products/inDepartment/${id}`;
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

export const fetchProductsByCategory = (productsurl,  id) => dispatch => {

    let productsurl=`http://104.248.73.139:8080/products/inCategory/${id}`
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
            payload:obj
        })
    )
}

export const generateUniqueCartId = (carturl) => dispatch => {

    let carturl="http://104.248.73.139:8080/shoppingcart/generateUniqueId"
    axios.get(carturl)
        .then(res => res.data)
        .then(cartid => {
            localStorage.set("cartId", cartid)
        })
}

export const addToCart = (carturl, cartId, item, quantity) => dispatch => {
    let carturl='http://104.248.73.139:8080/shoppingcart/add'
    let params = {}
    params.cartId = cartId
    params.productId = item.product_id
    params.attributes = `Color is ${item.color} and size is ${item.size}`
    params.quantity = quantity
    console.log(params)
    axios.post(carturl, { params })
}

export const fetchCartItems = (carturl, cart_id) => dispatch => {

    let carturl=`http://104.248.73.139:8080/shoppingcart/${cart_id}`
    console.log(carturl)
    axios.get(carturl)
        .then(res => res.data)
        .then(cartItems => dispatch({
            type: FETCH_CART_ITEMS,
            payload: cartItems
        }))
}

export const fetchCartTotalAmount = (carturl, cart_id) => dispatch => {

    let carturl=`http://104.248.73.139:8080/shoppingcart/totalamount/${cart_id}`
    axios.get(carturl)
        .then(res => res.data)
        .then(cartAmount => dispatch({
            type: FETCH_CART_AMOUNT,
            payload: cartAmount
        }))
}

export const fetchTotalDepartmentItems = (totalitemsurl, id) => dispatch => {

    let totalitemsurl=`http://104.248.73.139:8080/departments/totalitems/${id}`
    axios.get(totalitemsurl)
        .then(res => res.data)
        .then(totalItems => dispatch({
            type: CATEGORY_OR_PRODUCT_ITEMS_NUMBER,
            payload: totalItems
        }))
}

export const fetchTotalCategoryItems = (totalitemsurl, id) => dispatch => {

    let totalitemsurl=`http://104.248.73.139:8080/categories/totalitems/${id}`

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

    let carturl=`http://104.248.73.139:8080/shoppingcart/removeProduct/${item_id}`
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

export const signupUser = (user) => dispatch => {
    axios.post('http://104.248.73.139:8080/customers', { user })
        .then((res) => res.data)
        .then(data => dispatch({
            type: SIGNED_UP_LOCALLY
        }))
}

export const signinUser = (customer) => dispatch => {
    let customerList=[]
    axios.post('http://104.248.73.139:8080/customers/login', { customer })
        .then((res) => {
            customerList.push({customer_id:res.data.user.customer_id})
            dispatch({
                type: UPDATE_CUSTOMER_ID,
                payload: customerList
            })  
        })
}


export const fetchDepartmentPaginationProducts = (finalurl, id, params) => dispatch => {

    let finalurl="http://104.248.73.139:8080/products/inDepartment/pagination/*" + id
    let obj = {}
    obj.department_id = params.department_id

    axios.post(finalurl, { params })
        .then(res => res.data)
        .then(products => dispatch({
            type: FETCH_DEPARTMENT_PAGINATION_PRODUCTS,
            payload: products
        }))
}

export const fetchCategoryPaginationProducts = (finalurl, id, params) => dispatch => {

    let finalurl="http://104.248.73.139:8080/products/inCategory/pagination/*" + id;
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
    let shippinginfourl=`http://104.248.73.139:8080/shipping/regions/regionId/${shipping_id}`
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


export const createOrder = (order) => dispatch => {
    console.log(order)
    axios.post('http://104.248.73.139:8080/orders', { order })
        .then(res => {
            console.log(res)
        })
}
