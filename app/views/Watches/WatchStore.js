import {Store} from 'flummox';

import WatchActions from './WatchActions.js';
import axios from 'axios';


export default class WatchStore extends Store {

    static ID = 'WatchStore';

    constructor(flux) {
        super();

        let watchActionIds = flux.getActionIds(WatchActions.ID);

        this.register(watchActionIds.foo, this.foo);
        this.registerAsync(watchActionIds.fetchWatches, this.fetchWatches);
    }

    foo = (message) => {
        window.console.log(message);
    };

    fetchWatches() {
        let url = 'assets/json/watches.json';
        axios.get(url)
            .then((response) => {
                this.setState({
                    watches: response.data
                });
            });
    }
}

