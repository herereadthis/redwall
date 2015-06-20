'use strict';

import React from 'react';

import PopupBoxSimulator from './PopupBoxSimulator';

import AppActions from 'AppActions';
import AppStore from 'AppStore';

import ParallaxScroll from 'components/ParallaxScroll';

let bannerHasImg = null;

import {LocalStorageMethods} from 'AppConstants';


export default class Banner extends React.Component {
//class Banner extends React.Component {

    constructor() {
        super();
        this.state = {
            bannerImg: undefined
        };
    }

    componentWillMount() {
        this.props.flux.getActions(AppActions.ID).store90sImage(true);
        this.props.flux.getActions(AppActions.ID).fetch90sImage(true);
    }

    /*
    componentWillReceiveProps(nextProps) {
        if (nextProps.ninetiesImg !== 0) {
            let bannerImg = nextProps.ninetiesImg[0];
            this.setState({
                bannerImg
            });
        }
    }
    */


    componentDidMount() {
        var starfield = React.findDOMNode(this.refs.starfield);

        ParallaxScroll.moveBackground(-50, starfield);

        window.addEventListener('resize', function () {
            ParallaxScroll.killScrollListener();
            ParallaxScroll.moveBackground(-50, starfield);
        }, true);
    }



    shouldComponentUpdate(nextProps, nextState) {
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

    makeImage = () => {
        /*
        if (this.props.ninetiesImg.length === 0) {
            return '';
        }
        else {
            if (bannerHasImg === null) {
                bannerHasImg = this.state.bannerImg.thumbnail;
                return bannerHasImg
            }
            else {
                return '';
            }
            window.console.log('asdf');
            return '';
        }
    */
    };
    getBannerImage = () => {
        let ninetiesImg = LocalStorageMethods.get(AppStore.NINETIES_IMG.NAME);
        if (ninetiesImg !== undefined) {
            ninetiesImg = JSON.parse(ninetiesImg);
            let imgIndex = LocalStorageMethods.get(AppStore.NINETIES_IMG.INDEX_NAME);
            let targetImg = ninetiesImg[imgIndex];

            return (
                <img src={targetImg.thumbnail} ref="bannerImage" />
            )
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
            <header role="banner" ref="starfield" className="starfield parallax_scroll">
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

//export default ParallaxScroll(Banner);

