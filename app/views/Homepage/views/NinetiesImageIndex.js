import React from 'react';
import HomeActions from 'views/Homepage/HomeActions.js';
import AppRoutes from 'AppRoutes.js';

import NinetiesImageMethods from './NinetiesImageMethods.js';

import {DomUtils} from 'AppConstants.js';

export default class NinetiesImageIndex extends React.Component {

    constructor() {
        super();
    }

    static contextTypes = {
        router: React.PropTypes.func
    };

    componentWillMount() {
        this.props.flux.getActions(HomeActions.ID).set90slist();
    }

    componentDidMount() {

        //NinetiesImageMethods.fixScrollContainerHeight(scrollBoxContainer);
        //NinetiesImageMethods.fixScrollBoxHeight(scrollBox);
    }

    componentWillReceiveProps() {
        if (this.props.listing !== undefined) {
            this.setScrollHeight();
        }
    }

    setScrollHeight = () => {
        var scrollBoxContainer, scrollBox;

        scrollBoxContainer = React.findDOMNode(this.refs.scrollBoxContainer);
        scrollBox = React.findDOMNode(this.refs.scrollBox);

        NinetiesImageMethods.fixScrollContainerHeight(scrollBoxContainer);
        NinetiesImageMethods.fixScrollBoxHeight(scrollBox);

        this.makeThatScrollbar();
    };

    makeThatScrollbar = () => {

        var scrollBoxContainer, scrollBox, scrollContainerHeight, scrollBoxHeight;

        scrollBoxContainer = React.findDOMNode(this.refs.scrollBoxContainer);
        scrollBox = React.findDOMNode(this.refs.scrollBox);

        scrollBoxContainer.scrollTop = 0;

        if (DomUtils.hasClass(scrollBoxContainer, 'mac_os8_scrollable') === true) {
            window.console.log(2);
            DomUtils.removeClass(scrollBoxContainer, 'mac_os8_scrollable');
        }

        scrollContainerHeight = scrollBoxContainer.offsetHeight;
        scrollBoxHeight = scrollBox.offsetHeight;

        window.console.log(scrollContainerHeight, scrollBoxHeight);

        if (scrollContainerHeight < scrollBoxHeight) {
            DomUtils.addClass(scrollBoxContainer, 'mac_os8_scrollable');
            this.setState({
                'scrollable': true
            });
        }
        else {
            DomUtils.removeClass(scrollBoxContainer, 'mac_os8_scrollable');
            this.setState({
                'scrollable': false
            });
        }
    };

    handleClick = (uniqueID) => {
        this.context.router.transitionTo(AppRoutes.NINETIES_IMG, {id: uniqueID});
    };

    renderListing = () => {
        return this.props.listing.map((value, key) => {
            return (
                <li key={key}
                    id={`listing-${value.uniqueID}`}
                    onClick={this.handleClick.bind(this, value.uniqueID)}>
                    <div>
                        <img src={value.thumbnail}/>
                    </div>
                    <p>{value.title}</p>
                </li>
            );
        });
    };

    renderIndex = () => {
        return (
            <ul className="nineties_img_index_scroll clear_floats"
                id="nineties_img_index_scroll"
                ref="scrollBox">
                {this.renderListing()}
            </ul>
        );
    };


    render() {
        if (this.props.listing === undefined) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        else {
            return (
                <div className="ninties_img_listing"
                    id="nineties_img_index_scroll_container"
                    ref="scrollBoxContainer">
                    {this.renderIndex()}
                </div>
            );
        }
    }
}
