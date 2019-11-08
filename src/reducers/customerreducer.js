import { CUSTOMER_DETAILS } from '../action/types';

const initialState={
    items: [],
    item: {}
};

const customerReducer=(state=initialState, action) =>{
    switch(action.type){

        case CUSTOMER_DETAILS:
            return {
                ...state,
                item:action.payload
            }
        
        default:
        return state

    }
}

export default customerReducer;