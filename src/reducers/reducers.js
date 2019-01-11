import product from "./product/reducer";
import cart from "./cart/reducer";
import user from "./user/reducer";
import { combineReducers } from "redux";

export const reducers = combineReducers({ product, cart, user });
