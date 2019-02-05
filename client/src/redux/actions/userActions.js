import * as types from './actionTypes';

export function saveToken(token) {
    return {
        type: types.SAVE_TOKEN,
        token: token
    };
}

export function purgeToken() {
    return {
        type: types.PURGE_TOKEN,
        token: ""
    }
}

export function saveUser(user) {
    return {
        type: types.SAVE_USER,
        user: user
    };
}

export function purgeUser() {
    return {
        type: types.PURGE_USER,
        user: ""
    }
}
