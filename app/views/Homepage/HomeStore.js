import {Store} from 'flummox';
import axios from 'axios';

import HomeActions from './HomeActions.js';
import {LocalStorageMethods, getRandomInteger} from 'AppConstants.js';
import {HomepageConfig} from './HomeConstants.js';


export default class HomeStore extends Store {

    static ID = 'HomeStore';

    static NINETIES_IMG = {
        NAME: 'ninetiesImg',
        INDEX_NAME: 'ninetiesImgIndex',
        INDEX: 0,
        AMT: 'ninetiesImgCount'
    };

    constructor(flux) {
        super();

        this.state = {
            timestamp: {},
            hitCounterFigures: HomepageConfig.hitCounterFigures,
            ninetiesImgSize: 0
        };

        let homeActionIds = flux.getActionIds(HomeActions.ID);

        this.register(homeActionIds.foo, this.foo);
        this.registerAsync(homeActionIds.fetchTimestamp, this.fetchTimestamp);
        this.registerAsync(homeActionIds.fetch90sImage, this.fetch90sImage);
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

    fetch90sImage(cacheValidity) {
        let url = 'http://redwall.herereadthis.com/api/banner_image/';

        // if the cache is too old, or if 90s image data has not been stored, or
        // if the size of the data has not been stored
        if (cacheValidity === false ||
            LocalStorageMethods.get(HomeStore.NINETIES_IMG.NAME) === undefined ||
            LocalStorageMethods.get(HomeStore.NINETIES_IMG.AMT) === undefined) {
            window.console.log('update cache!');
            axios.get(url)
                .then((response) => {
                    let dataLength = response.data.length;
                    // store the size of the data
                    LocalStorageMethods.set(
                        HomeStore.NINETIES_IMG.AMT,
                        dataLength
                    );
                    // store the 90s image data
                    LocalStorageMethods.set(
                        HomeStore.NINETIES_IMG.NAME,
                        JSON.stringify(response.data)
                    );
                    this.setNew90sIndex(dataLength);
                }
            );
        }
        else {
            this.setNew90sIndex(
                LocalStorageMethods.get(HomeStore.NINETIES_IMG.AMT));
        }
    }

    setNew90sIndex = (size) => {
        let randomIndex = getRandomInteger(size),
            cIndex = LocalStorageMethods.get(HomeStore.NINETIES_IMG.INDEX_NAME);

        // insure that the random generation is always different than the
        // previous render
        if (cIndex !== undefined) {
            while (randomIndex === cIndex) {
                randomIndex = getRandomInteger(size);
            }
        }

        // store a random number that is between 0 and the number of total
        // images stored in data
        LocalStorageMethods.set(
            HomeStore.NINETIES_IMG.INDEX_NAME,
            randomIndex
        );
        this.setState({
            ninetiesImgSize: size
        });
    };
}

