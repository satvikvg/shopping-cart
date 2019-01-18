import { ORDER_PLACE_REQUEST } from "./actionTypes";

export function placeOrder(order) {
  return {
    type: ORDER_PLACE_REQUEST,
    payload: {
      order
    }
  };
}
