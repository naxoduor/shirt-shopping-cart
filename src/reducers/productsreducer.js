import { FETCH_CATALOGUE_PRODUCTS } from '../action/types';

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

        default: return state;
    }

}

export default productsReducer