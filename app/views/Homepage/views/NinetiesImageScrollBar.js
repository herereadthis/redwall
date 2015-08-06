import React from 'react';
//import HomeActions from 'views/Homepage/HomeActions.js';
//import AppRoutes from 'AppRoutes.js';
//
//import NinetiesImageMethods from './NinetiesImageMethods.js';
//
//import {DomUtils} from 'AppConstants.js';

export default class NinetiesImageScrollBar extends React.Component {
    render () {
        return (
            <div className="mac_os8_scroll_bar">
                <div onClick={this.tabScroll.bind(this, 'up')}
                     className="mac_os8_scroll_tab mac_os8_sprites up" />
                <div onClick={this.tabScroll.bind(this, 'down')}
                     className="mac_os8_scroll_tab mac_os8_sprites down" />
                <div className="mac_os8_scroll_button mac_os8_sprites"
                     onMouseDown={this.startDragScrollButton.bind(this)}
                     ref="macScrollButton" style={style}/>
            </div>
        );
    }
}
