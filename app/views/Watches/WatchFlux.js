import {Flux} from 'flummox';

import WatchStore from './WatchStore.js';
import WatchActions from './WatchActions.js';

export default class WatchFlux extends Flux {

    constructor(flux) {
        super();

        let _fluxInstance = this;

        if (flux) {
            _fluxInstance = flux;

        }

        _fluxInstance.createActions(WatchActions.ID, WatchActions);
        _fluxInstance.createStore(WatchStore.ID, WatchStore, _fluxInstance);
    }
}
