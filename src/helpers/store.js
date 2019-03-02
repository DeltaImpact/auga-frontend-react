import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

import thunkMiddleware from "redux-thunk";
const loggerMiddleware = createLogger();
import signalRMiddleware from '../middleware/signalRMiddleware';

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, loggerMiddleware, signalRMiddleware)
//   applyMiddleware(thunkMiddleware, loggerMiddleware)
);
export const store = createStore(rootReducer, enhancer);
