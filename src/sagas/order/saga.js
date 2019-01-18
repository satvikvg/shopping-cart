import { call, put, takeLatest } from "redux-saga/effects";
import * as OrderService from "../../services/OrderService";
import {
  ORDER_PLACE_REQUEST,
  ORDER_PLACE_SUCCESS,
  ORDER_PLACE_FAILURE
} from "../../reducers/order/actionTypes";

export default function* orderWatcherSaga() {
  yield takeLatest(ORDER_PLACE_REQUEST, orderPlaceWorkerSaga);
}

function* orderPlaceWorkerSaga({ payload }) {
  console.debug("Order place worker called");

  try {
    const orderHistory = yield call(() =>
      OrderService.placeOrder(payload.order)
    );
    if (orderHistory) {
      yield put({ type: ORDER_PLACE_SUCCESS, payload: { orderHistory } });
    }
  } catch (error) {
    console.error(error);
    yield put({ type: ORDER_PLACE_FAILURE, payload: { error } });
  }
}
