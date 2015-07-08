import React from 'react';

export default class RetroFooter extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        var style1, location;

        style1 = {
            color: '#FFF'
        };
        location = 'http://herereadthis.com/';

        return (
            <footer role="contentinfo"
                    className="starfield parallax_scroll"
                    data-parallax-speed="-50">
                <div id="frames_foo">
                    <div className="frames_address_bar retro_spriter">
                        <span className="retro_spriter">{location}</span>
                    </div>
                    <div className="frames_nav_column frames_column">
                        <section>
                            <p style={style1}>No duh!</p>
                        </section>
                    </div>
                    <div className="frames_main_column frames_column">
                        <section>
                            <h2>Kim's Fable</h2>

                            <p>Once upon a time, there was a little frog. His
                                name was Albert. Albert was a young frog and he
                                still lived at his mother and father's pad. They
                                were decent people, though their rules could be
                                strict. They drove him crazy sometimes, but
                                whose parents are ever normal?</p>

                            <p>So, one day, Albert went to a rave located in the
                                cattails. A skunk was throwing it, and nobody
                                should trust a skunk. But peter was a decent
                                fellow and Albert had lent him five bucks, so it
                                would be cool. Also, it was Wednesday and you'd
                                be surprised how boring Wednesdays could be in
                                the lake. Bingo night is no place for a young
                                frog to be.</p>

                            <p>Since he wasn't very popular, (green really
                                wasn't his color) he spent majority of his time
                                grooving in the loser wall. He didn't take the
                                mushroom that most of the other animals were
                                taking. He knew what they could do to your life
                                and your brain.</p>

                            <p>A water bug (who was being particularly
                                belligerent and malicious too) noticed Albert
                                and commenced to pick on him. All the other
                                animals joined in the laugher (including peter,
                                that inconsiderate bitch). Albert, who was
                                normally very stolid in such situations, started
                                to cry and swam away. He was on his way home, he
                                was thinking about how he had lied to his
                                parents to come here. And he had only been
                                humiliated. It was a waste of a perfectly decent
                                lie too. How many times can you tell your
                                parents you got a goldfish-walking job that your
                                not going to charge for, because the people are
                                elderly and you felt bad?</p>

                            <p>He may have lied and cheated his way here, but he
                                was proud to say he didn't have to lie about not
                                doing any substances or giving into peer
                                pressure. He didn't mate, he didn't do drugs,
                                and he didn't-Suddenly, an unseen motorboat
                                passed and ripped Albert to ribbons. His
                                thoughts and worries disappeared as quickly as
                                his mass sank to the bottom of the lake.</p>

                            <p>Moral of the story: never swim during duck
                                season</p>
                        </section>
                        <section>
                            <ul className="social_fu" resource="#/me/" typeof="foaf:Person" data-module="social_fu">
                                <li property="foaf:account" resource="#/me/facebook/" typeof="foaf:OnlineAccount">
                                    <span property="foaf:accountServiceHomepage" resource="https://www.facebook.com/"><span>Facebook</span></span>
                                    <a rel="foaf:homepage" href="https://www.facebook.com/herereadthis"
                                       property="foaf:accountName" title="herereadthis">herereadthis</a>
                                </li>
                                <li property="foaf:account" resource="#/me/twitter/" typeof="foaf:OnlineAccount">
                                    <span property="foaf:accountServiceHomepage" resource="https://twitter.com/"><span>Twitter</span></span>
                                    <a rel="foaf:homepage" href="http://twitter.com/herereadthis"
                                       property="foaf:accountName">herereadthis</a>
                                </li>
                                <li property="foaf:account" resource="#/me/github/" typeof="foaf:OnlineAccount">
                                    <span property="foaf:accountServiceHomepage" resource="https://github.com/"><span>GitHub</span></span>
                                    <a rel="foaf:homepage" href="https://github.com/herereadthis/redwall"
                                       property="foaf:accountName">herereadthis</a>
                                </li>
                                <li property="foaf:account" resource="#/me/pinterest/" typeof="foaf:OnlineAccount">
                                    <span property="foaf:accountServiceHomepage" resource="http://pinterest.com/"><span>Pinterest</span></span>
                                    <a rel="foaf:homepage" href="http://pinterest.com/herereadthis/"
                                       property="foaf:accountName">herereadthis</a>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div
                        className="frames_scrollbar frames_arrows retro_spriter"
                        role="presentation"><span></span></div>
                    <div
                        className="frames_scrollbar frames_arrows retro_spriter"
                        role="presentation"><span></span></div>
                    <div
                        className="frames_horizontal_scroll frames_arrows retro_spriter"
                        role="presentation"><span></span></div>
                </div>
                <div className="frames_start_bar" role="presentation"></div>
                {/*<li property="foaf:account" resource="#/me/flickr/" typeof="foaf:OnlineAccount" style="display: none;">
                 <span property="foaf:accountServiceHomepage" resource="http://www.flickr.com/">Flickr</span>
                 <a rel="foaf:homepage" href="http://www.flickr.com/photos/applesanity/"
                 property="foaf:accountName">applesanity</a>
                 </li>*/}
            </footer>
        );
    }
}

