---
layout:         post
title:          "Greeneyes, a RequireJS module library"
created:        2014-07-30
modified:       2014-07-30
permalink:      greeneyes-requirejs/
description:    "Greeneyes is collection of useful JavaScript utilities and widgets (and accompanying CSS) written in AMD format to be used with RequireJS"
tags:           RequireJS, AMD, Javascript
---

Greeneyes is collection of useful JavaScript utilities and widgets (and accompanying CSS) written in AMD format to be used with RequireJS.

* The library includes tools that most websites will use, which will help your website get up and running.
* It is [available on Github](https://github.com/herereadthis/greeneyes) to use and modify as you please.
* Its organization is very **modular and scalable** - only take an use what you need.
<!--more-->

{% raw %}
<ul id="github_badges" class="sunflash_navmenu">
    <li><a href="http://badge.fury.io/bo/greeneyes">
            <img alt="Bower version" src="https://badge.fury.io/bo/greeneyes.svg" />
        </a></li>
    <li><a href="http://travis-ci.org/herereadthis/greeneyes">
            <img alt="Build Status" src="https://secure.travis-ci.org/herereadthis/greeneyes.svg?branch=master" />
        </a></li>
    <li><a href="https://david-dm.org/herereadthis/greeneyes#info=devDependencies">
            <img alt="Bower version" src="https://david-dm.org/herereadthis/greeneyes/dev-status.svg" />
        </a></li>
</ul>
{% endraw %}

### Greeneyes module listing

* **Analytics** - doubles as the Google Analytics plugin
* **Parallax Scroll** - makes background images scroll at relative speeds
* **Dropdown Menu** - toggle for hiding/showing dropdown menus

### Build

{% highlight bash %}
# Clone the repo
$ git clone https://github.com/herereadthis/greeneyes.git
$ cd greeneyes/
$ npm install
$ bower install
$ grunt
{% endhighlight %}

----------------

### Greeneyes Setup

**You will need RequireJS,** which is JavaScript file and module loader. This article assumes you already know the basics. I recommend installing RequireJS as a bower dependency.

{% highlight bash %}
# Get Greeneyes
$ bower install greeneyes --save
# Get RequireJS
$ bower install requirejs --save
{% endhighlight %}

One of the goals in creating Greeneeys was modularity, in order to prevent unecessary bloat. Unlike many other frameworks out there, you only to add paths to the modules you need. 

#### repo/main.js

{% highlight javascript %}
requirejs.config({
    paths: {
        // Only add the ones you need, e.g., 
        "Analytics": "[BOWER_PATH]/greeneyes/src/js/analytics",
        "DropdownMenu": "[BOWER_PATH]/greeneyes/src/js/dropdown_menu",
        ...
    }
});
{% endhighlight %}

Then use Grunt to compile your JS. Your page will only call one JavaScript file instead of having to pull in a million separate files.

#### repo/Gruntfile.js

{% highlight javascript %}
requirejs: {
    build: {
        options: {
            baseUrl: "<%= paths.src %>/js/",
            mainConfigFile: "<%= paths.src %>/js/main.js",
            name: "main",
            out: "<%= paths.build %>/js/main.js",
            optimize: 'uglify2',
        }
    }
},
{% endhighlight %}

### HTML Configuration

Greeneyes was created such that you will not have to pollute your HTML with a bunch of javascript commands. It will use a data attribute {% raw %}<code>[data-module=""]</code>{% endraw %} to sniff for the correct module to apply. For example, here is how to apply the parallax scroll module to a section:

{% highlight html %}
<section data-module="parallax_scroll">
{% endhighlight %}

Some modules have user-defined-variables that allow you to modify what happens. (Don't worry, a complete listing of parameters will be given below.) The parallax scroller has an additional data attribute to determine relative speed. Here is how to make backgrounds scroll in reverse order to page scroll:

{% highlight html %}
<section data-module="parallax_scroll" data-parallax-speed="-50">
{% endhighlight %}

----------------