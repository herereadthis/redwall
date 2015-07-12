import React from 'react';

import HomeActions from 'views/Homepage/HomeActions.js';
import HomeStore from 'views/Homepage/HomeStore.js';

import NinetiesImgBox from './NinetiesImgBox.js';

import {LocalStorageMethods} from 'AppConstants';

import PopupBoxSimulator from './PopupBoxSimulator';

export default class Banner extends React.Component {
//class Banner extends React.Component {

    constructor() {
        super();
        this.state = {
            bannerImg: undefined
        };
    }

    componentWillMount() {
        if (this.props.cacheValidity !== undefined) {
            this.fetch90sImage(this.props.cacheValidity);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cacheValidity !== this.props.cacheValidity) {
            this.fetch90sImage(nextProps.cacheValidity);
        }

    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.ninetiesImgSize !== this.props.ninetiesImgSize ||
            nextProps.showNinetiesImgBox !== nextProps.showNinetiesImgBox) {
            return false;
        }
        else {
            return true;
        }
    }

    fetch90sImage = (cacheValidity) => {
        this.props.flux.getActions(HomeActions.ID).fetch90sImage(cacheValidity);
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
        let ninetiesImg, ninetiesImgIndex, imgIndex, targetImg;

        ninetiesImg = LocalStorageMethods.get(HomeStore.NINETIES_IMG.NAME);
        ninetiesImgIndex = LocalStorageMethods.get(HomeStore.NINETIES_IMG.INDEX_NAME);
        if (ninetiesImg !== undefined && ninetiesImgIndex !== undefined) {
            ninetiesImg = JSON.parse(ninetiesImg);
            imgIndex = ninetiesImgIndex;
            targetImg = ninetiesImg[imgIndex];

            return (
                <img src={targetImg.thumbnail} ref="bannerImage" />
            );
        }
        else if (this.props.cacheValidity !== undefined) {
            this.fetch90sImage(this.props.cacheValidity);
            return null;
        }
    };

    showNinetiesImgBox = () => {
        if (this.props.showNinetiesImgBox === true) {
            return (
                <NinetiesImgBox {...this.props} />
            );
        }
    };

    render() {
        let ninetiesImg = LocalStorageMethods.get(HomeStore.NINETIES_IMG.NAME);
        if (ninetiesImg !== undefined) {
            ninetiesImg = JSON.parse(ninetiesImg);
        }
        else {
            ninetiesImg = null;
        }

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
