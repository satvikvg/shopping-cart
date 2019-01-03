import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducers } from "./reducers/reducers";
import { sagas } from "./sagas/sagas";
import { default as logger } from "redux-logger";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(sagas);
