import React from 'react';
import HomeActions from 'views/Homepage/HomeActions.js';
import AppRoutes from 'AppRoutes.js';

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
        this.props.flux.getActions(HomeActions.ID).set90sNavRoutes(this.props.dataCount, this.props.data.pk);
    }

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
        var style = {
            float: 'left'
        };
        if (this.props.data === undefined) {
            return (
                <div>
                    <p>Loading...</p>
                    </div>
            );
        }
        else {
            return (
                <div>
                    <div className="nineties_img_navigator">
                        <a className="nineties_img_nav_button mac_os8_sprites previous"
                            onClick={this.handleClick.bind(this, 'prev')} />
                        <div className="nineties_img_nav_button counter">
                            <span>{this.props.data.pk}</span>
                            <span>/</span>
                            <span>{this.props.dataCount}</span>
                        </div>
                        <a className="nineties_img_nav_button mac_os8_sprites next"
                             onClick={this.handleClick.bind(this, 'next')} />
                    </div>

                    <img src={this.props.data.url} height={400} style={style}/>

                    <h1>{this.props.data.title}</h1>

                    <div className="nineties_description"
                         dangerouslySetInnerHTML={{__html: this.props.data.description}}/>
                </div>
            );
        }
    }
}

