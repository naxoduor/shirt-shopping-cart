import { FETCH_CART_ITEMS, REMOVE_CART_ITEMS } from '../action/types';

const initialState = {
    items: [],
    item: {}
};

const cartItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART_ITEMS:
            return {
                ...state,
                items: action.payload
            }

            case REMOVE_CART_ITEMS:
            return {
                ...state,
                items: []
            }

        default: return state;
    }

}

export default cartItemsReducer