//Stasrtup point for the clinet side application
import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const store = createStore(reducers,{},applyMiddleware(thunk))

ReactDOM.hydrate(
    <Provider store={store} >
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
    </Provider>   
    , document.querySelector("#root"));