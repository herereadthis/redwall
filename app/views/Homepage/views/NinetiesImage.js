import React from 'react';
import HomeActions from 'views/Homepage/HomeActions.js';

export default class NinetiesImage extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    handleClick = (increment) => {
        var newIndex = increment + parseInt(this.props.data.pk, 10);
        if (newIndex === 0) {
            newIndex = this.props.dataCount;
        }
        else if (newIndex > this.props.dataCount) {
            newIndex = 1;
        }
        window.console.log(newIndex);
        this.props.flux.getActions(HomeActions.ID).setNew90sIndex(this.props.dataCount, newIndex, true);
    };

    componentWillReceiveProps(nextProps) {
        window.console.log(nextProps.data);
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
                            onClick={this.handleClick.bind(this, -1)} />
                        <div className="nineties_img_nav_button counter">
                            <span>{this.props.data.pk}</span>
                            <span>/</span>
                            <span>{this.props.dataCount}</span>
                        </div>
                        <a className="nineties_img_nav_button mac_os8_sprites next"
                             onClick={this.handleClick.bind(this, 1)} />
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

