import { combineReducers } from 'redux';
import userReducer from './userReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
    userReducer,
    tokenReducer
})

export default rootReducer;