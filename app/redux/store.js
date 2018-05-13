import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const USER_UPDATE_TOKEN = 'USER_UPDATE_TOKEN';

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_TOKEN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
}

export const actionUpdateToken = (token) => ({type: USER_UPDATE_TOKEN, token});


export function initializeStore (initialState = {}) {
  return createStore(combineReducers({ user }), initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}