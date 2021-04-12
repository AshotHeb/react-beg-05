import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import todoReducer from './reducers/todoReducer';
import SearchReducer from './reducers/searchReducer';
import singleTaskReducer from './reducers/singleTaskReducer';
import contactReducer from './reducers/contactReducer';
import logger from 'redux-logger';

const middlewares = [thunk, logger];
const reducers = combineReducers({
    todoState: todoReducer,
    singleTaskState: singleTaskReducer,
    searchState: SearchReducer,
    contactState:contactReducer
});

const store = createStore(reducers, applyMiddleware(...middlewares));
window.store = store;
export default store;