import React, { Component } from 'react';
import {
    HashRouter,
    Route
} from "react-router-dom";
import MainLayout from "~/views";
import { Provider } from "react-redux";
import store from "./store";
export default class MainRoute extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <HashRouter
                        basename=""
                    >
                        <Route component={MainLayout}></Route>
                    </HashRouter>
                </Provider>
            </div>
        )
    }
}