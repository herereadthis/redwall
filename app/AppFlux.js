'use strict';

import { Flux } from 'flummox';

import AppStore from './AppStore';
import AppActions from './AppActions';

export default class AppFlux extends Flux {
    constructor() {
        super();

        this.createActions(AppActions.ID, AppActions);
        this.createStore(AppStore.ID, AppStore, this);
    }
}
