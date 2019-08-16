import { CATEGORY_OR_PRODUCT_ITEMS_NUMBER } from '../action/types';

const initialState = {
    items: [],
    item: {}
}
const totalItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_OR_PRODUCT_ITEMS_NUMBER:
            return {
                ...state,
                items: action.payload
            }

            default: return state
    }
}

export default totalItemsReducer