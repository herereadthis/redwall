---
layout:         post
title:          "Bellmaker, a respoonsive media query package"
repo_title:     "<em>Bellmaker</em>, a responsive media query package"
created:        2014-06-16
modified:       2014-10-30
permalink:      bellmaker/
description:    "The Bellmaker is a library of device-agnostic and device specific media queries that will complement your existing CSS."
tags:           css, less, sass
---

The Bellmaker is a library of ***device-agnostic*** *and* ***device-specific*** media queries that will complement your exisiting CSS. 

* It will help you make *responsive websites*, especially if you are using grid layouts.
* It is [available on Github](https://github.com/herereadthis/bellmaker) to use and modify as you please.
* Both **LESS** and **SASS** versions are available, and will work with Bootstrap.
<!--more-->

{% raw %}
<ul id="github_badges" class="sunflash_navmenu">
    <li><a href="http://badge.fury.io/bo/bellmaker">
            <img alt="Bower version" src="https://badge.fury.io/bo/bellmaker.svg" />
        </a></li>
    <li><a href="http://travis-ci.org/herereadthis/bellmaker">
            <img alt="Build Status" src="https://secure.travis-ci.org/herereadthis/bellmaker.svg?branch=master" />
        </a></li>
    <li><a href="https://david-dm.org/herereadthis/bellmaker#info=devDependencies">
            <img alt="Bower version" src="https://david-dm.org/herereadthis/bellmaker/dev-status.svg" />
        </a></li>
    <li><a href="https://codeclimate.com/github/herereadthis/bellmaker">
            <img alt="Code Climate" src="https://codeclimate.com/github/herereadthis/bellmaker/badges/gpa.svg" />
        </a></li>
</ul>
{% endraw %}

### Build

{% highlight bash %}
# Clone the repo
$ git clone https://github.com/herereadthis/bellmaker.git
$ cd bellmaker/
$ npm install
$ bower install
$ grunt
{% endhighlight %}

### View the Demo

{% highlight bash %}
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

{% highlight bash %}
$ bower install --save bellmaker
{% endhighlight %}

#### Alternative: Add the Bellmaker as a submodule

{% highlight bash %}
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

{% highlight bash %}
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
    @media @mq_baseline {   width: @pw_baseline;}
    @media @mq_2x_small {   width: @pw_2x_small;}
    @media @mq_x_small {    width: @pw_x_small;}
    @media @mq_small {      width: @pw_small;}
    @media @mq_medium {     width: @pw_medium;}
    @media @mq_large {      width: @pw_large;}
    @media @mq_x_large {    width: @pw_x_large;}
}
{% endhighlight %}

#### Device-agnostic output as SASS

{% highlight css %}
.bellmaker_container {
    @media #{$da_baseline} {    width: $pw_baseline;}
    @media #{$da_2x_small} {    width: $pw_2x_small;}
    @media #{$da_x_small} {     width: $pw_x_small;}
    @media #{$da_small} {       width: $pw_small;}
    @media #{$da_medium} {      width: $pw_medium;}
    @media #{$da_large} {       width: $pw_large;}
    @media #{$da_x_large} {     width: $pw_x_large;}
}
{% endhighlight %}

Note: the abbreviation "da" stands for "device-agnostic," and "pw" stands for "page width."

#### Compiled as CSS

{% highlight css %}
@media only screen and (min-width: 320px) {
    .bellmaker_container {width: 100%;}
}
@media only screen and (min-width: 480px) {
    .bellmaker_container {width: 100%;}
}
@media only screen and (min-width: 640px) {
    .bellmaker_container {width: 100%;}
}
@media only screen and (min-width: 768px) {
    .bellmaker_container {width: 76.8rem;}
}
@media only screen and (min-width: 1024px) {
    .bellmaker_container {width: 96rem;}
}
@media only screen and (min-width: 1280px) {
    .bellmaker_container {width: 115.2rem;}
}
@media only screen and (min-width: 1440px) {
    .bellmaker_container {width: 134.4rem;}
}
{% endhighlight %}

