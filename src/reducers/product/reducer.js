import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  latestProducts: [],
  loading: false,
  product: null
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    // Handle fetch latest products actions.
    case types.FETCH_LATEST_PRODUCTS_REQUEST:
      return state.merge({ loading: true });

    case types.FETCH_LATEST_PRODUCTS_SUCCESS:
      return state.merge({ loading: false, latestProducts: action.payload });

    case types.FETCH_LATEST_PRODUCTS_FALIURE:
      return state.merge({
        latestProducts: null,
        loading: false,
        error: action.payload
      });

    // handle fetch product actions.
    case types.FETCH_PRODUCT_REQUEST:
      return state.merge({ loading: true });

    case types.FETCH_PRODUCT_SUCCESS:
      return state.merge({
        loading: false,
        product: action.payload,
        error: null
      });

    case types.FETCH_PRODUCT_FALIURE:
      return state.merge({ loading: false, error: action.payload });

    default:
      return state;
  }
}

// Selectors -------------

export function isLoading(state) {
  return state.product.loading;
}

export function getLatestProducts(state) {
  return state.product.latestProducts;
}

export function getProduct(state) {
  return state.product.product;
}
