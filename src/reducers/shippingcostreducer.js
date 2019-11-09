import { UPDATE_SHIPPING_COST } from '../action/types';

const initialState = {
    cost: null
}
const shippingcostReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SHIPPING_COST:
            return {
                ...state,
                cost: action.payload
            }

            default: return state
    }
}

export default shippingcostReducer