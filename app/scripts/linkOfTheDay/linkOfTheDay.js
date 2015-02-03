'use strict';

/**
 * @ngdoc function
 * @name redwallApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the redwallApp
 */
angular.module('redwallApp')
    .controller('LinkOfTheDayController', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    })
    .directive('linkOfTheDay', function() {
        return {
            restrict: 'E',
            link: function() {
            },
            controller: [
                '$scope',
                function ($scope) {
                    window.console.log('asdf');

                    $scope.linkData = [
                        {
                            date: '2015-02-03',
                            title: 'asdf',
                            url: 'asdf',
                            image: '',
                            summary: 'asdf',
                            source: 'asdf',
                            author: 'asdf'
                        },
                        {
                            date: '2015-02-02',
                            title: 'asdf',
                            url: 'asdf',
                            image: '',
                            summary: 'asdf',
                            source: 'asdf',
                            author: 'asdf'
                        },
                        {
                            date: '2015-02-01',
                            title: 'Katy Perry’s Sharks Were The Best Part Of The Super Bowl',
                            url: 'http://www.buzzfeed.com/kristinchirico/katy-perrys-sharks-were-the-best-part-of-the-super-bowl-half#.eb2xnMNMR',
                            image: '',
                            summary: '<p>Katy Perry just won Burning Man. She arrived onto the field riding a giant golden tiger art car. There were lots of cool lighting effects and choreography, and then....</p><p>She performed a song set in a trippy acid landscape with talking trees and beach balls, and of course, dancing sharks. You want a dancing shark costume, I want a dancing shark costume.</p>',
                            source: 'BuzzFeed',
                            author: 'Kristin Chirico'
                        },
                        {
                            date: '2015-01-31',
                            title: 'Weather map goes crazy live on the air',
                            url: 'https://www.youtube.com/watch?v=iXuc7SAyk2s',
                            image: '',
                            summary: '<p>Local Phoenix weatherman Cory McCloskey has to deal with a messed up weather map on live TV, and handles himself so well. I don&rsquo;t want to quote what he says, because it will spoil the hilarity.</p><p>Also, the man is rocking a pretty nice suit.</p>',
                            source: 'YouTube',
                            author: 'FOX 10 Phoenix'
                        },
                        {
                            date: '2015-01-30',
                            title: 'Why does food taste different on planes?',
                            url: 'http://www.bbc.com/future/story/20150112-why-in-flight-food-tastes-weird',
                            image: '',
                            summary: '',
                            source: 'BBC',
                            author: 'Katia Moskvitch'
                        },
                        {
                            date: '2015-01-29',
                            title: 'The Cruelty and Controversy of Beijing&rsquo;s Black Market for Dogs',
                            url: 'http://www.vice.com/read/how-not-to-buy-a-dog-in-beijing',
                            image: '',
                            summary: '',
                            source: 'Vice',
                            author: 'Nona Tepper'
                        },
                        {
                            date: '2015-01-28',
                            title: 'Why Vending Machines Are So Popular in Japan',
                            url: 'http://kotaku.com/why-vending-machines-are-so-popular-in-japan-1682336996',
                            image: '',
                            summary: '',
                            source: 'Kotaku',
                            author: 'Brian Ashcraft'
                        },
                        {
                            date: '2015-01-27',
                            title: 'Not a Very P.C. Thing to Say',
                            url: 'http://nymag.com/daily/intelligencer/2015/01/not-a-very-pc-thing-to-say.html?mid=nymag_press',
                            image: '',
                            summary: '',
                            source: 'New York Magazine',
                            author: 'Johnathan Chait'

                        },
                        {
                            date: '2015-01-26',
                            title: 'Photos: Everyone In NYC Is Currently On Line At The Grocery Store',
                            url: 'http://gothamist.com/2015/01/26/snowpocalypse_supermarket.php',
                            image: '',
                            summary: '',
                            source: 'Gothamist'
                        },
                        {
                            date: '2015-01-25',
                            title: 'The Terrible Sea Lion',
                            url: 'http://wondermark.com/1k62/',
                            image: '',
                            summary: '',
                            source: 'Wondermark',
                            author: 'David Malki'
                        },
                        {
                            date: '2015-01-24',
                            title: 'A pre-Reasonable Doubt mixtape by Jay Z has surfaced',
                            url: 'http://www.thefourohfive.com/news/article/a-pre-reasonable-doubt-mixtape-by-jay-z-has-surfaced-142',
                            image: '',
                            summary: '',
                            source: 'The 405'
                        },
                        {
                            date: '2015-01-23',
                            title: 'Air catalog SkyMall seeks bankruptcy protection',
                            url: 'http://www.usatoday.com/story/todayinthesky/2015/01/23/airline-catalog-skymall-files-for-bankruptcy/22213809/',
                            image: '',
                            summary: '',
                            source: 'USA Today',
                            author: [
                                'Ben Mutzabaugh',
                                'Kevin McCoy'
                            ]
                        },
                        {
                            date: '2015-01-22',
                            title: 'King Tut&#39;s beard &#39;hastily glued back on with epoxy&#39;',
                            url: 'http://www.telegraph.co.uk/news/worldnews/africaandindianocean/egypt/11361822/King-Tuts-beard-hastily-glued-back-on-with-epoxy.html',
                            image: '',
                            summary: '<p>So basically, someone tried to superglue it back together, fucked up, then got glue on its face, tried to scratch it off with a spatula, and got the face all dented and marred.</p><p>I would have loved to be in that room.... &ldquo;Dammit, stop making it worse!&rdquo;</p>',
                            source: 'BBC'
                        },
                        {
                            date: '2015-01-21',
                            title: 'Rebecca L&eacute;veill&eacute;-Guay: Paintings',
                            url: 'http://www.rleveille.com/paintings.html',
                            image: '',
                            summary: '',
                            source: 'Rebecca L&eacute;veill&eacute;-Guay'
                        },
                        {
                            date: '2015-01-20',
                            title: 'Android Netrunner – The Game Designer’s Game',
                            url: 'http://gamedesignreviews.com/scrapbook/android-netrunner-the-game-designers-game/',
                            image: '',
                            summary: '',
                            source: 'Game Design Reviews'
                        },
                        {
                            date: '2015-01-19',
                            title: 'Why Magic: The Gathering struggles to stay relevant to casual players',
                            url: 'http://www.avclub.com/article/why-magic-the-gathering-struggles-to-stay-relevant-106217',
                            image: '',
                            summary: '',
                            source: 'A.V. Club'
                        },
                        {
                            date: '2015-01-18',
                            title: 'Where are Israeli Women?',
                            url: 'http://www.newyorker.com/news/news-desk/jerusalem-haredim-women-equality',
                            image: '',
                            summary: '',
                            source: 'New Yorker'
                        },
                        {
                            date: '2015-01-17',
                            title: 'HOW LEGO BECAME THE APPLE OF TOYS',
                            url: 'http://www.fastcompany.com/3040223/when-it-clicks-it-clicks',
                            image: '',
                            summary: '',
                            source: 'Fast Company'
                        },
                        {
                            date: '2015-01-16',
                            title: 'Fibonacci Zoetrope Sculptures',
                            url: 'https://vimeo.com/116582567',
                            image: '',
                            summary: '',
                            source: 'Vimeo'
                        },
                        {
                            date: '2015-01-11',
                            title: 'No. 37: Big Wedding or Small?: Quiz: The 36 Questions That Lead to Love',
                            url: 'http://www.nytimes.com/2015/01/11/fashion/no-37-big-wedding-or-small.html',
                            image: '',
                            summary: '',
                            source: 'New York Times'
                        },
                        {
                            date: '2015-01-08',
                            title: 'BMW E28 5-Series&#39; Are the Ideal Family Cars',
                            url: 'https://www.youtube.com/watch?v=8HzsJG0Sb_s',
                            image: '',
                            summary: '',
                            source: 'YouTube'
                        },
                        {
                            date: '20141220',
                            title: 'Houshi',
                            url: 'https://vimeo.com/114879061',
                            image: '',
                            summary: ''
                        },
                        {
                            date: '2014-12-19',
                            title: 'Bodh Gaya',
                            url: 'http://en.wikipedia.org/wiki/Bodh_Gaya',
                            image: '',
                            summary: '',
                            source:'BBC'
                        },
                        {
                            date: '2014-12-18',
                            title: 'Yiwu: The Chinese city where Christmas is made and sold',
                            url: 'http://www.bbc.com/future/story/20141218-the-hidden-home-of-christmas',
                            image: '',
                            summary: '',
                            source: 'BBC'
                        },
                        {
                            date: '2014-12-17',
                            title: 'Zettai Ryouiki (絶対領域)',
                            url: 'http://en.wikipedia.org/wiki/Zettai_ryoiki',
                            image: '',
                            summary: 'Zettai Ryouiki (絶対領域) literally translates to “absolute territory”.',
                            source: 'Wikipedia'
                        },
                        {
                            date: '2014-12-16',
                            title: 'Lost in Translation: The world&rsquo;s most unique words?',
                            url: 'http://www.bbc.com/culture/story/20141216-ten-untranslatable-words',
                            image: '',
                            summary: '',
                            source: 'BBC'
                        },
                        {
                            date: '2014-12-15',
                            title: 'From Lycos to Ask Jeeves to Facebook: Tracking the 20 most popular web sites every year since 1996',
                            url: 'http://www.washingtonpost.com/news/the-intersect/wp/2014/12/15/from-lycos-to-ask-jeeves-to-facebook-tracking-the-20-most-popular-web-sites-every-year-since-1996/?tid=trending_strip_5',
                            image: '',
                            summary: '',
                            source: 'Washington Post'
                        },
                        {
                            date: '2014-12-14',
                            title: 'Instant noodle attack and other weirdness forces Air Asia flight back to Bangkok',
                            url: 'http://bangkok.coconuts.co/2014/12/12/instant-noodle-attack-and-other-weirdness-forces-air-asia-flight-back-bangkok',
                            image: '',
                            summary: '',
                            source: 'Coconuts Bangkok'
                        },
                        {
                            date: '2014-12-13',
                            title: 'Inside the collapse of the New Republic',
                            url: 'http://www.newyorker.com/news/news-desk/inside-collapse-new-republic',
                            image: '',
                            summary: '',
                            source: 'New Yorker'
                        },
                        {
                            date: '2014-12-12',
                            title: 'Korean Air &lsquo;nut rage&rsquo; executive Heather Cho resigns',
                            url: 'http://www.bbc.com/news/world-asia-30390724',
                            image: '',
                            summary: '<p>So facinating that a major executive of a company (and the daughter of the owner, no less) would resign over something. Yes, she deserves to be removed from her position, but it&rsquos so refreshing to see a powerful person actually have to face consequences.</p>',
                            source: 'BBC'
                        },
                        {
                            date: '2014-12-11',
                            title: 'Peru to take legal action over Greenpeace stunt at ancient Nazca lines',
                            url: 'http://www.theguardian.com/world/2014/dec/10/peru-legal-action-greenpeace-stunt-nazca-lines',
                            image: '',
                            summary: '',
                            source: 'Guardian'
                        },
                        {
                            date: '2014-12-10',
                            title: 'The Moors Murders',
                            url: 'http://en.wikipedia.org/wiki/Moors_murders',
                            image: '',
                            summary: '',
                            source: 'Wikipedia'
                        },
                        {
                            date: '2014-12-09',
                            title: '10 Spanish Words That Have No English Translation',
                            url: 'http://www.huffingtonpost.com/2014/05/27/spanish-words-no-translation_n_5399000.html',
                            image: '',
                            summary: '',
                            source: 'Huffington Post'
                        },
                        {
                            date: '2014-12-08',
                            title: 'Juliane Koepcke',
                            url: 'http://en.wikipedia.org/wiki/Juliane_Koepcke',
                            image: '',
                            summary: '',
                            source: 'Wikipedia'
                        },
                        {
                            date: '2014-12-07',
                            title: 'In Defense Of Spielberg’s WAR OF THE WORLDS',
                            url: 'http://badassdigest.com/2013/02/19/in-defense-of-spielbergs-war-of-the-worlds/',
                            image: '',
                            summary: '',
                            source: 'Baddass Digest'
                        },
                        {
                            date: '2014-12-06',
                            title: 'Having Gone Largely Unnoticed In The ‘Game Of Thrones’ Series, It’s Now Impossible To Take Your Eyes Off It',
                            url: 'http://smatterist.com/749/gone-largely-unnoticed-game-thrones-series-now-impossible-take-eyes/',
                            image: '',
                            summary: '',
                            source: 'Smatterist'
                        },
                        {
                            date: '2014-12-05',
                            title: 'Languages: Why we must save dying tongues',
                            url: 'http://www.bbc.com/future/story/20140606-why-we-must-save-dying-languages',
                            image: '',
                            summary: '',
                            source: 'BBC'
                        },
                        {
                            date: '2014-12-04',
                            title: 'Cheating the Beautiful Game',
                            url: 'http://www.newyorker.com/the-sporting-scene/cheating-the-beautiful-game',
                            image: '',
                            summary: '',
                            source: 'New Yorker'
                        },
                        {
                            date: '2014-12-03',
                            title: 'Cheating the Beautiful Game',
                            url: 'http://www.newyorker.com/the-sporting-scene/cheating-the-beautiful-game',
                            image: '',
                            summary: '',
                            source: 'New Yorker'
                        },
                        {
                            date: '2014-12-02',
                            title: 'Darkness',
                            url: 'http://english.bouletcorp.com/2012/02/01/darkness/',
                            image: '',
                            summary: '',
                            source: 'Bouletcorp'
                        },
                        {
                            date: '2014-12-01',
                            title: 'Hallucinogenic nights',
                            url: 'http://aeon.co/magazine/psychology/the-terror-and-the-bliss-of-sleep-paralysis/',
                            image: '',
                            summary: '',
                            source: 'Aeon Magazine'
                        },
                        {
                            date: '2014-11-30',
                            title: 'The End of Apps As We Know Them',
                            url: 'http://blog.intercom.io/the-end-of-apps-as-we-know-them/',
                            image: '',
                            summary: '',
                            source: 'Inside Intercom'
                        },
                        {
                            date: '2014-11-15',
                            title: 'Why Netrunner Matters',
                            url: 'http://killscreendaily.com/articles/why-netrunner-matters/',
                            image: '',
                            summary: '',
                            source: 'Kill Screen'
                        }
                    ];
                }
            ],
            templateUrl: '/scripts/linkOfTheDay/link-of-the-day.html'
        };
    });
