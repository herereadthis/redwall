'use strict';

import React from 'react';

export default class RetroRules extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {

        var retroRulesStyle = {
            backgroundColor: '#000',
            paddingTop: '2rem'
        };
        var goAway = {
            display: 'none'
        };

        return (
            <article id="retro_rules" style={retroRulesStyle}>
                <h2 style={goAway}>Here's some good advice I never follow.</h2>
                <section className="bellmaker_container geocities_me">
                    <h3>Here are 5 rules for life:</h3>
                    <ul>
                        <li>The secret to communication is remembering that what
                            the other person knows is different than what I
                            know.
                        </li>
                        <li>It’s okay to have issues; everyone has issues.</li>
                        <li>Acceptance does not require understanding.</li>
                        <li>If I see a problem, and the solution for the problem
                            is for other people to change, then I am the
                            problem.
                        </li>
                        <li>I am the company I keep.</li>
                    </ul>

                    <hr className="rainbow_gradient"/>

                    {/*
                    <h3>Here are 3 rules for Burning Man virgins:</h3>

                    <ul>
                        <li>At some point, all your friends are going to ditch
                            you. It&rsquo;s okay.
                        </li>
                        <li>You are going to meet people who look at the world
                            in an entirely different way than you do, and you
                            may never understand them. It&rsquo;s okay.
                        </li>
                        <li>You have to be able to make your own fun. It
                            won&rsquo;t happen for you, and it&rsquo;s okay.
                        </li>
                    </ul>

                    <hr class="rainbow_gradient"/>

                    <div class="centered_image with_border">
                        <img src="/build/images/homepage/irene_430x464.png"
                             width="215" height="232"/>
                    </div>
                    */}
                </section>
            </article>
        );
    }
}

