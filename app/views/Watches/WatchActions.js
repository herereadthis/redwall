import {Actions} from 'flummox';

export default class WatchActions extends Actions {

    static ID = 'WatchActions';

    foo(message) {
        return message;
    }

    async getWatchData(path) {
        return path;
    }
}

