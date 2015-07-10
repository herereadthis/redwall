import {Store} from 'flummox';

import AppActions from './AppActions';

import {LocalStorageMethods, SessionStorageMethods} from './AppConstants';

const popupBox = {
    boxName: 'Welcome to my site!',
    boxTitle: 'Here, Read This!',
    colorShift: {
        begin: 'F00',
        end: 'FF9600'
    }
};

let NoResults = [null, ''];

export default class AppStore extends Store {

    static ID = 'AppStore';
    static LAST_PATH_KEY = 'lastPath';
    static APP_CACHE = {
        KEY: 'cacheAge',
        VALID: 'cacheValidity',
        LIMIT: 86400000
    };

    static NINETIES_IMG = {
        NAME: 'ninetiesImg',
        INDEX_NAME: 'ninetiesImgIndex',
        INDEX: 0,
        AMT: 'ninetiesImgCount'
    };

    constructor(flux) {
        super();

        this.state = {
            popupBox,
            cacheAge: null,
            cacheValidity: undefined
        };

        const appActionsIds = flux.getActionIds(AppActions.ID);

        this.register(appActionsIds.getLastPath, this.getLastPath);
        this.register(appActionsIds.recordLastPath, this.recordLastPath);
        this.register(appActionsIds.setCacheAge, this.setCacheAge);
    }

    getLocalCacheData = () => {
        var last = LocalStorageMethods.get(AppStore.APP_CACHE.KEY),
            valid = LocalStorageMethods.get(AppStore.APP_CACHE.VALID);

        return {
            last,
            valid
        };
    };

    setCacheAge(currentTime) {
        var cacheData, dateDiff;

        cacheData = this.getLocalCacheData();

        if (cacheData.last === undefined || cacheData.valid === undefined) {
            LocalStorageMethods.set(AppStore.APP_CACHE.VALID, false);
        }
        cacheData = this.getLocalCacheData();
        if (cacheData.valid === false) {
            LocalStorageMethods.set(AppStore.APP_CACHE.KEY, currentTime);
        }

        dateDiff = Date.parse(currentTime) - Date.parse(cacheData.last);

        // if the time between the last cache and now is greater than the cache
        // limit or if the new cache time is now.
        if (dateDiff > AppStore.APP_CACHE.LIMIT ||
            cacheData.last === undefined) {
            LocalStorageMethods.set(AppStore.APP_CACHE.VALID, false);
            LocalStorageMethods.set(AppStore.APP_CACHE.KEY, currentTime);
        }
        // else, last cache is still valid
        else {
            LocalStorageMethods.set(AppStore.APP_CACHE.VALID, true);
        }
        cacheData = this.getLocalCacheData();

        this.setState({
            cacheAge: cacheData.last,
            cacheValidity: cacheData.valid
        });
    }

    getLastPath() {
        let lastPath = SessionStorageMethods.get(AppStore.LAST_PATH_KEY);
        return lastPath;
    }

    recordLastPath(path) {
        if (NoResults.indexOf(path) === -1) {
            SessionStorageMethods.set(AppStore.LAST_PATH_KEY, path);
        }
    }
}

