import axios from 'axios'
import { FETCH_CATALOGUE_PRODUCTS } from './types'

export const fetchCatalogueProducts = (productsurl) => dispatch => {

    axios.get(productsurl)
    .then(res => res.data)
    .then(products => dispatch({
        type: FETCH_CATALOGUE_PRODUCTS,
        payload: products
    }))
}
