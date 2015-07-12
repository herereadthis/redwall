import React from 'react';

import './NinetiesImgBox.less';

export default class NinetiesImgBox extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        var style = {
            color: '#FFF'
        };
        return (
            <div className="nineties_img_box">
                <div className="bellmaker_container">
                    <p style={style}>Nineties Image Box!!!!</p>
                </div>
            </div>
        );
    }
}

