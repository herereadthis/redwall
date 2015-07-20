import React from 'react';
import HomeActions from 'views/Homepage/HomeActions.js';
import AppRoutes from 'AppRoutes.js';
import {Link} from 'react-router';

export default class NinetiesImage extends React.Component {

    constructor() {
        super();
    }

    static contextTypes = {
        router: React.PropTypes.func
    };

    componentWillMount() {
    }

    componentDidMount() {
        var _this;

        _this = this;

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

        window.addEventListener('resize', function () {
            _this.killResizeListener();
            _this.setScrollContainerHeight();
        }, true);



    }

    componentWillUnmount() {
        this.killResizeListener();
    }


    killResizeListener = () => {
        window.removeEventListener('resize', this.setScrollContainerHeight(),
            true);
    };

    setScrollContainerHeight = () => {
        var scrollBoxContainer, scrollBoxParentHeight;
        scrollBoxContainer = React.findDOMNode(this.refs.scrollBoxContainer);
        scrollBoxParentHeight = scrollBoxContainer.parentNode.parentNode.offsetHeight;

        scrollBoxContainer.style.height = `${scrollBoxParentHeight - 45}px`;

        window.console.log(scrollBoxParentHeight);

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.pk !== this.props.data.pk) {
            this.props.flux.getActions(HomeActions.ID).set90sNavRoutes(this.props.dataCount, nextProps.data.pk);
        }
    }

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

                    <img src={this.props.data.url} width={225} height={400}/>

                    <div className="nineties_img_item_scroll_container"
                         ref="scrollBoxContainer">

                        <section className="nineties_img_item_scroll">

                            <h1>{this.props.data.title}</h1>

                            <span className="nineties_img_item_description"
                                dangerouslySetInnerHTML={{__html: this.props.data.description}}/>

                            <div className="mac_os8_button">
                                <Link to={AppRoutes.NINETIES_IMG_INDEX}>View
                                    More...</Link>
                            </div>
                        </section>
                    </div>


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

