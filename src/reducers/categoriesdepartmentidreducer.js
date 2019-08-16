import { UPDATE_DEPARTMENTID } from '../action/types';
import { UPDATE_CATEGORYID } from '../action/types';

const initialState={
    items: [],
    item: {}
};

const idsreducer=(state=initialState, action) =>{
    switch(action.type){

        case UPDATE_DEPARTMENTID:
            return {
                ...state,
                items:action.payload
            }

        case UPDATE_CATEGORYID:
            return {
                ...state,
                items:action.payload
            }

        default:
        return state

    }
}

export default idsreducer;