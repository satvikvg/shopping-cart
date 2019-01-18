import {
  FETCH_LATEST_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_REQUEST
} from "./actionTypes";

export function getProducts(
  filter = {
    limit: null,
    category: null
  }
) {
  return {
    type: FETCH_LATEST_PRODUCTS_REQUEST,
    payload: {
      limit: filter.limit,
      category: filter.category
    }
  };
}

export function searchProducts(query) {
  return {
    type: SEARCH_PRODUCTS_REQUEST,
    payload: {
      query
    }
  };
}
