import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_LATEST_PRODUCTS_SUCCESS,
  FETCH_LATEST_PRODUCTS_FALIURE,
  FETCH_LATEST_PRODUCTS_REQUEST
} from "../../reducers/product/actionTypes";

export function* productWatcherSaga() {
  yield takeLatest(FETCH_LATEST_PRODUCTS_REQUEST, productWorkerSaga);
}

function* productWorkerSaga() {
  console.log("Worker invoked");

  const response = yield call(fetchLatestProducts);
  if (response !== null) {
    const latestProducts = response.message;
    yield put({
      type: FETCH_LATEST_PRODUCTS_SUCCESS,
      payload: { latestProducts }
    });
  }
}

function* fetchLatestProducts() {
  try {
    console.log("Fetching latest products.");
    const response = yield fetch("http://localhost:8080/products/latest/");
    const responseJson = yield response.json();
    console.log("A ", responseJson);
    return responseJson;
  } catch (error) {
    yield put({ type: FETCH_LATEST_PRODUCTS_FALIURE, payload: { error } });
    return null;
  }
}
