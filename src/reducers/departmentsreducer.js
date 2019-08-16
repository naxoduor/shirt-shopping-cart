import { FETCH_DEPARTMENTS } from '../action/types';

const initialState = {
    items: [],
    item: {}
};

const departmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DEPARTMENTS:
            return {
                ...state,
                items: action.payload
            }

        default: return state;
    }

}

export default departmentsReducer