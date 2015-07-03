import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';

import AppFlux from 'AppFlux';
import AppStore from 'AppStore';

import Watches from './Watches';

var {DefaultRoute, Route} = Router, routes;

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
