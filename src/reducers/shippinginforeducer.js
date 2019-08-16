import { FETCH_SHIPPING_INFO } from '../action/types';

const initialState={
    items: [],
    item: {}
};

const shippinginfoReducer = (state = initialState, action) => {
    switch (action.type) {
    
            case FETCH_SHIPPING_INFO:
            return {
                ...state,
                items: action.payload
            }
        default: return state;
    }

}

export default shippinginfoReducer