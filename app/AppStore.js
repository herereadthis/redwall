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
    static UPDATE_CACHE = {
        KEY: 'lastCache',
        TIME: 86400000
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
            hitCounterFigures: HomepageConfig.hitCounterFigures
        };

        const appActionsIds = flux.getActionIds(AppActions.ID);

        this.registerAsync(appActionsIds.fetchTimestamp, this.fetchTimestamp);
        this.registerAsync(appActionsIds.fetch90sImage, this.fetch90sImage);
        this.register(appActionsIds.store90sImage, this.store90sImage);
        this.registerAsync(appActionsIds.fetchHitCount, this.fetchHitCount);
        this.register(appActionsIds.getLastPath, this.getLastPath);
        this.register(appActionsIds.recordLastPath, this.recordLastPath);
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
        let updateCache = this.store90sImage();

        // if the cache is too old, or if 90s image data has not been stored, or
        // if the size of the data has not been stored
        if (updateCache === true ||
            LocalStorageMethods.get(AppStore.NINETIES_IMG.NAME) === undefined ||
            LocalStorageMethods.get(AppStore.NINETIES_IMG.AMT) === undefined) {
            window.console.log('update cache!');
            axios.get(url)
                .then((response) => {
                    let dataLength = response.data.length;
                    // store the size of the data
                    LocalStorageMethods.set(
                        AppStore.NINETIES_IMG.AMT,
                        dataLength
                    );
                    // store the 90s image data
                    LocalStorageMethods.set(
                        AppStore.NINETIES_IMG.NAME,
                        JSON.stringify(response.data)
                    );
                    // store the current time to define cache
                    LocalStorageMethods.set(
                        AppStore.UPDATE_CACHE.KEY,
                        new Date()
                    );
                    this.setNew90sIndex(dataLength);
                }
            );
        }
        else {
            this.setNew90sIndex(
                LocalStorageMethods.get(AppStore.NINETIES_IMG.AMT));
        }
    }
    setNew90sIndex = (size) => {
        this.setState({
            ninetiesImgSize: size
        });
        let randomIndex = AppConstants.getRandomInteger(size);
        let cIndex = LocalStorageMethods.get(AppStore.NINETIES_IMG.INDEX_NAME);

        // insure that the random generation is always different than the
        // previous render
        if (cIndex !== undefined) {
            while (randomIndex === cIndex) {
                randomIndex = AppConstants.getRandomInteger(size);
            }
        }
        // store a random number that is between 0 and the number of total
        // images stored in data
        LocalStorageMethods.set(
            AppStore.NINETIES_IMG.INDEX_NAME,
            AppConstants.getRandomInteger(size)
        );
    };

    store90sImage() {
        let cache90sImage, newCache, dateDiff, updateCache;

        cache90sImage = LocalStorageMethods.get(AppStore.UPDATE_CACHE.KEY);
        newCache = new Date();
        updateCache = false;

        if (cache90sImage === undefined) {
            cache90sImage = new Date();
            updateCache = true;
        }
        dateDiff = Date.parse(newCache) - Date.parse(cache90sImage);

        if (dateDiff - AppStore.UPDATE_CACHE.TIME > 0) {
            updateCache = true;
        }
        return updateCache;
    }


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

