import React from 'react';

export var HigherOrder = ComposedComponent => class extends React.Component {

    constructor() {
        super();
        this.state = {
            scrollTop: 0
        }
    }

    componentDidMount() {
        let _this = this;
        window.addEventListener('scroll', function (event) {
            window.console.log(_this.state.scrollTop);
            _this.setState({
                scrollTop: document.body.scrollTop
            })
        }, true);
    }

    render() {
        return <ComposedComponent {...this.props}   />;
    }
};
