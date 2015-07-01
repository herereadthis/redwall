'use strict';

import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';

import AppFlux from './AppFlux';
import AppStore from './AppStore';
import Code from 'views/Code/Code';
import App from './app';

// simple test to ensure babel is working
let foo, bar, obj;

foo = 'foo';
bar = 'bar';
obj = {foo, bar};

var {DefaultRoute, Route, Link, RouteHandler} = Router, routes;

window.console.log(`loaded main.js with Babel ES6, ${JSON.stringify(obj)}`);
// end simple test

const flux = new AppFlux();

routes = (
    <Route>
        <Route name="code" path="code" handler={Code}/>
        <Route name="app" path="/" handler={App}/>
        <DefaultRoute handler={App}/>
    </Route>
);

// Router.HistoryLocation gets rid of the the /#/ hash by using html5 history
// API for cleaner URLs
// Router.run(routes, Router.HistoryLocation, (Handler) => {
Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(
        <FluxComponent flux={flux} connectToStores={[AppStore.ID]}>
            <Handler/>
        </FluxComponent>,
        document.getElementById('app')
    );
});
