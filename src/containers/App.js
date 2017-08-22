import React, {Component} from "react";
import {Route, Router} from "react-router-dom";
import {Provider} from "react-redux";
import Bundle from "../utils/Bundle";

import loadHome from "bundle-loader?lazy!./Home";
import loadAbout from "bundle-loader?lazy!./About";

const Home = (props) => (
    <Bundle load={loadHome}>
        {(Home) => <Home {...props}/>}
    </Bundle>
)
const About = (props) => (
    <Bundle load={loadAbout}>
        {(About) => <About {...props}/>}
    </Bundle>
)

const App = ({store, history}) => (
    <Provider store={store}>
        <Router history={history} store={store}>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
            </div>
        </Router>
    </Provider>
)

export default App