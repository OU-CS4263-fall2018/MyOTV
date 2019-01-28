import initialState from './initialState';
import { SAVE_USER, PURGE_USER } from '../actions/actionTypes';

export default function userReducer(state = initialState.user, action) {
    let newState;
    switch (action.type) {
        case SAVE_USER:
            newState = {user: action.user};
            return newState;
        case PURGE_USER:
            return initialState.user;
        default:
            return state;
    }
}