To speed up development, there is always the option of skipping or omitting breakpoints. In the above code, there is no need to declare breakpoints at 480px or 640px because {% raw %}<code>#container_id {}</code>{% endraw %} would still be 100% width. Also, if you don't feel like (or would rather delay) designing for very large screens, then there is no need to specify {% raw %}<code>@media @da_x_large {...}</code>{% endraw %} As such, **even though the Bellmaker does provide 7 breakpoints,** ***you can use just 4*** **as a bare minimum.**

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

-------------

### Device-Specific Targeting

In most cases, the device-agnostic media queries will cover everything you need. But if you need to target a specific device:

| Devices | Query Suffix | Pixel Ratio | Aspect Ratio | Display Resolution | Actual Resolution | 
| ---- | ---- | ---- | ---- | ---- | ---- |
| Blackberry Z30; Motorola Droid Maxx, Razr HD; Samsung GN2; Sony Xperia S | ds_720p_hd2 | 2 | 9:16 | 360×640 | 720×1280 |
| Google Nexus 4 | ds_768_wxga2 | 2 | 3:5 | 384×640 | 768×1280 | 
| Nokia Lumia 920, 925, 928 | ds_768_wxga24 | 2.4 | 3:5 | 320×533 | 768×1280 | 
| Samsung GN1 | ds_800_wxga2 | 2 | 5:8 | 400×640 | 800×1280 | 
| Google Nexus 5; HTC Hero M7, M8; LG G2; Samsung GS4, GS5, GN3; Sony Xperia Z1, Z2 | ds_1080_hd3 | 3 | 9:16 | 1080×1920 | 360×640 |
| LG G3, Samsung GN4 | ds_wqhd4 | 4 | 9:16  | 360×640 | 1440×2560 |
| iPhone 1-3 | ds_iphone_early | 1 | 2:3 | 320×480 | 320×480 |
| iPhone 4(s) | ds_iphone_4 | 2 | 2:3 | 320×480 | 640×960 |
| iPhone 5(s)(c) | ds_iphone_5 | 2 | 40:71 | 320×568 | 640×1136 |
| iPhone 6 | ds_iphone_6 | 2 | 375:667 | 375×667 | 750×1334 |
| iPhone 6 Plus | ds_iphone_6_plus | 3 | 9:16 | 414×736 | 1242×2208 |
| All iPads | ds_ipad | N/A | 3:4 | 768×1024 | 768×1024 |
| iPad 1-2; iPad Mini 1 | ds_ipad_early | 1 | 3:4 | 768×1024 | 768×1024 |
| iPad 3+; iPad Air; iPad Mini 2 | ds_ipad_retina | 2 | 3:4 | 1536×2056 | 768×1024 |

To write the media query for your phone just choose from the "Query Suffix" column that matches your device. There are two ways to target orientation: 1) add _landscape or _portrait to target the device by orientation, or 2) add @orientation_landscape/portrait.

{% highlight css %}
/* Target iPhone 6 specifically */
@media @ds_iphone_6 {}
/* Target iPhone_6 in landscape mode */
@media @ds_iphone_6_landscape {}
@media @ds_iphone_6 @orientation_landscape {}
/* Target iPhone6 in portrait mode */
@media @ds_iphone_6_portrait {}
@media @ds_iphone_6 @orientation_portrait {}
{% endhighlight %}

-------------

### Aspect Ratio Targeting

**You can save a lot of time by targeting groups of devices** by using aspect ratios instead. For example, the Samsung Galaxy S series and Motorola Droid actually render the same 360×640 pixels, which mean the share the same 9:16 aspect ratio. Use the ```ds_ratio_9_16``` variable. ("ds" stands for device-specific)

{% highlight css %}
/* Target all 9:16 phones (LESS) */
@media @ds_ratio_9_16 {
    #container_id   {width: 100%;}
}
{% endhighlight %}

{% highlight css %}
/* Target all 9:16 phones (SASS) */
@media #{ds_ratio_9_16} {
    #container_id   {width: 100%;}
}
{% endhighlight %}

{% highlight css %}
/* Compiled as CSS */
@media only screen and (device-aspect-ratio: 9/16) {
    #container_id   {width: 100%;}
}
{% endhighlight %}

Here is the complete listing of how to target phones by aspect ratio:

