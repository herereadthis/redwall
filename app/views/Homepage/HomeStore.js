import {Store} from 'flummox';
import axios from 'axios';
import _ from 'lodash';

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
            popupBox: HomepageConfig.popupBox,
            timestamp: {},
            hitCounterFigures: HomepageConfig.hitCounterFigures,
            showNinetiesImgBox: false
        };

        let homeActionIds = flux.getActionIds(HomeActions.ID);

        this.register(homeActionIds.foo, this.foo);
        this.register(homeActionIds.showNinetiesImgBox, this.showNinetiesImgBox);
        this.registerAsync(homeActionIds.fetchTimestamp, this.fetchTimestamp);
        this.register(homeActionIds.fetch90sImage, this.fetch90sImage);
        this.register(homeActionIds.setNew90sIndex, this.setNew90sIndex);
        this.register(homeActionIds.set90sNavRoutes, this.set90sNavRoutes);
        this.register(homeActionIds.set90slist, this.set90slist);
    }

    foo = (message) => {
        window.console.log(message);
    };

    showNinetiesImgBox = (status) => {
        this.setState({
            showNinetiesImgBox: status
        });
    };

    fetchTimestamp() {
        axios.get('/timestamp.json')
            .then((response) => {
                this.setState({
                    timestamp: response.data
                });
            });
    }

    fetch90sImage(obj) {
        let url = 'http://redwall.herereadthis.com/api/banner_image/';

        // if the cache is too old, or if 90s image data has not been stored, or
        // if the size of the data has not been stored
        if (obj.cacheValidity === false ||
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
                    this.setNew90sIndex({
                        size: dataLength,
                        routeID: obj.routeID
                    });
                }
            );
        }
        else {
            this.setNew90sIndex({
                size: LocalStorageMethods.get(HomeStore.NINETIES_IMG.AMT),
                routeID: obj.routeID
            });
        }
    }

    setNew90sIndex = (obj) => {
        var finalIndex, ninetiesImgSelection, ninetiesImgJSON, randomIndex,
            cIndex, {size, routeID} = obj;

        ninetiesImgJSON = JSON.parse(LocalStorageMethods.
            get(HomeStore.NINETIES_IMG.NAME));

        if (routeID !== undefined) {
            ninetiesImgSelection = _.find(ninetiesImgJSON, (item) => {
                return item.unique_id === routeID;
            });
            finalIndex = ninetiesImgSelection.pk;
        }
        else {
            randomIndex = getRandomInteger(size);
            cIndex = LocalStorageMethods.get(HomeStore.NINETIES_IMG.INDEX_NAME);

            // insure that the random generation is always different than the
            // previous render
            if (cIndex !== undefined) {
                while (randomIndex === cIndex) {
                    randomIndex = getRandomInteger(size);
                }
            }
            finalIndex = randomIndex + 1;

            ninetiesImgSelection = _.find(ninetiesImgJSON, (item) => {
                return parseInt(item.pk, 10) === finalIndex;
            });
        }
        // store a random number that is between 0 and the number of total
        // images stored in data
        LocalStorageMethods.set(
            HomeStore.NINETIES_IMG.INDEX_NAME,
            finalIndex
        );
        this.setState({
            ninetiesImgSelection,
            ninetiesImgSize: size
        });
    };

    set90sNavRoutes = (obj) => {
        var ninetiesImgJSON, prevID, nextID, prevRoute, nextRoute,
            {size, routeID} = obj;

        routeID = parseInt(routeID, 10);

        ninetiesImgJSON = JSON.parse(LocalStorageMethods.
            get(HomeStore.NINETIES_IMG.NAME));

        if (routeID === 1) {
            prevID = size;
        }
        else if (routeID === size) {
            nextID = 1;
        }
        if (prevID === undefined) {
            prevID = routeID - 1;
        }
        if (nextID === undefined) {
            nextID = routeID + 1;
        }

        prevRoute = _.find(ninetiesImgJSON, (item) => {
            return parseInt(item.pk, 10) === prevID;
        }).unique_id;

        nextRoute = _.find(ninetiesImgJSON, (item) => {
            return parseInt(item.pk, 10) === nextID;
        }).unique_id;

        this.setState({
            ninetiesRoutes: {
                prevRoute,
                nextRoute
            }
        });
    };

    set90slist = () => {
        var ninetiesImgJSON, ninetiesImgListing;

        ninetiesImgJSON = JSON.parse(LocalStorageMethods.
            get(HomeStore.NINETIES_IMG.NAME));

        ninetiesImgListing = ninetiesImgJSON.map((value) => {
            return {
                uniqueID: value.unique_id,
                thumbnail: value.thumbnail,
                title: value.title
            };
        });
        this.setState({
            ninetiesImgListing
        });
    };
}
