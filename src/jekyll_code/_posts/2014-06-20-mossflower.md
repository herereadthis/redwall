---
layout:     post
title:      "Mossflower, a CSS Global Reset"
date:       2014-06-20 20:30:10
permalink:  mossflower/
tags:       css, less, sass
---

Mossflower is a **global reset** CSS utility for both LESS and SASS.

* Both robust and bare-bones; you won't find yourself fighting against this utility.
* It is [available on Github](https://github.com/herereadthis/mossflower) to use and modify as you please.
* It helps you spin up new web applications faster by *reducing boilderplate CSS*.

<!--more-->

### Build

{% highlight html %}
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

{% highlight html %}
$ bower install --save mossflower
{% endhighlight %}

#### Alternative: Add Mossflower as a submodule

{% highlight html %}
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
