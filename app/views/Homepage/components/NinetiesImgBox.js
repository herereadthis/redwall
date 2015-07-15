import React from 'react';

import {RouteHandler} from 'react-router';

import HomeActions from 'views/Homepage/HomeActions.js';

import {getRouteData, DomUtils} from 'AppConstants.js';
import AppRoutes from 'AppRoutes.js';

export default class NinetiesImgBox extends React.Component {

    constructor() {
        super();
    }

    static contextTypes = {
        router: React.PropTypes.func
    };

    static DISABLE_BODY_SCROLL_CLASS = 'disable_body_scroll';

    componentWillMount() {
        var {router} = this.context, routeData;
        routeData = getRouteData(router);

        if (this.props.ninetiesImgSelection !== undefined) {
            window.console.log(this.props.ninetiesImgSelection.unique_id);
        }
        else {
            window.console.log(4);
            this.props.flux.getActions(HomeActions.ID).getNewNinetiesImgSelection(routeData.name);
        }

        window.console.log(routeData, AppRoutes.APP);

        if (routeData.name === AppRoutes.APP &&
            routeData.id === undefined &&
            this.props.ninetiesImgSelection.unique_id !== undefined) {
            router.transitionTo(AppRoutes.NINETIES_IMG,
                {id: this.props.ninetiesImgSelection.unique_id});
        }
        //if (routeData.id !== undefined &&
        //    routeData.name === AppRoutes.NINETIES_IMG) {
        //    router.transitionTo(AppRoutes.NINETIES_IMG,
        //        {id: routeData.id});
        //}

        DomUtils.addClass(document.body,
            NinetiesImgBox.DISABLE_BODY_SCROLL_CLASS);

    }

    componentDidMount() {
        var _this = this;
        window.addEventListener('keyup', function (e) {
            if (e.keyCode === 27) {
                _this.props.flux.getActions(HomeActions.ID).showNinetiesImgBox(false);
            }
        }, true);
    }

    componentWillUnmount() {
        window.console.log(this.props.showNinetiesImgBox);

        DomUtils.removeClass(document.body,
            NinetiesImgBox.DISABLE_BODY_SCROLL_CLASS);
    }

    componentWillReceiveProps(nextProps) {
        window.console.log(nextProps.ninetiesImgSelection);
    }

    closeNinetiesBox = () => {
        this.props.flux.getActions(HomeActions.ID).showNinetiesImgBox(false);
    };

    render() {
        var classes = 'nineties_img_head_text free_text';
        classes = `${classes} ${this.props.ninetiesImgSelection.unique_id}`;
        return (
            <div className="nineties_img_box">
                <div className="bellmaker_container">
                    <div className="nineties_img_header">
                        <div className="nineties_img_head_button mac_os8_sprites close"
                            onClick={this.closeNinetiesBox} />
                        <div className="nineties_img_head_button mac_os8_sprites resize"
                            onClick={this.closeNinetiesBox} />
                        <div className="nineties_img_head_button mac_os8_sprites minimize"
                            onClick={this.closeNinetiesBox} />
                        {/*<div className="nineties_img_head_text mac_os8_sprites pictures"
                             onClick={this.closeNinetiesBox} />*/}
                        <div className={classes}>
                            <span>{this.props.ninetiesImgSelection.title}</span>
                        </div>
                    </div>
                    <div className="nineties_img_container">
                        <RouteHandler data={this.props.ninetiesImgSelection}
                                      dataCount={this.props.ninetiesImgSize}
                                        flux={this.props.flux}/>
                    </div>
                </div>
            </div>
        );
    }
}

