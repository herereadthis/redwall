---
layout:     post
title:      "Bellmaker, a Media Query Package"
date:       2014-06-21 20:30:10
permalink:  bellmaker/
tags:       css, less, sass
---

The Bellmaker is a library of ***device-agnostic*** *and* ***device-specific*** media queries that will complement your exisiting CSS. 

* It will help you make *responsive websites*, especially if you are using grid layouts.
* It is [available on Github](https://github.com/herereadthis/bellmaker) to use and modify as you please.
* Both **LESS** and **SASS** versions are available, and will work with Bootstrap.

<!--more-->

### Build

{% highlight html %}
$ git clone https://github.com/herereadthis/bellmaker.git
$ cd bellmaker/
$ npm install
$ grunt
{% endhighlight %}

### View the Demo

{% highlight html %}
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

{% highlight html %}
$ bower install --save bellmaker
{% endhighlight %}

#### Alternative: Add the Bellmaker as a submodule

{% highlight html %}
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

### Configuration

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

*For more useful global CSS resets and utilities, check out out the companion [Mossflower](/code/mossflower/) reset library.*

{% highlight html %}
$ bower install --save mossflower
{% endhighlight %}

#### Add vital stuff to your index.html file

{% highlight html %}
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
{% endhighlight %}

----------------------------

### Concepts

Media queries in Bellmaker bubble up from smallest to largest, in sequence.

#### Liquid Mobile

For resolutions that would mostly likely occur on handheld devices, the Bellmaker will fill the container it is given. The resolutions covered are 320, 360, 480, 568, 640, and 720.

{% raw %}
<table>
    <thead>
        <tr>
            <th>Breakpoint</th>
            <th>Width</th>
            <th>iOS Devices</th>
            <th>Other Devices</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>320 - 480</td>
            <td>100%</td>
            <td>iPhone Portrait</td>
            <td>720 HD:2, 1080 HD:3, WQHD:4</td>
        </tr>
        <tr>
            <td>480 - 640</td>
            <td>100%</td>
            <td>iPhone Landscape</td>
            <td>768 WXGA:2</td>
        </tr>
        <tr>
            <td>640 - 768</td>
            <td>100%</td>
            <td></td>
            <td>720 HD:2 (landscape), 1080 HD:3 (landscape), WQHD:4 (landscape)</td>
        </tr>
    </tbody>
</table>
{% endraw %}

While a breakpoint at 640 pixels does exist, it's okay to skip because it would only become useful if a significant number of people frequently held their HD phones (e.g. Samsung GS5, HTC Hero) in landscape mode, but not many do unless they're gaming.

#### Column Snapping

Media queries in the Bellmaker create a pseudo-liquid snapping layout. That is, as the screen gets larger, the elements on the page go to higher fixed widths. Each of the fixed widths was selected because they are divisible by 2, 3, 4, 6, 12, 16, and 24, which makes grid layouts easier. Resolution ranges were selected because the breakpoints are a best-fit for commonly-occurring screen resolutions.

| Breakpoint | Fixed Width | 3 Cols | 4 Cols | 12 Cols | 16 Cols | 24 Cols |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| *768 - 1024*  | **768px**  | 256px | 192px | 64px  | 48px | 32px |
| *1024 - 1280* | **960px**  | 320px | 240px | 80px  | 60px | 40px |
| *1280 - 1440* | **1152px** | 384px | 288px | 96px  | 72px | 48px |
| *1440 and up* | **1344px** | 448px | 336px | 112px | 84px | 56px |

For example, if your browser window is 1366 pixels wide, then the width of the page content will be 1152 pixels wide, giving you 3 columns of 384 pixels each, or 12 columns of 96 pixels each. The Bellmaker does not do an addtional larger breakpoint because 7 media queries is plenty enough, and designing for screen resolutions for 1600 or 1920 screens runs into usability difficulties with reading long lines of text.

----------------------------

### Usage

#### Device-agnostic output as LESS

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

#### Device-agnostic output as SASS

{% highlight css %}
.bellmaker_container {
    @media #{$da_baseline} {
        width: $pw_baseline;
    }
    @media #{$da_2x_small} {
        width: $pw_2x_small;
    }
    @media #{$da_x_small} {
        width: $pw_x_small;
    }
    @media #{$da_small} {
        width: $pw_small;
    }
    @media #{$da_medium} {
        width: $pw_medium;
    }
    @media #{$da_large} {
        width: $pw_large;
    }
    @media #{$da_x_large} {
        width: $pw_x_large;
    }
}
{% endhighlight %}

Note: the abbreviation "da" stands for "device-agnostic," and "pw" stands for "page width."

#### Compiled as CSS

{% highlight css %}
@media only screen and (min-width: 320px) {
    .bellmaker_container {
        width: 100%;
    }
}
@media only screen and (min-width: 480px) {
    .bellmaker_container {
        width: 100%;
    }
}
@media only screen and (min-width: 640px) {
    .bellmaker_container {
        width: 100%;
    }
}
@media only screen and (min-width: 768px) {
    .bellmaker_container {
        width: 76.8rem;
    }
}
@media only screen and (min-width: 1024px) {
    .bellmaker_container {
        width: 96rem;
    }
}
@media only screen and (min-width: 1280px) {
    .bellmaker_container {
        width: 115.2rem;
    }
}
@media only screen and (min-width: 1440px) {
    .bellmaker_container {
        width: 134.4rem;
    }
}
{% endhighlight %}

{% raw %}
<p>To speed up development, there is always the option of skipping or omitting breakpoints. In the above code, there is no need to declare breakpoints at 480px or 640px because <code>#container_id {}</code> would still be 100% width. Also, if you don't feel like (or would rather delay) designing for very large screens, then there is no need to specify <code>@media @da_x_large {...}</code> As such, <strong>even though the Bellmaker does provide 7 breakpoints, <em>you can use just 4</em> as a bare minimum.</strong></p>
{% endraw %}

To speed up development, there is always the option of skipping or omitting breakpoints. In the above code, there is no need to declare breakpoints at 480px or 640px because {% highlight css %}#container_id {}{% endhighlight %} would still be 100% width. Also, if you don't feel like (or would rather delay) designing for very large screens, then there is no need to specify {% highlight css %}@media @da_x_large {...}{% endhighlight %} As such, **even though the Bellmaker does provide 7 breakpoints,** ***you can use just 4*** **as a bare minimum.**

#### As LESS

{% highlight css %}
.bellmaker_container {
    @media @da_baseline {   width: @pw_baseline;}
    @media @da_small {      width: @pw_small;}
    @media @da_medium {     width: @pw_medium;}
    @media @da_large {      width: @pw_large;}
}
{% endhighlight %}

#### As SASS

{% highlight css %}
.bellmaker_container {
    @media #{$da_baseline} {    width: $pw_baseline;}
    @media #{$da_small} {       width: $pw_small;}
    @media #{$da_medium} {      width: $pw_medium;}
    @media #{$da_large} {       width: $pw_large;}
}
{% endhighlight %}

Notice how the LESS/SASS variable names of the media queries just became very easy to remember?





[![Bower version](https://badge.fury.io/bo/bellmaker.svg)](http://badge.fury.io/bo/bellmaker)
