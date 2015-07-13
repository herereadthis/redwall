import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';

import AppFlux from './AppFlux';
import AppStore from './AppStore';
import App from './app';

import NinetiesImage from 'views/Homepage/views/NinetiesImage.js';


/*
 // simple test to ensure babel is working
 let foo, bar, obj;

 foo = 'foo';
 bar = 'bar';
 obj = {foo, bar};

 window.console.log(`loaded main.js with Babel ES6, ${JSON.stringify(obj)}`);
 // end simple test
 */

//{DefaultRoute, Route, Link, RouteHandler}
var {DefaultRoute, Route} = Router,
    routes;

const flux = new AppFlux();

routes = (
    <Route>
        <Route name="app" path="/" handler={App}>
            <Route name="nineties_image" path="nineties-image/:id"
                   component={NinetiesImage}/>
        </Route>
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
