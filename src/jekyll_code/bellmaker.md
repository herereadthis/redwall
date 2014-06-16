---
layout: page
title: Bellmaker
permalink: /bellmaker/
---


The Bellmaker is a library of ***device-agnostic*** *and* ***device-specific*** media queries that will complement your exisiting CSS. 

* It will help you make *responsive websites*, especially if you are using grid layouts.
* It is free to use and modify as you please.
* Both **LESS** (.less) and **SASS** (.scss) versions are available.

### Build

{% highlight ruby %}
$ git clone https://github.com/herereadthis/bellmaker.git
$ cd bellmaker/
$ npm install
$ grunt
{% endhighlight %}

### View the Demo

{% highlight ruby %}
$ python -m SimpleHTTPServer 8001
{% endhighlight %}

Site will load at http://localhost:8001/


----------------------------

### Setup

The Bellmaker assumes you have basic terminal skills and knowledge of Git. Additionally, your project is using LESS/SASS and Grunt.

#### But what if my project is old school?

Maybe you write your novels on a typewriter. Maybe you develop your Tri-X in Rodinal. In which case, there is supplemental documentation for [***using the Bellmaker as straight CSS***](https://github.com/herereadthis/bellmaker/docs/old_school.md).

### CSS importing

#### Recommended: Add the Bellmaker as a Bower dependency

{% highlight ruby %}
$ bower install --save bellmaker
{% endhighlight %}

#### Alternative: Add the Bellmaker as a submodule

{% highlight ruby %}
$ cd my_repo
$ git submodule add https://github.com/herereadthis/bellmaker.git
$ git add bellmaker .gitmodules
$ git commit -m "adds Bellmaker submodule"
{% endhighlight %}

#### As LESS: Add to your imports

{% highlight css %}
@import "/PATH_TO/../bellmaker/src/less/bellmaker.less";
{% endhighlight %}

#### As SASS: Add mixins partial to any file that needs media queries

{% highlight CSS %}
@import "/PATH_TO/../bellmaker/src/less/mixins_variables";
@import "/PATH_TO/../bellmaker/src/less/page_layout";
{% endhighlight %}


#### Reset page styling to make 10px = 1REM

{% highlight css %}
html {
    font-size: 62.5%;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    /* existing attributes */
}
body {
    font-size: 100%;
    font-size: 1em;
    /* existing attributes */
}
{% endhighlight %}

----------------------------

### Configuration

{% highlight css %}
.bellmaker_container {
    @media @mq_baseline {
        width: @pw_baseline;
    }
    @media @mq_2x_small {
        width: @pw_2x_small;
    }
    @media @mq_x_small {
        width: @pw_x_small;
    }
    @media @mq_small {
        width: @pw_small;
    }
    @media @mq_medium {
        width: @pw_medium;
    }
    @media @mq_large {
        width: @pw_large;
    }
    @media @mq_x_large {
        width: @pw_x_large;
    }
}
{% endhighlight %}



[![Bower version](https://badge.fury.io/bo/bellmaker.svg)](http://badge.fury.io/bo/bellmaker)
