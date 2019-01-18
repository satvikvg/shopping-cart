import Immutable from "seamless-immutable";
import * as types from "./actionTypes";

const initialState = Immutable({
  isLoading: false,
  items: [],
  buyNow: false
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD_CART_ITEM:
      const pushedItems = state.items.asMutable();
      pushedItems.push(action.payload);
      return state.merge({ items: pushedItems });

    case types.REMOVE_CART_ITEM:
      const splicedItems = state.items.asMutable();
      splicedItems.splice(action.payload.index, 1);
      return state.merge({
        items: splicedItems
      });

    case types.REMOVE_ALL_CART_ITEMS:
      return state.merge({
        items: []
      });

    case types.CART_BUY_NOW:
      const buyNowItems = state.items.asMutable();
      buyNowItems.push(action.payload.item);
      return state.merge({
        items: buyNowItems,
        buyNow: true
      });

    default:
      return state;
  }
}

// Selectors ------
export function getCartItems(state) {
  return state.cart.items;
}

export function getCartItemsCount(state) {
  return state.cart.items.length ? state.cart.items.length : 0;
}

export function getCartTotal(state) {
  let total = 0;

  state.cart.items.map(item => {
    total += Number(item.product.price.replace(/[^0-9\.]+/g, ""));
  });

  total = parseFloat(Math.round(total * 100) / 100).toFixed(2);

  return total;
}

export function isBuyNow(state) {
  return state.cart.buyNow;
}
