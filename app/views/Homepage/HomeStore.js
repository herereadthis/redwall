import {Store} from 'flummox';

import HomeActions from './HomeActions.js';


export default class HomeStore extends Store {

    static ID = 'WatchStore';

    constructor(flux) {
        super();

        let homeActionIds = flux.getActionIds(HomeActions.ID);

        this.register(homeActionIds.foo, this.foo);
    }

    foo = (message) => {
        window.console.log(message);
    };
}

