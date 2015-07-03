import React from 'react';
import {RouteHandler} from 'react-router';

import FluxComponent from 'flummox/component';

//import AddMoreFlux from 'components/AddMoreFlux.js';
import AppActions from 'AppActions';
import WatchTable from './WatchTable';
import WatchFlux from './WatchFlux.js';
import WatchStore from './WatchStore.js';

require('mossflower');
require('./watches.less');

let fluxInstances = [];

export default class Watches extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flux: null
        };
    }

    static contextTypes = {
        router: React.PropTypes.func
    };

    currentPath() {
        let currentPath = this.context.router.getLocation().getCurrentPath();
        return currentPath;
    }

    componentWillMount() {
        if (this.props.flux === false) {
            window.console.log('asdfasdf');
        }
        else {
            window.console.log(this.props.flux);

        }
        this.setState({
            flux: new WatchFlux()
        });

        /*
        let currentPath = this.currentPath();
        this.props.flux.getActions(AppActions.ID).setCacheAge();
        this.props.flux.getActions(AppActions.ID).recordLastPath(currentPath);
        this.props.flux.getActions(AppActions.ID).fetchWatches(true);
        */
    }

    render() {
        let addMoreFlux = {};
        addMoreFlux.flux = this.state.flux;
        window.console.log(addMoreFlux);
        return (
            <FluxComponent {...addMoreFlux} connectToStores={[WatchStore.ID]}>
                <WatchTable watches={this.props.watches}/>
                <RouteHandler />
            </FluxComponent>
        );
    }
}


//connectToStores={[WatchStore.ID]}>
//export default AddMoreFlux(Watches, WatchFlux);
