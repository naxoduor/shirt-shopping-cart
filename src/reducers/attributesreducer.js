import { FETCH_ATTRIBUTES } from '../action/types';

const initialState = {
    items: [],
    item: {}
};

const attributesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ATTRIBUTES:
            return {
                ...state,
                items: action.payload
            }
        default: return state;
    }

}
export default attributesReducer