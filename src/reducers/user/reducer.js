import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  currentUser: null,
  error: null,
  isLoading: false
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    // Handle sign in user actions.
    case types.SIGN_IN_USER_REQUEST:
      return state.merge({
        isLoading: true
      });

    case types.SIGN_IN_USER_SUCCESS:
      return state.merge({
        isLoading: false,
        currentUser: action.payload.user
      });

    case types.SIGN_IN_USER_FALIURE:
      return state.merge({
        isLoading: false,
        currentUser: null,
        error: action.payload.error
      });

    // Handle sign up user actions
    case types.SIGN_UP_USER_REQUEST:
      return state.merge({
        isLoading: true
      });

    case types.SIGN_UP_USER_SUCCESS:
      return state.merge({
        isLoading: false,
        currentUser: action.payload.user
      });

    case types.SIGN_UP_USER_FALIURE:
      return state.merge({
        isLoading: false,
        currentUser: null,
        error: action.payload.error
      });

    default:
      return state;
  }
}

// Selectors ---------
export function getCurrentUser(state) {
  return state.user.currentUser;
}

export function isLoading(state) {
  return state.user.isLoading;
}

export function getError(state) {
  return state.user.error;
}
