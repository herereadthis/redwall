import React from 'react';
import HomeActions from 'views/Homepage/HomeActions.js';
import AppRoutes from 'AppRoutes.js';
import {Link} from 'react-router';

import NinetiesImageMethods from './NinetiesImageMethods.js';

import {DomUtils} from 'AppConstants.js';

export default class NinetiesImage extends React.Component {

    constructor() {
        super();
        this.state = {
            scrollable: false,
            scrollPos: 0
        };
    }

    static contextTypes = {
        router: React.PropTypes.func
    };

    static scrollIncrement = 40;

    componentWillMount() {
    }

    componentDidMount() {
        var _this, scrollBoxContainer;
        //var _this;

        _this = this;
        scrollBoxContainer = React.findDOMNode(this.refs.scrollBoxContainer);

        this.props.flux.getActions(HomeActions.ID).set90sNavRoutes(
            this.props.dataCount, this.props.data.pk);

        window.addEventListener('keyup', function (e) {
            if (e.keyCode === 37) {
                _this.handleClick('prev');
            }
            if (e.keyCode === 39) {
                _this.handleClick('next');
            }
        }, true);
        NinetiesImageMethods.fixScrollContainerHeight(scrollBoxContainer);

        this.makeThatScrollbar();
    }

    componentWillUnmount() {
        NinetiesImageMethods.killResizeListener();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.pk !== this.props.data.pk) {
            this.props.flux.getActions(HomeActions.ID).set90sNavRoutes(this.props.dataCount, nextProps.data.pk);

        }

        this.makeThatScrollbar();
    }

    makeThatScrollbar = () => {
        var scrollBoxContainer, scrollBox, scrollContainerHeight, scrollBoxHeight;

        scrollBoxContainer = React.findDOMNode(this.refs.scrollBoxContainer);
        scrollBox = React.findDOMNode(this.refs.scrollBox);

        scrollContainerHeight = scrollBoxContainer.offsetHeight;
        scrollBoxHeight = scrollBox.offsetHeight;

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

    tabScroll = (direction) => {
        window.console.log(direction, NinetiesImage.scrollIncrement);

        var scrollBoxContainer, scrollBox, scrollContainerHeight, currentScrollPos;

        scrollBoxContainer = React.findDOMNode(this.refs.scrollBoxContainer);
        scrollBox = React.findDOMNode(this.refs.scrollBox);

        scrollContainerHeight = scrollBoxContainer.offsetHeight;
        //scrollBoxHeight = scrollBox.offsetHeight;

        currentScrollPos = scrollBoxContainer.scrollTop;

        scrollBoxContainer = currentScrollPos + NinetiesImage.scrollIncrement;
    };

    renderScrollbar = () => {
        var style, diffForButton;
        diffForButton = Math.round(this.state.scrollPos * 0.34);

        style = {
            top: `calc(${this.state.scrollPos}% - ${diffForButton}px)`
        };
        if (this.state.scrollable === true) {
            return (
                <div className="mac_os8_scroll_bar">
                    <div onClick={this.tabScroll.bind(this, 'up')}
                         className="mac_os8_scroll_tab mac_os8_sprites up" />
                    <div onClick={this.tabScroll.bind(this, 'down')}
                         className="mac_os8_scroll_tab mac_os8_sprites down" />
                    <div className="mac_os8_scroll_button mac_os8_sprites"
                        ref="macOs8ScrollButton" style={style}/>
                </div>
            );
        }
    };

    handleScroll = (event) => {
        var scrollBoxContainer, scrollBox, diffScroll, scrollPos;

        scrollBoxContainer = event.target;
        scrollBox = React.findDOMNode(this.refs.scrollBox);
        diffScroll = scrollBox.offsetHeight - scrollBoxContainer.offsetHeight;
        scrollPos = scrollBoxContainer.scrollTop;

        //window.console.log(scrollPos, scrollPos / diffScroll);

        this.setState({
            scrollPos: Math.round((scrollPos / diffScroll) * 1000) / 10
        });

    };

    handleClick = (increment) => {
        var {router} = this.context;

        if (increment === 'prev') {
            router.transitionTo(AppRoutes.NINETIES_IMG, {id: this.props.navRoutes.prevRoute});
        }
        if (increment === 'next') {
            router.transitionTo(AppRoutes.NINETIES_IMG, {id: this.props.navRoutes.nextRoute});
        }
    };

    render() {
        if (this.props.data === undefined) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        else {
            return (
                <div className="nineties_img_item clear_floats">

                    <div className="nineties_img_item_scroll_container"
                         id="nineties_img_item_scroll_container"
                         onScroll={this.handleScroll.bind(this)}
                         ref="scrollBoxContainer">

                        <img src={this.props.data.url} width={225} height={400}/>

                        <section className="nineties_img_item_scroll"
                                 id="nineties_img_item_scroll"
                            ref="scrollBox">

                            <h1>{this.props.data.title}</h1>

                            <span className="nineties_img_item_description"
                                dangerouslySetInnerHTML={{__html: this.props.data.description}}/>

                            <div className="mac_os8_button">
                                <Link to={AppRoutes.NINETIES_IMG_INDEX}>View
                                    More...</Link>
                            </div>
                        </section>
                    </div>

                    {this.renderScrollbar()}

                    <div className="nineties_img_navigator">
                        <a className="nineties_img_nav_button mac_os8_sprites previous"
                           onClick={this.handleClick.bind(this, 'prev')}/>

                        <div className="nineties_img_nav_button counter">
                            <span>{this.props.data.pk}</span>
                            <span>/</span>
                            <span>{this.props.dataCount}</span>
                        </div>
                        <a className="nineties_img_nav_button mac_os8_sprites next"
                           onClick={this.handleClick.bind(this, 'next')}/>
                    </div>
                </div>
            );
        }
    }
}

