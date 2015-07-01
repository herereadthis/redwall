'use strict';

import React from 'react';

import AppActions from 'AppActions';
import AppStore from 'AppStore';
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
        this.props.flux.getActions(AppActions.ID).fetch90sImage(true);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.ninetiesImgSize !== this.props.ninetiesImgSize;
    }

    handleClick = (e) => {
        e.preventDefault();
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
        let ninetiesImg, imgIndex, targetImg;

        ninetiesImg = LocalStorageMethods.get(AppStore.NINETIES_IMG.NAME);
        if (ninetiesImg !== undefined) {
            ninetiesImg = JSON.parse(ninetiesImg);
            imgIndex = LocalStorageMethods.get(AppStore.NINETIES_IMG.INDEX_NAME);
            targetImg = ninetiesImg[imgIndex];

            return (
                <img src={targetImg.thumbnail} ref="bannerImage" />
            );
        }
        else {
            return null;
        }
    };

    render() {
        let ninetiesImg = LocalStorageMethods.get(AppStore.NINETIES_IMG.NAME);
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
            </header>
        );
    }
}
