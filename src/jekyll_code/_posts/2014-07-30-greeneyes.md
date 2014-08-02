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
* **Parallax scroll** - makes background images scroll at relative speeds
* **Dropdown menu** - toggle for hiding/showing dropdown menus (coming later)
* **Content tabs** - hide/show blocks of content based on menu buttons (coming later)
* **Accordion content** - Collapsible, stacked content (coming later)
* **Popover/ tooltips** - Collapsible, stacked content (coming later)

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

Greeneyes was created such that you will not have to pollute your HTML with a bunch of javascript commands. Most modules will use a data attribute {% raw %}<code>[data-module=""]</code>{% endraw %} to sniff for the correct module to apply. For example, here is how to apply the parallax scroll module to a section:

{% highlight html %}
<section data-module="parallax_scroll">
{% endhighlight %}

Some modules have user-defined-variables that allow you to modify what happens. (Don't worry, a complete listing of parameters will be given below.) The parallax scroller has an additional data attribute to determine relative speed. Here is how to make backgrounds scroll in reverse order to page scroll:

{% highlight html %}
<section data-module="parallax_scroll" data-parallax-speed="-50">
{% endhighlight %}

----------------

### Google Analytics

This module replaces the standard Google analytics plugin **([view on GitHub](https://github.com/herereadthis/redwall/graphs/punch-card))**. The main advantage here is that you will get to remove inline JavaScript on your page. *Note: Unlike the other Greeneyes modules, this one does not need a* {% raw %}<code>[data-module=""]</code>{% endraw %} *attribute.* 

#### Get the module

{% highlight javascript %}
// Add the path to your main.js configuration
requirejs.config({
    paths: {
        // Only add the ones you need, e.g., 
        "Analytics": "[BOWER_PATH]/greeneyes/src/js/analytics",
        ...
    }
});
// call the module in main.js
require(['Analytics','...'], function(Analytics, ...) {
	// initialize Google Analytics module
    Analytics.track();
    ...
});
{% endhighlight %}

#### Call the module in your HTML in your {% raw %}<code><body /></code>{% endraw %} tag

{% highlight html %}
<body data-google-analytics="UA-########-#">
{% endhighlight %}

----------------

### Parallax background scrolling

This module makes the container&rsquo;s background scroll at different rates versus page scroll. Parallax speed is expressed as a percentage. Set parallax speed with attribute {% raw %}<code>[data-parallax-speed="##"</code>{% endraw %}. At 0%, the background is fixed to the window. At 50%, the background will scroll at half the speed of the window scroll. At 200%, the background will scroll at twice rate as window scroll. If you do not set a parallax speed, the module will default to 50%.

{% raw %}
<style>
.starfield {
    background-image: url("/build/images/css/space_bg.gif");
}
.nested_code {
	margin-bottom: 2rem;
}
.nested_code .highlight {
	float: left;
	margin: 2rem 0 0 2rem;
	padding: 0.5rem 1rem;
	background-color: rgba(255,255,255,0.75);
}
</style>
{% endraw %}

{% raw %}
<div class="starfield nested_code" data-module="parallax_scroll" style="height: 23.4rem;">
{% endraw %}
{% highlight html %}
<!-- Default is 50% -->
<div data-module="parallax_scroll">
{% endhighlight %}
{% raw %}
</div>
{% endraw %}

This module does require you to import the parallax scrolling CSS file.

{% highlight css %}
/* import LESS version */
@import "[BOWER_PATH]/greeneyes/src/less/parallax_scroll.less";
{% endhighlight %}

{% raw %}
<div class="starfield nested_code" data-module="parallax_scroll" data-parallax-speed="150" style="height: 23.4rem;margin-top: 2rem;">
{% endraw %}
{% highlight html %}
<!-- 150% speed -->
<div data-module="parallax_scroll"
	data-parallax-speed="150">
{% endhighlight %}
{% raw %}
</div>
{% endraw %}

You will have to define your background image yourself in your CSS. The parallax scrolling works by isolating the background positioning of your image. Therefore, while you can set x-position as percentage, you must express y-position as a finite value.

{% highlight css %}
/* This is okay */
.parallax_background {background-position: center 0rem;}
/* This is not okay */
.parallax_background {background-position: left bottom;}
{% endhighlight %}

{% raw %}
<div class="starfield nested_code" data-module="parallax_scroll" data-parallax-speed="-50" style="height: 23.4rem;margin-top: 2rem;">
{% endraw %}
{% highlight html %}
<!-- -50% = reverse scroll -->
<div data-module="parallax_scroll"
	data-parallax-speed="-50">
{% endhighlight %}
{% raw %}
</div>
{% endraw %}

----------------

### Dropdown menu navigation

Coming soon ([GitHub issue #4](https://github.com/herereadthis/greeneyes/issues/4))

----------------

### Content tab widget

Coming soon ([GitHub issue #3](https://github.com/herereadthis/greeneyes/issues/3))

----------------

### Collapsible accordion content

Coming soon ([GitHub issue #1](https://github.com/herereadthis/greeneyes/issues/1))

----------------

### Tooltips and popovers

Coming soon ([GitHub issue #2](https://github.com/herereadthis/greeneyes/issues/2))

----------------

### More to come...

*Who puts articles online before finishing them? I do. Check back in a few days.*