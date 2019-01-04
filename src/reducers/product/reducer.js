import * as types from "./actionTypes";
import Immutable from "immutable";

const initialState = Immutable.Map({
    latestProducts: [],
    loading: false
}) ;

export default function reduce(state = initialState, action = {}) {
    switch(action.type) {
        case types.FETCH_LATEST_PRODUCTS_REQUEST:
        return state.merge({
            loading: true
        });

        case types.FETCH_LATEST_PRODUCTS_SUCCESS:
        return state.merge({
            loading: false,
            latestProducts: action.payload
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
    return state.product.latestProducts;
}

export function isLoading(state) {
    return state.product.loading;
}