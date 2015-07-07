import {Store} from 'flummox';
import axios from 'axios';

import HomeActions from './HomeActions.js';


export default class HomeStore extends Store {

    static ID = 'WatchStore';

    constructor(flux) {
        super();

        this.state = {
            timestamp: {}
        };

        let homeActionIds = flux.getActionIds(HomeActions.ID);

        this.register(homeActionIds.foo, this.foo);
        this.registerAsync(homeActionIds.fetchTimestamp, this.fetchTimestamp);
    }

    foo = (message) => {
        window.console.log(message);
    };

    fetchTimestamp() {
        axios.get('/timestamp.json')
            .then((response) => {
                this.setState({
                    timestamp: response.data
                });
            });
    }
}

