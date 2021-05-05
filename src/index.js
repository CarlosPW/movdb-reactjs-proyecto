import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./styles/styles.scss";

import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { favoritesReducer } from "./reducers/favoritesReducer";

const reducers = combineReducers({
	auth: authReducer,
	favoritesReducer: favoritesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
