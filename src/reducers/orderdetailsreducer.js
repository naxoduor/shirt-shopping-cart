import { FETCH_ORDER_DETAILS } from '../action/types';

const initialState={
    items: [],
    item: {}
};

const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
    
            case FETCH_ORDER_DETAILS:
            return {
                ...state,
                items: action.payload
            }
        default: return state;
    }

}

export default orderDetailsReducer
