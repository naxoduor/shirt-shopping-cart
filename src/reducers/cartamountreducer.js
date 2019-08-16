import { FETCH_CART_AMOUNT } from '../action/types';

const initialState={
    items: [],
    item: {}
};

const cartAmountReducer=(state=initialState, action) =>{
    switch(action.type){

        case FETCH_CART_AMOUNT:
            return {
                ...state,
                items:action.payload
            }

        
        default:
        return state

    }
}

export default cartAmountReducer;