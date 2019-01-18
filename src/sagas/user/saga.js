import { call, put, takeLatest } from "redux-saga/effects";
import * as UserService from "../../services/UserService";
import {
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_FALIURE,
  SIGN_IN_USER_SUCCESS,
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FALIURE
} from "../../reducers/user/actionTypes";

export function* userWatcherSaga() {
  yield takeLatest(SIGN_IN_USER_REQUEST, userSignInWorkerSaga);
  yield takeLatest(SIGN_UP_USER_REQUEST, userSignUpWorkerSaga);
}

function* userSignInWorkerSaga({ payload }) {
  console.debug("User sign in worker called");
  try {
    const { user } = payload;
    const currentUser = yield call(() =>
      UserService.signIn(user.username, user.password)
    );
    if (currentUser) {
      yield put({ type: SIGN_IN_USER_SUCCESS, payload: { currentUser } });
    }
  } catch (error) {
    console.error(error);
    yield put({ type: SIGN_IN_USER_FALIURE, payload: { error } });
  }
}

function* userSignUpWorkerSaga({ payload }) {
  console.debug("User sign up worker called");

  try {
    const { user } = payload;
    const currentUser = yield call(() => UserService.signUp(user));

    if (currentUser) {
      yield put({ type: SIGN_UP_USER_SUCCESS, payload: { currentUser } });
    }
  } catch (error) {
    console.error(error);
    yield put({ type: SIGN_UP_USER_FALIURE, payload: { error } });
  }
}
