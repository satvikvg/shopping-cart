import { all } from "redux-saga/effects";
import { productWatcherSaga } from "./product/saga";
import { userWatcherSaga } from "./user/saga";

export function* sagas() {
  yield all([productWatcherSaga(), userWatcherSaga()]);
}
