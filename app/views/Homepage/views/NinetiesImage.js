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
                        <div className="nineties_img_nav_button mac_os8_sprites previous" />
                        <div className="nineties_img_nav_button mac_os8_sprites next" />
                        <div className="nineties_img_nav_button mac_os8_sprites counter" />
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

