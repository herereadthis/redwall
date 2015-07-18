import React from 'react';

import HomeActions from 'views/Homepage/HomeActions.js';
//import HomeStore from 'views/Homepage/HomeStore.js';

import NinetiesImgBox from './NinetiesImgBox.js';

//import {LocalStorageMethods} from 'AppConstants';

import PopupBoxSimulator from './PopupBoxSimulator';
import {getRouteData} from 'AppConstants.js';
import AppRoutes from 'AppRoutes.js';

export default class Banner extends React.Component {
//class Banner extends React.Component {

    constructor() {
        super();
        this.state = {
            bannerImg: undefined
        };
    }

    static contextTypes = {
        router: React.PropTypes.func
    };

    componentWillMount() {
        var {router} = this.context, routeData;
        routeData = getRouteData(router);

        if (this.props.cacheValidity !== undefined) {
            this.fetch90sImage(this.props.cacheValidity, routeData.id);
        }

        window.console.log(routeData.name, this.props.showNinetiesImgBox);

        if (routeData.name === AppRoutes.NINETIES_IMG ||
            routeData.name === AppRoutes.NINETIES_IMG_INDEX) {
            if (this.props.showNinetiesImgBox !== true) {
                this.props.flux.getActions(HomeActions.ID).showNinetiesImgBox(true);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        var {router} = this.context, routeData;
        routeData = getRouteData(router);


        //let ninetiesImgSize, showNinetiesImgBox, cacheAge, ninetiesImgSelection;
        //
        //ninetiesImgSize = nextProps.ninetiesImgSize !== this.props.ninetiesImgSize;
        //showNinetiesImgBox = nextProps.showNinetiesImgBox !== this.props.showNinetiesImgBox;
        //cacheAge = nextProps.cacheAge !== this.props.cacheAge;
        //ninetiesImgSelection = nextProps.ninetiesImgSelection !== this.props.ninetiesImgSelection;
        //
        //window.console.log(ninetiesImgSize, showNinetiesImgBox, cacheAge, ninetiesImgSelection);


        if (nextProps.cacheValidity !== this.props.cacheValidity) {
            this.fetch90sImage(nextProps.cacheValidity, routeData.id);
        }

        if (routeData.id !== undefined &&
            routeData.name === AppRoutes.NINETIES_IMG) {

            if (this.props.showNinetiesImgBox === false && nextProps.showNinetiesImgBox === false) {
                window.console.log(1);
                nextProps.flux.getActions(HomeActions.ID).showNinetiesImgBox(true);

                //router.transitionTo(AppRoutes.APP);
                window.console.log(10);
                if (nextProps.ninetiesImgSelection === undefined) {
                    window.console.log(5);
                    //nextProps.flux.getActions(HomeActions.ID).getNewNinetiesImgSelection(routeData.name);
                }
            }

            if (this.props.showNinetiesImgBox === true && nextProps.showNinetiesImgBox === false) {
                window.console.log(2);
                router.transitionTo(AppRoutes.APP);
            }


            if (nextProps.ninetiesImgSelection !== undefined) {
                if (nextProps.ninetiesImgSelection.unique_id !== undefined &&
                    nextProps.ninetiesImgSelection.unique_id !== routeData.id) {
                    window.console.log(8);
                    this.fetch90sImage(nextProps.cacheValidity, routeData.id);
                }
            }
        }
        if (routeData.id === undefined &&
            routeData.name === AppRoutes.APP) {

            if (this.props.showNinetiesImgBox === true && nextProps.showNinetiesImgBox === true) {
                window.console.log(3);
                nextProps.flux.getActions(HomeActions.ID).showNinetiesImgBox(false);
            }
        }
        if (routeData.name === AppRoutes.NINETIES_IMG_INDEX) {
            window.console.log(this.props.showNinetiesImgBox, nextProps.showNinetiesImgBox);
            if (this.props.showNinetiesImgBox === false) {
                nextProps.flux.getActions(HomeActions.ID).showNinetiesImgBox(true);
            }
            if (this.props.showNinetiesImgBox === true && nextProps.showNinetiesImgBox === false) {
                window.console.log(6);
                router.transitionTo(AppRoutes.APP);
            }
        }
    }

    //shouldComponentUpdate(nextProps) {
    //    var ninetiesImgSize, showNinetiesImgBox, cacheAge, ninetiesImgSelection;
    //
    //    ninetiesImgSize = nextProps.ninetiesImgSize !== this.props.ninetiesImgSize;
    //    showNinetiesImgBox = nextProps.showNinetiesImgBox !== this.props.showNinetiesImgBox;
    //    cacheAge = nextProps.cacheAge !== this.props.cacheAge;
    //    ninetiesImgSelection = nextProps.ninetiesImgSelection !== this.props.nMET-504-store-new-urlsinetiesImgSelection;
    //
    //    window.console.log(nextProps.ninetiesImgSelection, this.props.ninetiesImgSelection);
    //    window.console.log(ninetiesImgSize, showNinetiesImgBox, cacheAge, ninetiesImgSelection);
    //
    //    if (ninetiesImgSize === true || showNinetiesImgBox === true ||
    //        cacheAge === true || ninetiesImgSelection === true) {
    //        return false;
    //    }
    //    else {
    //        return true;
    //    }
    //}

    fetch90sImage = (cacheValidity, routeID) => {
        this.props.flux.getActions(HomeActions.ID).fetch90sImage(cacheValidity, routeID);
    };

    handleClick = (e) => {
        e.preventDefault();

        this.props.flux.getActions(HomeActions.ID).showNinetiesImgBox(true);
    };

    popupContent() {
        var foafLogoUrl = 'http://herereadthis.com/build/images/branding/' +
            'herereadthis_logo.svg';

        return (
            <p typeof="foaf:Person" resource="#/me/">
                <span>Hi! My Name is </span>
                <span property="foaf:name">
                    <span property="foaf:nick">Jimmy</span>
                    <span> </span>
                    <span property="foaf:family_name">Ha</span>
                </span>
                <span property="foaf:givenname" content="James"></span>
                <span property="foaf:logo"
                      content={foafLogoUrl}></span>
                <span> and I </span>
                <span property="v:title"
                      content="UX Web Developer">make web pages</span>,
                <span resource="http://herereadthis.com/"
                      property="v:url foaf:homepage"></span>
                <span> specializing in user interface development and
                    single-page applications. I live and play in the </span>
                <span property="v:Postal" resource="#/me/address/"
                      typeof="v:Address">
                     <span property="v:locality" content="Washington"></span>
                     <span property="v:region">DC</span>
                </span>
                <span> metro area. </span>
                <span property="foaf:based_near" resource="#/me/geo/"
                      typeof="geo:point"
                      prefix="geo: http://www.w3.org/2003/01/geo/wgs84_pos#">
                     <span property="geo:lat" content="38.886757"></span>
                     <span property="geo:long" content="-77.041626"></span>
                </span>
                <span> I do </span>
                <span property="foaf:topic_interest">photography</span>
                <span> with a Hasselblad camera, </span>
                <span property="foaf:topic_interest"
                      content="gardening">grow roses</span>
                <span>, </span>
                <span property="foaf:topic_interest"
                      content="baking">bake pastries</span>
                <span>, dance at </span>
                <span property="foaf:topic_interest"
                      content="Burning Man">Burner festivals</span>
                <span>, and practice </span>
                <span property="foaf:topic_interest">Kyudo</span>
                <span>. I put Sriracha on everything.</span>
            </p>
        );
    }

    getBannerImage = () => {
        //let ninetiesImg, ninetiesImgIndex, imgIndex, targetImg;

        //ninetiesImg = LocalStorageMethods.get(HomeStore.NINETIES_IMG.NAME);
        //ninetiesImgIndex = LocalStorageMethods.get(HomeStore.NINETIES_IMG.INDEX_NAME);

        if (this.props.ninetiesImgSelection !== undefined) {
            return (
                <img src={this.props.ninetiesImgSelection.thumbnail} ref="bannerImage" />
            );
        }
    };

    showNinetiesImgBox = () => {
        if (this.props.showNinetiesImgBox === true) {
            var propsSubset = {
                flux: this.props.flux,
                showNinetiesImgBox: this.props.showNinetiesImgBox,
                ninetiesImgSelection: this.props.ninetiesImgSelection,
                ninetiesImgListing: this.props.ninetiesImgListing,
                ninetiesImgSize: this.props.ninetiesImgSize,
                ninetiesRoutes: this.props.ninetiesRoutes
            };

            return (
                <NinetiesImgBox {...propsSubset} />
            );
        }
    };

    render() {
        //window.console.log(this.props);

        return (
            <header role="banner" ref="starfield parallax_scroll"
                    className="starfield parallax_scroll"
                    data-parallax-speed="-50">
                <div className="bellmaker_container">
                    <div id="construction" role="presentation"></div>
                    <div id="header_panel" data-module="banner_image" ref="bannerImg">
                        <a href="" onClick={this.handleClick} ref="bannerAnchor">
                            <span>Stand by for a 90s image!</span>
                            {this.getBannerImage()}
                        </a>
                    </div>
                    <PopupBoxSimulator data={this.props.popupBox}>
                        {this.popupContent()}
                    </PopupBoxSimulator>
                </div>
                {this.showNinetiesImgBox()}
            </header>
        );
    }
}
