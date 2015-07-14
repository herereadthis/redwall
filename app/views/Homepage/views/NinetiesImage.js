import React from 'react';

export default class NinetiesImage extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        window.console.log(this.props);
        var style = {
            float: 'left'
        };
        return (
            <div>
                <img src={this.props.data.url} height={400} style={style} />
                <h1>{this.props.data.title}</h1>
                <div className="nineties_description" dangerouslySetInnerHTML={{__html: this.props.data.description}} />
            </div>
        );
    }
}

