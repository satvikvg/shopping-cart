import {
  ADD_CART_ITEM,
  REMOVE_ALL_CART_ITEMS,
  CART_BUY_NOW
} from "./actionTypes";

export function addToCart(item) {
  return {
    type: ADD_CART_ITEM,
    payload: item
  };
}

export function clearCart() {
  return {
    type: REMOVE_ALL_CART_ITEMS
  };
}

export function buyNow(item) {
  return {
    type: CART_BUY_NOW,
    payload: {
      item
    }
  };
}
