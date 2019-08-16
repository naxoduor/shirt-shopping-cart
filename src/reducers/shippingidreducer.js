import { UPDATE_SHIPPING_ID } from '../action/types';

const initialState={
    items: [],
    item: {}
};

const shippingIdReducer = (state = initialState, action) => {
    switch (action.type) {
    
            case UPDATE_SHIPPING_ID:
            return {
                ...state,
                items: action.payload
            }
        default: return state;
    }

}

export default shippingIdReducer