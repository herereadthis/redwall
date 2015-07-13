import React from 'react';

import HomeActions from 'views/Homepage/HomeActions.js';

import './NinetiesImgBox.less';

export default class NinetiesImgBox extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
    }

    componentDidMount() {
        var _this = this;
        window.addEventListener('keyup', function (e) {
            if (e.keyCode === 27) {
                _this.props.flux.getActions(HomeActions.ID).showNinetiesImgBox(false);
            }
        }, true);
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
                    </div>
                </div>
            </div>
        );
    }
}

