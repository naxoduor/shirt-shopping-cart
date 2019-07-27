import { FETCH_CATALOGUE_PRODUCTS, FETCH_PRODUCTS_BY_DEPARTMENT, FETCH_PRODUCTS_BY_CATEGORY } from '../action/types';

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


        default: return state;
    }
}

export default productsReducer