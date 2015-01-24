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
        $scope.linkData = [
            {
                date: '2015-01-22',
                title: 'King Tut&39;s beard &39;hastily glued back on with epoxy&39;',
                url: 'http://www.telegraph.co.uk/news/worldnews/africaandindianocean/egypt/11361822/King-Tuts-beard-hastily-glued-back-on-with-epoxy.html',
                image: '',
                summary: '<p>So basically, someone tried to superglue it back together, fucked up, then got glue on its face, tried to scratch it off with a spatula, and got the face all dented and marred.</p><p>I would have loved to be in that room.... &ldquo;Dammit, stop making it worse!&rdquo;</p>'
            },
            {
                date: '2015-01-21',
                title: 'Rebecca Léveillé-Guay',
                url: 'http://www.rleveille.com',
                image: '',
                summary: ''
            },
            {
                date: '2015-01-20',
                title: 'Android Netrunner – The Game Designer’s Game',
                url: 'http://gamedesignreviews.com/scrapbook/android-netrunner-the-game-designers-game/',
                image: '',
                summary: ''
            },
            {
                date: '2015-01-19',
                title: 'Why Magic: The Gathering struggles to stay relevant to casual players',
                url: 'http://www.avclub.com/article/why-magic-the-gathering-struggles-to-stay-relevant-106217',
                image: '',
                summary: ''
            },
            {
                date: '2015-01-18',
                title: 'Where are Israeli Women?',
                url: 'http://www.newyorker.com/news/news-desk/jerusalem-haredim-women-equality',
                image: '',
                summary: ''
            },
            {
                date: '2015-01-17',
                title: 'HOW LEGO BECAME THE APPLE OF TOYS',
                url: 'http://www.fastcompany.com/3040223/when-it-clicks-it-clicks',
                image: '',
                summary: ''
            },
            {
                date: '2015-01-16',
                title: 'Fibonacci Zoetrope Sculptures',
                url: 'https://vimeo.com/116582567',
                image: '',
                summary: ''
            },
            {
                date: '2015-01-11',
                title: 'No. 37: Big Wedding or Small?: Quiz: The 36 Questions That Lead to Love',
                url: 'http://www.nytimes.com/2015/01/11/fashion/no-37-big-wedding-or-small.html',
                image: '',
                summary: ''
            },
            {
                date: '2015-01-08',
                title: 'BMW E28 5-Series&squo; Are the Ideal Family Cars',
                url: 'https://www.youtube.com/watch?v=8HzsJG0Sb_s',
                image: '',
                summary: ''
            },
            {
                date: '2014-12-19',
                title: 'Bodh Gaya',
                url: 'http://en.wikipedia.org/wiki/Bodh_Gaya',
                image: '',
                summary: ''
            },
            {
                date: '2014-12-18',
                title: 'Yiwu: The Chinese city where Christmas is made and sold',
                url: 'http://www.bbc.com/future/story/20141218-the-hidden-home-of-christmas',
                image: '',
                summary: ''
            },
            {
                date: '2014-12-17',
                title: 'Zettai Ryouiki (絶対領域)',
                url: '',
                image: '',
                summary: 'Zettai Ryouiki (絶対領域) literally translates to “absolute territory”.'
            },
            {
                date: '2014-12-16',
                title: 'Lost in Translation: The world&rsquo;s most unique words?',
                url: 'http://www.bbc.com/culture/story/20141216-ten-untranslatable-words',
                image: '',
                summary: ''
            },
            {
                date: '2014-12-15',
                title: 'From Lycos to Ask Jeeves to Facebook: Tracking the 20 most popular web sites every year since 1996',
                url: 'http://www.washingtonpost.com/news/the-intersect/wp/2014/12/15/from-lycos-to-ask-jeeves-to-facebook-tracking-the-20-most-popular-web-sites-every-year-since-1996/?tid=trending_strip_5',
                image: '',
                summary: ''
            },
            {
                date: '2014-12-14',
                title: 'Instant noodle attack and other weirdness forces Air Asia flight back to Bangkok',
                url: 'http://bangkok.coconuts.co/2014/12/12/instant-noodle-attack-and-other-weirdness-forces-air-asia-flight-back-bangkok',
                image: '',
                summary: ''
            },
            {
                date: '2014-12-13',
                title: 'Inside the collapse of the New Republic',
                url: 'http://www.newyorker.com/news/news-desk/inside-collapse-new-republic',
                image: '',
                summary: ''
            },
            {
                date: '2014-12-12',
                title: 'Heather Cho resigns',
                url: 'asdf',
                image: '',
                summary: '<p>So facinating that a major executive of a company (and the daughter of the owner, no less) would resign over something. Yes, she deserves to be removed from her position, but it&rsquos so refreshing to see a powerful person actually have to face consequences.</p>'
            },
            {
                date: '2014-12-11',
                title: 'Peru to take legal action over Greenpeace stunt at ancient Nazca lines',
                url: 'http://www.theguardian.com/world/2014/dec/10/peru-legal-action-greenpeace-stunt-nazca-lines',
                image: '',
                summary: ''
            },
            {
                date: '2014-12-10',
                title: 'The Moors Murders',
                url: 'http://en.wikipedia.org/wiki/Moors_murders',
                image: '',
                summary: ''
            },
            {
                date: '2014-12-09',
                title: '10 Spanish Words That Have No English Translation',
                url: 'http://www.huffingtonpost.com/2014/05/27/spanish-words-no-translation_n_5399000.html',
                image: '',
                summary: ''
            },
            {
                date: '2014-12-08',
                title: 'Juliane Koepcke',
                url: 'http://en.wikipedia.org/wiki/Juliane_Koepcke',
                image: '',
                summary: ''
            },
            {
                date: '2014-12-07',
                title: 'In Defense Of Spielberg’s WAR OF THE WORLDS',
                url: 'http://badassdigest.com/2013/02/19/in-defense-of-spielbergs-war-of-the-worlds/',
                image: '',
                summary: ''
            }
        ];
    })
    .directive('linkOfTheDay', function() {
        return {
            restrict: 'E',
            link: function() {
            },
            templateUrl: '/scripts/linkOfTheDay/link-of-the-day.html'
        };
    });
