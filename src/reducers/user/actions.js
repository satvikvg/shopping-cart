import { SIGN_IN_USER_REQUEST } from "./actionTypes";

export function signIn(user) {
  return {
    type: SIGN_IN_USER_REQUEST,
    payload: {
      user
    }
  };
}
