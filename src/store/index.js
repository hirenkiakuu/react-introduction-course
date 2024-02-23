import { createStore } from "redux";

const defaultState = {
    deleteCount: 0,
};

export const ADD_DELETE = 'addDelete';

function reducer(state = defaultState, action) {
    switch(action.type) {
        case ADD_DELETE: 
            return {...state, deleteCount: action.payload}
        default: 
            return state;
    }
}

export const store = createStore(reducer);
export const addDeleteAction = (payload) => ({type: ADD_DELETE, payload});