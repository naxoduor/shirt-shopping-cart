import { UPDATE_TRANSACTION_NUMBER } from '../action/types';

const initialState = {
    transactionNumber: null
}
const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TRANSACTION_NUMBER:
            return {
                ...state,
                transactionNumber: action.payload
            }

            default: return state
    }
}

export default transactionReducer