import {
    FETCH_CATALOGUE_PRODUCTS, FETCH_PRODUCTS_BY_DEPARTMENT,
    FETCH_PRODUCTS_BY_CATEGORY, FETCH_CATEGORY_PAGE_PRODUCTS, FETCH_DEPARTMENT_PAGE_PRODUCTS,
    FETCH_CATEGORY_PAGINATION_PRODUCTS, FETCH_DEPARTMENT_PAGINATION_PRODUCTS
} from '../action/types';

const initialState = {
    items: [],
    item: {}
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATALOGUE_PRODUCTS:
            return {
                ...state,
                items: action.payload
            }

        case FETCH_PRODUCTS_BY_DEPARTMENT:
            return {
                ...state,
                items: action.payload
            }

        case FETCH_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                items: action.payload
            }

        case FETCH_DEPARTMENT_PAGE_PRODUCTS:
            return {
                ...state,
                items: action.payload
            }

        case FETCH_CATEGORY_PAGE_PRODUCTS:
            return {
                ...state,
                items: action.payload
            }
        case FETCH_CATEGORY_PAGINATION_PRODUCTS:
            return {
                ...state,
                items: action.payload
            }
        case FETCH_DEPARTMENT_PAGINATION_PRODUCTS:
            return {
                ...state,
                items: action.payload
            }



        default: return state;
    }
}

export default productsReducer