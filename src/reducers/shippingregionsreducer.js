import { FETCH_SHIPPING_REGIONS } from '../action/types';

const initialState={
    items: [],
    item: {}
};

const shippingRegionsReducer = (state = initialState, action) => {
    switch (action.type) {
    
            case FETCH_SHIPPING_REGIONS:
            return {
                ...state,
                items: action.payload
            }
        default: return state;
    }

}

export default shippingRegionsReducer