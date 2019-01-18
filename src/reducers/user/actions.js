import {
  SIGN_IN_USER_REQUEST,
  SIGN_UP_USER_REQUEST,
  SIGN_OUT_USER_REQUEST
} from "./actionTypes";

export function signIn(user) {
  return {
    type: SIGN_IN_USER_REQUEST,
    payload: {
      user
    }
  };
}

export function signUp(user) {
  return {
    type: SIGN_UP_USER_REQUEST,
    payload: {
      user
    }
  };
}

export function signOut() {
  return {
    type: SIGN_OUT_USER_REQUEST
  };
}
