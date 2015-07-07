import {Actions} from 'flummox';

export default class AppActions extends Actions {

    static ID = 'AppActions';

    setCacheAge() {
        var currentTime = new Date();
        return currentTime;
    }
    recordLastPath(path) {
        return path;
    }
    getLastPath(path) {
        return path;
    }
}

