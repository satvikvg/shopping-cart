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
   
    yield put({
      type: FETCH_LATEST_PRODUCTS_SUCCESS,
      payload: response
    });
  }
}

function* fetchLatestProducts() {
  try {
    console.log("Fetching latest products.");
    const response = yield fetch("http://localhost:3004/products?_limit=20");
    const responseJson = yield response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
    yield put({ type: FETCH_LATEST_PRODUCTS_FALIURE, payload: { error } });
    return null;
  }
}
