import * as types from "./actionTypes";
import Immutable from "immutable";

const initialState = Immutable.fromJS({
  latestProducts: [],
  loading: false
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_LATEST_PRODUCTS_REQUEST:
      return state.set({
        loading: true
      });

    case types.FETCH_LATEST_PRODUCTS_SUCCESS:
      //   const latestProducts = Array.from(action.payload);

      console.debug(
        "Debug:: Products merginh to state: " + JSON.stringify(action)
      );

      return state.merge({
        latestProducts: action.payload,
        loading: false
      });

    case types.FETCH_LATEST_PRODUCTS_FALIURE:
      return state.merge({
        latestProducts: null,
        loading: false,
        error: action.payload
      });

    default:
      return state;
  }
}

// Selectors -------------
export function getLatestProducts(state) {
  console.debug("DEBUG:: State: " + state);
  return state.product.latestProducts;
}

export function isLoading(state) {
  return state.product.loading;
}