| Aspect Ratio | Query Suffix | Brand | Models |
| ---- | ---- | ----| ---- |
| 9:16 | ds_ratio_9_16 | Blackberry | Z30 |
| 9:16 | ds_ratio_9_16 | Google | Nexus 5 |
| 9:16 | ds_ratio_9_16 | HTC | Hero M7/M8 |
| 9:16 | ds_ratio_9_16 | LG | G2/G3 |
| 9:16 | ds_ratio_9_16 | Motorola | Droid Maxx, Razr HD |
| 9:16 | ds_ratio_9_16 | Samsung | GN2/GN3, GS4/GS5 |
| 9:16 | ds_ratio_9_16 | Sony | Xperia S/Z1/Z2 |
| 3:5 | ds_ratio_3_5 | Nokia | Lumia 920/925/928 |
| 5:8 | ds_ratio_5_8 | Samsung | GN1 |
| 2:3 | ds_ratio_2_3 | Apple | iPhone 1/2/3/4 |
| 3:4 | ds_ratio_3_4 | Apple | iPad 1/2/3/4, Air, Mini |

Unfortunately Bellmaker doesn't have aspect ratio targeting for the iPhone 5 and 6, because they have very unique screens. Just use ```ds_iphone_5``` and ```ds_iphone_6``` instead.

------------------------

## Math Operators

Box-model dimensions and offsets can use mixins, which will range from breakpoints ```da_small``` to ```da_x_large```. Breakpoints ```da_baseline```, ```da_2x_small```, and ```da_x_small``` are not part of the math operators because sizing for them is done as percentages. 

Use these mixins especially for moving columns around. Remember that offsets and factors will be calculated as REM units.


{% highlight css %}
/* LESS: Offset mixin: */
.bellmaker_offset(@attribute,@offset) {};
/* LESS Factor mixin: */
.bellmaker_factor(@attribute,@factor) {};
{% endhighlight %}

{% highlight css %}
/* SASS: Offset mixin: */
@include bellmaker_offset($attribute,$offset) {};
/* SASS Factor mixin: */
@include bellmaker_factor($attribute,$factor) {};
{% endhighlight %}

#### Example: offset left padding

{% highlight css %}
/* As LESS: section will now always be 30rem width less than parent */
/* container, so that a 30rem sidebar can floated right */
section {
    float: left;
    .bellmaker_offset(width, -30);
}
aside {
    float: right;
    width: 30rem;
}
{% endhighlight %}

{% highlight css %}
/* As SASS */
section {
    float: left;
    @include bellmaker_offset(width, -30);
}
aside {
    float: right;
    width: 30rem;
}
{% endhighlight %}


{% highlight css %}
/* output */
section {
    float: left;
}
@media only screen and (min-width: 768px) {
    section {width: 448px;}
}
@media only screen and (min-width: 1024px) {
    section {width: 660px;}
}
@media only screen and (min-width: 1280px) {
    section {width: 852px;}
}
@media only screen and (min-width: 1440px) {
    section {width: 1044px;}
}
aside {
    float: right;
    width: 30rem;
}
{% endhighlight %}

Available attributes are ```width```, ```height```, ```padding-top```, ```padding-right```, ```padding-bottom```, ```padding-left```, ```padding-top```, ```padding-right```, ```padding-bottom```, ```padding-left```, ```margin-top```, ```margin-right```, ```margin-bottom```, and ```margin-left```.

-------------

### Bootstrap Integration

The Bellmaker will complement the Twitter Bootstrap framework for LESS. [A demo is available](https://github.com/herereadthis/bellmaker/blob/master/src/demo/bootstrap_demo/index.html) if you load up {% raw %}<code>http://localhost:8002/src/demo/bootstrap_demo/</code>{% endraw %}. 

#### LESS Cascading Order

{% highlight css %}
/* 1. Load main Bootstrap import file */
@import "/PATH_TO/../bootstrap/less/bootstrap.less";
/* 2. Load main Bellmaker import file */
@import "/PATH_TO/../bellmaker/src/less/bellmaker.less";
/* 3. Load Bootstrap/Bellmaker integration add-on */
@import "/PATH_TO/../bellmaker/src/less/bootstrap_integration.less";
{% endhighlight %}

Now you will have 7 breakpoints in Bootstrap

{% highlight css %}
.col-bl-##
.col-ss-##
.col-xs-##
.col-sm-##
.col-md-##
.col-lg-##
.col-bl-##
{% endhighlight %}

-------------





