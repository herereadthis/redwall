import {Store} from 'flummox';

import WatchActions from './WatchActions.js';


export default class WatchStore extends Store {

    static ID = 'WatchStore';

    constructor(flux) {
        super();

        let watchActionIds = flux.getActionIds(WatchActions.ID);

        this.register(watchActionIds.foo, this.foo);
    }

    foo = (message) => {
        window.console.log(message);
    };
}

