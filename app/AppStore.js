'use strict';

import { Store } from 'flummox';

import AppActions from './AppActions';
import AppConstants from './AppConstants';

import {HomepageConfig, LocalStorageMethods, SessionStorageMethods} from './AppConstants';

const watches = require('./assets/json/watches.json');

import axios from 'axios'

const popupBox = {
    boxName: 'Welcome to my site!',
    boxTitle: 'Here, Read This!',
    colorShift: {
        begin: 'F00',
        end: 'FF9600'
    }
};

const NoResults = [null, ''];


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
            watches,
            popupBox,
            timestamp: {},
            ninetiesImgSize: 0,
            hitCounterFigures: HomepageConfig.hitCounterFigures,
            cacheAge: null,
            cacheValidity: null
        };

        const appActionsIds = flux.getActionIds(AppActions.ID);

        this.registerAsync(appActionsIds.fetchTimestamp, this.fetchTimestamp);
        this.registerAsync(appActionsIds.fetch90sImage, this.fetch90sImage);
        this.registerAsync(appActionsIds.fetchHitCount, this.fetchHitCount);
        this.register(appActionsIds.getLastPath, this.getLastPath);
        this.register(appActionsIds.recordLastPath, this.recordLastPath);
        this.register(appActionsIds.setCacheAge, this.setCacheAge);
    }


    getLocalCacheData = () => {
        var last = LocalStorageMethods.get(AppStore.APP_CACHE.KEY);
        var valid = LocalStorageMethods.get(AppStore.APP_CACHE.VALID);

        return {
            last,
            valid
        }
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
        if (dateDiff > AppStore.APP_CACHE.LIMIT  ||
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




    fetchTimestamp() {
        axios.get('/timestamp.json')
            .then((response) => {
                this.setState({
                    timestamp: response.data
                })
            })
    }

    fetch90sImage() {
        let url = 'http://redwall.herereadthis.com/api/banner_image/';
        let _this = this;

        // if the cache is too old, or if 90s image data has not been stored, or
        // if the size of the data has not been stored
        if (this.state.cacheValidity === false ||
            LocalStorageMethods.get(AppStore.NINETIES_IMG.NAME) === undefined ||
            LocalStorageMethods.get(AppStore.NINETIES_IMG.AMT) === undefined) {
            window.console.log('update cache!');
            axios.get(url)
                .then((response) => {
                    let dataLength = response.data.length;
                    window.console.log(dataLength);
                    window.console.log(_this.setNew90sIndex);
                    // store the size of the data
                    LocalStorageMethods.set(
                        AppStore.NINETIES_IMG.AMT,
                        dataLength
                    );
                    window.console.log(dataLength);
                    // store the 90s image data
                    LocalStorageMethods.set(
                        AppStore.NINETIES_IMG.NAME,
                        JSON.stringify(response.data)
                    );
                    window.console.log(dataLength);
                    window.console.log('awgohwfe');
                    window.console.log(this);
                    _this.setNew90sIndex(dataLength);
                }
            );
        }
        else {
            this.setNew90sIndex(
                LocalStorageMethods.get(AppStore.NINETIES_IMG.AMT));
        }
    }


    setNew90sIndex(size) {
        window.console.log('setNew90sIndex', size);
        this.setState({
            ninetiesImgSize: size
        });
        let randomIndex = AppConstants.getRandomInteger(size);
        let cIndex = LocalStorageMethods.get(AppStore.NINETIES_IMG.INDEX_NAME);


        window.console.log('aowigh;nk');
        // insure that the random generation is always different than the
        // previous render
        if (cIndex !== undefined) {
            while (randomIndex === cIndex) {
                randomIndex = AppConstants.getRandomInteger(size);
            }
        }
        // store a random number that is between 0 and the number of total
        // images stored in data
        window.console.log(AppConstants.getRandomInteger(size));
        LocalStorageMethods.set(
            AppStore.NINETIES_IMG.INDEX_NAME,
            AppConstants.getRandomInteger(size)
        );

    };

    fetchHitCount(path) {
        window.console.log(path);
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

