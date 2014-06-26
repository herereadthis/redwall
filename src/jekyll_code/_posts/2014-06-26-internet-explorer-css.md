---
layout:         post
title:          "How to write fallback CSS for legacy Internet Explorer (IE8, IE7)"
date:           2014-06-26 7:30:10
permalink:      internet-explorer-legacy-css/
description:    "Supporting older versions of Internet Explorer (e.g. IE7, IE8) can be a nightmare but there are many options available to speed up development time while minimizing debugging errors"
tags:           IE8, IE7, css
---

It's the nightmare of every front-end developer: supporting older versions of Internet Explorer (IE). You may not want to, but usually it's because your company's project needs to support customers still using older machines...or maybe you're just a masochist. However, there are many ways to make your life easier by speeding up development while minimizing those mysterious errors when debugging.
<!--more-->

### Basic tricks and princiles

1. **Don't pollute your current CSS**
  * Continue writing CSS as if you're writing for the perfect, standards-compliant browser.
  * Keep all legacy/fallback IE CSS in a separate stylesheet so it'll be easier to manage.
  * Call in IE CSS with conditional commenting. It's easier handle than a bunch of IE-specific CSS hacks.
2. **Forget about liquid layout**
  * Floats and percentages are already difficult enough, so a fixed-width page will allow you to set page elements faster
  * From a practical standpoint, users on older Internet Explorer machines are most likely using old computers, which means they are using old, small monitors.
3. **Good enough is good enough**
  * You may want to explore magical polyfills to get your box shadows and transistions and rounded corners, but you're just wasting your own time.
  * Since IE machines are typically old, we should be keeping webpages as resource-light as possible anyway.

---------------------

### Tip #1: Keep all IE CSS isolated

If you scatter your IE CSS throughout your stylesheets with CSS hacks (e.g. the * star hack), then you will end up with a bunch of clutter, and debugging becomes much more complicated.

#### Identify IE-specific classes at the {% raw %}<code><body /></code>{% endraw %} tag with conditional commenting

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <!-- HEAD tags go here -->
  </head>
  <!-- We will treat IE 7 and 8 as one entity -->
  <!--[if IE 7]><body class="ie ie7 ie7_8"><![endif]-->
  <!--[if IE 8]><body class="ie ie8 ie7_8"><![endif]-->
  <!-- Treat IE9 as a close approximation of standards compliancy -->
  <!--[if IE 9]><body class="ie ie9"><![endif]-->
  <!-- Because IE10 does not recognize conditional comments anyway. -->
  <!--[if (gt IE 9)|!(IE)]><!--><body><!--<![endif]-->
    <!-- Insert Body's content here -->
  </body>
</html>
{% endhighlight %}

Then in your IE CSS stylesheet, you can target versions of IE independently or in groups. Obviously, if the user is on a modern browser like Chrome, Safari, Opera, or Firefox, all the IE-targeted CSS will be completely ignored.

{% highlight css %}
/* target only IE7 */
body.ie7 {}
/* target only IE8 */
body.ie8 {}
/* target only IE9 */
body.ie9 {}
/* target IE7 and IE8 */
body.ie7_8 {}
/* target IE7, IE8, and IE9 */
body.ie {}
{% endhighlight %}

Notice that since any IE-specific CSS is identfied at the {% raw %}<code>body {}</code>{% endraw %} level, it is easier to override all other rules and inheritances without having to resort to a bunch of {% raw %}<code>!important</code>{% endraw %} declarations.

Also, when writing fallback IE, the vast majority of the problems come from IE7 and IE8, so it's better to focus on those two. For example,

#### Basic CSS

{% highlight css %}
.ie7_8 .container {
    /* styles go here */
}
.ie7_8 .container p {
    /* styles go here */
}
{% endhighlight %}

#### As precompiled CSS (LESS or SASS)

{% highlight css %}
.ie7_8 {
    .container {
        /* styles go here */
        p {
            /* styles go here */
        }
    }
}
{% endhighlight %}

Again, what we are concerned about is **speed of development.** Writing CSS for older versions of IE is tedious and frustrating. There are many debates whether it's better to use conditional commenting versus hacks, but the one thing that cannot be doubted is that debugging with conditional commenting is *faster.*

------------

### Tip #2: Set your page to a fixed with of 984 pixels (984px)

If your page is using a grid layout, or especially if you're using frameworks such as Bootstrap or Foundation, then you've most likely set {% raw %}<code>box-sizing: border-box;</code>{% endraw %}. This means on IE7 machines, all your floats are going to break because of the paddings and margins. Save a lot of headaches by letting go of liquid columns.

984px was specifically chosen as a matter of praticality: Most users on IE7 or IE8 machines are likely working with old computers and old, small monitors. The majority will either be using 1024×768 or 1280×1024, so debugging time will be much faster with one lowest-common-denominator size.

