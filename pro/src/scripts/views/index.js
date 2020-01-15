import React, { Component } from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LazyLoad from "&/lazyload.js";
import Login from "./login";
import SignUp from './signup';
import Home from "./home";


//所有的路由在这里配置
export default class MainLayout extends Component {
    render() {
        return (
            <div className="main">
                <Switch>
                    {/* <Route exact path={`/`} component={Login} /> */}
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/home" component={Home} />
                    <Route render={()=><Redirect to="/login"/>} />
                </Switch>
            </div>
        )
    }
}