import { FETCH_CATEGORIES, FETCH_CATEGORIES_BY_DEPARTMENT } from '../action/types';

const initialState = {
    items: [],
    item: {}
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                items: action.payload
            }

        case FETCH_CATEGORIES_BY_DEPARTMENT:
            return {
                ...state,
                items: action.payload
            }

        default: return state;
    }

}

export default categoriesReducer