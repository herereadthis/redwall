import React from 'react';
import HomeActions from 'views/Homepage/HomeActions.js';
import AppRoutes from 'AppRoutes.js';

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
    }

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
            <ul className="clear_floats">
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
