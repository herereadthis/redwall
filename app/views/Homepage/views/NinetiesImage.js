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
    static scrollInterval = 10;
    static scrollStep = 8;

    componentWillMount() {
    }

    componentDidMount() {
        var _this, scrollBoxContainer, scrollBox;
        //var _this;

        _this = this;
        scrollBoxContainer = React.findDOMNode(this.refs.scrollBoxContainer);
        scrollBox = React.findDOMNode(this.refs.scrollBox);

        this.props.flux.getActions(HomeActions.ID).set90sNavRoutes(
            this.props.dataCount, this.props.data.pk);

        NinetiesImageMethods.fixArrowKeyStrokes(this.handleClick);
        NinetiesImageMethods.fixScrollContainerHeight(scrollBoxContainer);
        NinetiesImageMethods.fixScrollBoxHeight(scrollBox);

        NinetiesImageMethods.mouseUpDetection();
        this.makeThatScrollbar();
    }

    componentWillUnmount() {
        NinetiesImageMethods.killResizeListener();
        NinetiesImageMethods.killMouseUpDetection();
        NinetiesImageMethods.killArrowKeyStrokes();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.pk !== this.props.data.pk) {
            this.props.flux.getActions(HomeActions.ID).set90sNavRoutes(this.props.dataCount, nextProps.data.pk);

            var scrollBox;
            scrollBox = React.findDOMNode(this.refs.scrollBox);
            NinetiesImageMethods.fixScrollBoxHeight(scrollBox);
        }

        this.makeThatScrollbar();
    }

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
        var scrollBoxContainer, scrollBox,
            scrollBoxHeight, currentScrollPos, scrollIncrement,
            scrollInterval, targetScrollPos, jumpStep;

        scrollIncrement = NinetiesImage.scrollIncrement;
        jumpStep = NinetiesImage.scrollStep;
        scrollBoxContainer = React.findDOMNode(this.refs.scrollBoxContainer);
        scrollBox = React.findDOMNode(this.refs.scrollBox);
        scrollBoxHeight = scrollBox.offsetHeight;

        if (direction === 'up') {
            scrollIncrement = -1 * scrollIncrement;
            jumpStep = -1 * jumpStep;
        }

        if (direction === 'up') {
            targetScrollPos = scrollBoxContainer.scrollTop + scrollIncrement;
            currentScrollPos = scrollBoxContainer.scrollTop;

            scrollInterval = setInterval(() => {
                currentScrollPos = scrollBoxContainer.scrollTop;

                if (currentScrollPos >= targetScrollPos && currentScrollPos > 0) {
                    scrollBoxContainer.scrollTop = currentScrollPos + jumpStep;
                }
                else {
                    clearInterval(scrollInterval);
                }
            }, NinetiesImage.scrollInterval);
        }
        else {
            targetScrollPos = scrollBoxContainer.scrollTop + scrollIncrement;
            currentScrollPos = scrollBoxContainer.scrollTop;

            scrollInterval = setInterval(() => {
                currentScrollPos = scrollBoxContainer.scrollTop;

                if (scrollBoxHeight - currentScrollPos >= currentScrollPos &&
                    currentScrollPos < targetScrollPos) {
                    scrollBoxContainer.scrollTop = currentScrollPos + jumpStep;
                }
                else {
                    clearInterval(scrollInterval);
                }
            }, NinetiesImage.scrollInterval);
        }

    };

    startDragScrollButton = (event) => {

        var _eventTarget, _elementRect, buttonParams, yPosClick;


        _eventTarget = event.target;

        _elementRect = _eventTarget.getBoundingClientRect();

        buttonParams = {
            height: Math.round(_elementRect.height),
            top: Math.round(_elementRect.top)
        };

        yPosClick = event.clientY - buttonParams.top;




        window.console.log(yPosClick);


        NinetiesImageMethods.scrollDrag(event.clientY, buttonParams.top, event.target);

        //
        //_eventTarget.onmousemove = (dragEvent) => {
        //    var positionY = dragEvent.clientY;
        //
        //    window.console.log(positionY, _elementTop);
        //};
    };

    stopDragScrollButton = (event) => {
        event.target.onmousemove = () => {};
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
                         onMouseDown={this.startDragScrollButton.bind(this)}
                         ref="macScrollButton" style={style}/>
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

