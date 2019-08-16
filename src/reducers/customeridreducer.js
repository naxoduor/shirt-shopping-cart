import { UPDATE_CUSTOMER_ID } from '../action/types';

const initialState={
    items: [],
    item: {}
};

const customerIdReducer=(state=initialState, action) =>{
    switch(action.type){

        case UPDATE_CUSTOMER_ID:
            return {
                ...state,
                items:action.payload
            }
        default:
        return state

    }
}

export default customerIdReducer;