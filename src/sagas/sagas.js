import {all} from "redux-saga/effects";
import {productWatcherSaga} from "./product/saga";

export function* sagas() {
    yield all([
        productWatcherSaga()
    ]);
}