import React from 'react';

import {RouteHandler} from 'react-router';

import HomeActions from 'views/Homepage/HomeActions.js';

import {getRouteData} from 'AppConstants.js';
import AppRoutes from 'AppRoutes.js';

import './NinetiesImgBox.less';

export default class NinetiesImgBox extends React.Component {

    constructor() {
        super();
    }

    static contextTypes = {
        router: React.PropTypes.func
    };

    componentWillMount() {
        window.console.log(this.props.ninetiesImgSelection.unique_id);
        var {router} = this.context, routeData;
        routeData = getRouteData(router);

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
    }

    componentWillReceiveProps() {
    }

    closeNinetiesBox = () => {
        this.props.flux.getActions(HomeActions.ID).showNinetiesImgBox(false);
    };

    render() {
        return (
            <div className="nineties_img_box">
                <div className="bellmaker_container">
                    <div className="nineties_img_header">
                        <div className="nineties_img_head_button mac_os8_sprites close" onClick={this.closeNinetiesBox}></div>
                        <div className="nineties_img_head_button mac_os8_sprites resize" onClick={this.closeNinetiesBox}></div>
                        <div className="nineties_img_head_button mac_os8_sprites minimize" onClick={this.closeNinetiesBox}></div>
                        <div className="nineties_img_head_text mac_os8_sprites pictures" onClick={this.closeNinetiesBox}></div>
                        </div>
                    <div className="nineties_img_container">
                        <p>Nineties Image Box!!!!</p>

                        <p>Route</p>
                        <RouteHandler />
                        <p>Handler</p>
                    </div>
                </div>
            </div>
        );
    }
}

