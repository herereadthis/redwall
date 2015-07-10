import {Store} from 'flummox';

import WatchActions from './WatchActions.js';
import axios from 'axios';
import _ from 'lodash';


export default class WatchStore extends Store {

    static ID = 'WatchStore';

    constructor(flux) {
        super();

        let watchActionIds = flux.getActionIds(WatchActions.ID);

        this.register(watchActionIds.foo, this.foo);
        this.registerAsync(watchActionIds.fetchWatches, this.fetchWatches);
    }

    foo = (message) => {
        window.console.log(message);
    };

    fetchWatches() {
        let url = 'assets/json/watches.json', _i;
        axios.get(url)
            .then((response) => {

                for (_i = 0; _i < response.data.length; _i = _i + 1) {
                    response.data[_i].parentCompany = this.getParent(response.data[_i].id, response.data);
                }

                this.setState({
                    watches: response.data
                });
            });
    }



    getParent = (id, watches) => {
        //window.console.log(this.props.watches);
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

