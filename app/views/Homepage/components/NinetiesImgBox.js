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

    render() {
        return (
            <div className="nineties_img_box">
                <div className="bellmaker_container">
                    <div className="nineties_img_container">
                        <p>Nineties Image Box!!!!</p>
                    </div>
                </div>
            </div>
        );
    }
}

