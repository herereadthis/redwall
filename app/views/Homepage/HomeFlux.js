import {Flux} from 'flummox';

import HomeStore from './HomeStore.js';
import HomeActions from './HomeActions.js';

export default class HomeFlux extends Flux {

    constructor(flux) {
        super();

        let _fluxInstance = this;

        if (flux) {
            _fluxInstance = flux;

        }

        _fluxInstance.createActions(HomeActions.ID, HomeActions);
        _fluxInstance.createStore(HomeStore.ID, HomeStore, _fluxInstance);
    }
}
