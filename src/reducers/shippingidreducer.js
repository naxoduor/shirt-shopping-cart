import { UPDATE_SHIPPING_ID } from '../action/types';

const initialState={
    shipping_id:null
};

const shippingIdReducer = (state = initialState, action) => {
    switch (action.type) {
    
            case UPDATE_SHIPPING_ID:
            return {
                ...state,
                shipping_id: action.payload
            }
        default: return state;
    }

}

export default shippingIdReducer