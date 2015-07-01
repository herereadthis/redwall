'use strict';

import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';

import AppFlux from 'AppFlux';
import AppStore from 'AppStore';

import Watches from './Watches';

var {DefaultRoute, Route} = Router, routes;

// simple test to ensure babel is working
let re = 'me',
    fa = 'so',
    obj;

obj = {re, fa};
window.console.log(`loaded main.js with Babel ES6, ${JSON.stringify(obj)}`);
// end simple test

const flux = new AppFlux();

routes = (
    <Route>
        <Route name="watches" path="/watches/" handler={Watches}/>
        <DefaultRoute handler={Watches}/>
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
