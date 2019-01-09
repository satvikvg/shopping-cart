import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_LATEST_PRODUCTS_SUCCESS,
  FETCH_LATEST_PRODUCTS_FALIURE,
  FETCH_LATEST_PRODUCTS_REQUEST,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FALIURE
} from "../../reducers/product/actionTypes";
import * as ProductsService from "../../services/ProductsService";

export function* productWatcherSaga() {
  yield takeLatest(FETCH_PRODUCT_REQUEST, productWorkerSaga);
  yield takeLatest(FETCH_LATEST_PRODUCTS_REQUEST, latestProductsWorkerSaga);
}

function* productWorkerSaga({ payload }) {
  console.debug("Product worker invoked");
  try {
    const response = yield call(() => ProductsService.fetchProduct(payload.id));
    if (response !== null) {
      yield put({ type: FETCH_PRODUCT_SUCCESS, payload: response });
    }
  } catch (error) {
    console.error(error);
    yield put({ type: FETCH_PRODUCT_FALIURE, payload: { error } });
  }
}

function* latestProductsWorkerSaga() {
  console.log("Worker invoked");
  try {
    const response = yield call(ProductsService.fetchLatestProducts);
    if (response !== null) {
      yield put({
        type: FETCH_LATEST_PRODUCTS_SUCCESS,
        payload: response
      });
    }
  } catch (error) {
    console.error(error);
    yield put({ type: FETCH_LATEST_PRODUCTS_FALIURE, payload: { error } });
  }
}
