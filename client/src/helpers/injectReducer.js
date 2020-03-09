// thanks my lovely fellow developers @Shopee
import React from "react";
import {  ReactReduxContext } from "react-redux";
import createReducer from "../reducers/rootReducer";

export function injectReducer(store, asyncReducers, replaceExisting) {
    Object.keys(asyncReducers).forEach(name => {
        if (store.asyncReducers[name]) {
            if (!replaceExisting) {
                return;
            } else {
                console.warn(
                    `The reducer ${name} is being replaced with a new async reducer`
                );
            }
        }

        store.asyncReducers[name] = asyncReducers[name];
        store.replaceReducer(createReducer(store.asyncReducers));
    });
}

export const withInjectReducer = Component => props => (
    <ReactReduxContext.Consumer>
        {({ store }) => (
            <Component injectReducer={injectReducer.bind(null, store)} {...props} />
        )}
    </ReactReduxContext.Consumer>
);
