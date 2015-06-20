'use strict';

import { Actions } from 'flummox';

export default class AppActions extends Actions {

    static ID = 'AppActions';


    async fetchTimestamp(status) {
        return status;
    }

    async fetch90sImage(status) {
        return status;
    }

    store90sImage(status) {
        return status;
    }

    async fetchHitCount(url) {
        return url;
    }


    recordLastPath(path) {
        return path;
    }
    getLastPath(path) {
        return path;
    }
}
