import initialState from './initialState';
import { SAVE_TOKEN, PURGE_TOKEN } from '../actions/actionTypes';

export default function tokenReducer(state = initialState.token, action) {
    let newState;
    switch (action.type) {
        case SAVE_TOKEN:
            newState = {token: action.token};
            return newState;
        case PURGE_TOKEN:
            return initialState.token;
        default:
            return state;
    }
}