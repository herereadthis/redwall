import {Actions} from 'flummox';

export default class HomeActions extends Actions {

    static ID = 'HomeActions';

    foo(message) {
        return message;
    }

    showNinetiesImgBox(status) {
        return status;
    }

    getNewNinetiesImgSelection(route) {
        return route;
    }

    fetch90sImage(cacheValidity, routeID) {
        return {
            cacheValidity,
            routeID
        };
    }
    setNew90sIndex(size, routeID) {
        return {
            size,
            routeID
        };
    }
    set90sNavRoutes(size, routeID) {
        return {
            size,
            routeID
        };
    }
    set90slist() {
        return true;
    }

    async fetchTimestamp(status) {
        return status;
    }
}

