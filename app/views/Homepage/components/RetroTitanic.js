import React from 'react';
import AppConstants from 'AppConstants';

export default class RetroTitantic extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        var titanticStyle;

        titanticStyle = {
            paddingTop: '2rem',
            paddingBottom: '1rem'
        };

        return (
            <article id="retro_art"
                     className="starfield parallax_scroll"
                     data-parallax-speed="250"
                     ref="starfield"
                     style={titanticStyle}>
                <h2>Here are some awesome thing!</h2>
                <section className="bellmaker_container geocities_me">
                    <h3>1997 was the best year ever!</h3>

                    <div className="centered_image">
                        {AppConstants.dataSprite('titanic_468x60')}
                    </div>
                </section>
            </article>
        );
    }
}

