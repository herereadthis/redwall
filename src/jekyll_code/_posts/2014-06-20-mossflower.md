---
layout:     	post
title:      	"Mossflower, a CSS global reset"
repo_title:     "<em>Mossflower</em>, a CSS global reset"
created:       	2014-06-20
modified:		2014-06-23
permalink:  	mossflower/
description:	"Mossflower is a global reset CSS utility for both LESS and SASS to help you spin up new websites."
tags:       	css, less, sass
---

Mossflower is a **global reset** CSS utility for both LESS and SASS.

* Both robust and bare-bones; you won't find yourself fighting against this utility.
* It is [available on Github](https://github.com/herereadthis/mossflower) to use and modify as you please.
* It helps you spin up new web applications faster by *reducing boilderplate CSS*.
<!--more-->

{% raw %}
<ul id="github_badges" class="sunflash_navmenu">
	<li><a href="http://badge.fury.io/bo/mossflower">
			<img alt="Bower version" src="https://badge.fury.io/bo/mossflower.svg" />
		</a></li>
	<li><a href="http://travis-ci.org/herereadthis/mossflower">
			<img alt="Build Status" src="https://secure.travis-ci.org/herereadthis/mossflower.svg?branch=master" />
		</a></li>
	<li><a href="https://david-dm.org/herereadthis/mossflower#info=devDependencies">
			<img alt="Bower version" src="https://david-dm.org/herereadthis/mossflower/dev-status.svg" />
		</a></li>
</ul>
{% endraw %}

### Build

{% highlight bash %}
# Clone the repo
$ git clone https://github.com/herereadthis/mossflower.git
$ cd mossflower/
$ npm install
$ grunt
{% endhighlight %}

----------------------------

### Setup

The Bellmaker assumes you have basic terminal skills and knowledge of Git. Additionally, you should be using Grunt.

### CSS importing

#### Recommended: Add the Bellmaker as a Bower dependency

{% highlight bash %}
$ bower install --save mossflower
{% endhighlight %}

#### Alternative: Add Mossflower as a submodule

{% highlight bash %}
$ cd my_repo
$ git submodule add https://github.com/herereadthis/mossflower.git
$ git add mossflower .gitmodules
$ git commit -m "adds Mossflower submodule"
{% endhighlight %}

#### As LESS: Add to your imports

{% highlight css %}
@import "/PATH_TO/../mossflower/src/less/main.less";
{% endhighlight %}



[![Bower version](https://badge.fury.io/bo/mossflower.svg)](http://badge.fury.io/bo/mossflower)
