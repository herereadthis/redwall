import React from 'react';
import HomeActions from 'views/Homepage/HomeActions.js';

export default class NinetiesImageIndex extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.props.flux.getActions(HomeActions.ID).set90slist();
    }

    componentDidMount() {
    }

    //shouldComponentUpdate(nextProps) {
    //    var toUpdate = false
    //    //return nextProps.listing !== this.props.listing;
    //
    //    if (nextProps.listing !== this.props.listing ||
    //        nextProps.listing !== this.props.listing ||
    //        nextProps.listing !== this.props.listing) {
    //        window.console.log('asdf');
    //    }
    //}

    render() {
        window.console.log(this.props.listing);

        return (
            <div>
                <p>Hello Nineties Image, Here be the Index</p>
            </div>
        );
    }
}

