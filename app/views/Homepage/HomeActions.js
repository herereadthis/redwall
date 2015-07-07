import {Actions} from 'flummox';

export default class HomeActions extends Actions {

    static ID = 'HomeActions';

    foo(message) {
        return message;
    }

    async fetchTimestamp(status) {
        return status;
    }
}

