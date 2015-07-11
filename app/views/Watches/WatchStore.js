import {Store} from 'flummox';

import WatchActions from './WatchActions.js';
import axios from 'axios';
import _ from 'lodash';

import {LocalStorageMethods} from 'AppConstants';

export default class WatchStore extends Store {

    static ID = 'WatchStore';

    static WATCH_DATA = {
        NAME: 'watchData'
    };

    constructor(flux) {
        super();

        let watchActionIds = flux.getActionIds(WatchActions.ID);

        this.registerAsync(watchActionIds.fetchWatchData, this.fetchWatchData);
    }

    fetchWatchData = (cacheValidity) => {
        var watchData;

        watchData = LocalStorageMethods.get(WatchStore.WATCH_DATA.NAME);

        if (watchData !== undefined && cacheValidity === true) {
            this.setState({
                watchData: JSON.parse(watchData)
            });
        }
        else {
            let url = 'assets/json/watches.json', _i;
            axios.get(url)
                .then((response) => {
                    window.console.log('asdfasfd');
                    for (_i = 0; _i < response.data.length; _i = _i + 1) {
                        response.data[_i].parentCompany =
                            this.getParent(response.data[_i].id, response.data);
                    }

                    LocalStorageMethods.set(
                        WatchStore.WATCH_DATA.NAME,
                        JSON.stringify(response.data)
                    );
                    this.setState({
                        watchData: response.data
                    });
                });

        }
    };


    getParent = (id, watches) => {
        var parentLicense, parentOwner, parentCompany, parent;

        parentLicense = _.find(watches, (watch) => {

            if (watch.licences !== undefined) {
                return watch.licences.indexOf(id) !== -1;
            }
        });
        if (parentLicense === undefined) {
            parentOwner = _.find(watches, (watch) => {

                if (watch.ownership !== undefined) {
                    return watch.ownership.indexOf(id) !== -1;
                }
            });
        }
        else {
            parentCompany = parentLicense;
        }
        if (parentOwner !== undefined) {
            parentCompany = parentOwner;
        }
        if (parentCompany === undefined) {
            parent = '';
        }
        else {
            parent = parentCompany.companyName;
        }
        return parent;
    };
}

