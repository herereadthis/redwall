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
            'scrollable': false
        };
    }

    static contextTypes = {
        router: React.PropTypes.func
    };

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

    renderScrollbar = () => {
        if (this.state.scrollable === true) {
            return (
                <div className="mac_os8_scroll_bar">
                    <div className="mac_os8_scroll_tab mac_os8_sprites up" />
                    <div className="mac_os8_scroll_tab mac_os8_sprites down" />
                    <div className="mac_os8_scroll_button mac_os8_sprites" />
                </div>
            );
        }
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
                         ref="scrollBoxContainer">

                        <img src={this.props.data.url} width={225} height={400}/>

                        <section className="nineties_img_item_scroll"
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

