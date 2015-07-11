import {Actions} from 'flummox';

export default class WatchActions extends Actions {

    static ID = 'WatchActions';

    async fetchWatchData(cacheValidity) {
        return cacheValidity;
    }
}

