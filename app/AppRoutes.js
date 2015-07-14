import React from 'react';
import {Route} from 'react-router';


import App from './app';
import NinetiesImage from 'views/Homepage/views/NinetiesImage.js';
import NinetiesImageIndex from 'views/Homepage/views/NinetiesImageIndex.js';


var routes, APP, NINETIES_IMG, NINETIES_IMG_INDEX;

APP = 'app';
NINETIES_IMG = 'nineties-image';
NINETIES_IMG_INDEX = 'nineties-image-index';


routes = (
        <Route name={APP} path="/" handler={App}>
            <Route name={NINETIES_IMG} path="nineties-image/:id"
                   handler={NinetiesImage}/>
            <Route name={NINETIES_IMG_INDEX} path="nineties-image"
                   handler={NinetiesImageIndex}/>
        </Route>
);

export default {
    APP,
    NINETIES_IMG,
    NINETIES_IMG_INDEX,
    routes
};
