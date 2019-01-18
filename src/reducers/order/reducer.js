import Immutable from "seamless-immutable";
import * as types from "./actionTypes";

const initialState = Immutable({
  isLoading: false,
  orderHistory: [],
  error: null
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    // Handle place order action.
    case types.ORDER_PLACE_REQUEST:
      return state.merge({
        isLoading: true
      });

    case types.ORDER_PLACE_SUCCESS:
      return state.merge({
        isLoading: false,
        orderHistory: action.payload.orderHistory,
        error: null
      });

    case types.ORDER_PLACE_FAILURE:
      return state.merge({
        isLoading: false,
        error: action.payload.error
      });

    default:
      return state;
  }
}

// Selectors -----------------
export function getOrderHistory(state) {
  return state.order.orderHistory;
}

export function isLoading(state) {
  return state.order.isLoading;
}

export function getError(state) {
  return state.order.error;
}
