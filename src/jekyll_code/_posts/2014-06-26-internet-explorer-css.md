---
layout:         post
title:          "How to write fallback CSS for legacy Internet Explorer (IE8, IE7)"
date:           2014-06-26 7:30:10
permalink:      internet-explorer-legacy-css/
description:    "Supporting older versions of Internet Explorer (e.g. IE7, IE8) can be a nightmare but there are many options available to speed up development time while minimizing debugging errors"
tags:           IE8, IE7, css
image:
    - url: internet-explorer-css--modern-ie--1920x1080.png
      caption: '#### Visit [www.modern.ie](https://www.modern.ie/en-us/virtualization-tools) to download a VM' 
      alt: 'Virtual machine VM downloads from Modern IE'
    - url: internet-explorer-css--curl-ie8--1444x952.png
      caption: '#### Terminal output for IE8 VM'
      alt: 'Terminal output for IE8 VM'
    - url: internet-explorer-css--virtualbox-settings--1352x1028.png
      caption: '#### Configuring VM settings'
      alt: 'Configuring VM settings'
    - url: internet-explorer-css--launch-virtualbox--1336x804.png
      caption: '#### VirtualBox Settings'
      alt: 'Launch VirtualBox'
    - url: internet-explorer-css--ie8--1600x1286.png
      caption: '#### This site could use a lot of debugging'
      alt: '#### This site could use a lot of debugging'
---

It's the nightmare of every front-end developer: supporting older versions of Internet Explorer (IE). You may not want to, but usually it's because your company's project needs to support customers still using older machines...or maybe you're just a masochist. However, there are many ways to make your life easier by **speeding up development** while minimizing those mysterious errors when debugging.
<!--more-->

Developing CSS for IE7 and IE8 definitely follows the 80/20 rule. 20% of your time is spent styling for modern browsers, 80% of your time is for IE. **Every tip outlined below is meant to cut down your development time.** Since basically the only reason why you are developing for IE is because you're working on a paid project where your clients have angry customers, it's better to spend your time on other tasks and scope.

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

### *Tip #1:* Download VirtualBox

Since you are coding, I'm assuming you're using a Mac or Linux machine. At any rate, you probably don't have IE7 or IE8 on your computer so you need something to see your changes. **[VirtualBox is a free app for spinning up virtual machines](https://www.virtualbox.org/)**

{% figure_img 0 caption %}

Select your OS, then select the "Virtual Box" option to get a list of virtual machines. It gives the option to download all the compressed files, or you can just use the cURL command given.


{% highlight html %}
# download IE8 for Windows XP on Mac
$ curl -O -L "https://www.modern.ie/vmdownload?platform=mac&virtPlatform=virtualbox&browserOS=IE8-WinXP&parts=2&filename=VMBuild_20131127/VirtualBox/IE8_WinXP/Mac/IE8.WinXP.For.MacVirtualBox.part{1.sfx,2.rar}"

# download IE7 for Vista on Mac
$ curl -O -L "https://www.modern.ie/vmdownload?platform=mac&virtPlatform=virtualbox&browserOS=IE7-Vista&parts=4&filename=VMBuild_20131127/VirtualBox/IE7_Vista/Mac/IE7.Vista.For.MacVirtualBox.part{1.sfx,2.rar,3.rar,4.rar}"
{% endhighlight %}

{% figure_img 1 caption %}

For demo purposes, let's get the Windows XP machine for IE8. Running the cURL command will get two files, {% raw %}<code>IE8.WinXP.For.MacVirtualBox.part1.sfx</code>{% endraw %} and {% raw %}<code>IE8.WinXP.For.MacVirtualBox.part2.rar</code>{% endraw %}, downloaded to where your terminal is pointing. Extracting will get you a .OVA file: {% raw %}<code>IE8 - WinXP.ova</code>{% endraw %}

{% figure_img 2 caption %}

Double-clicking the .OVA file will launch settings in VirtualBox. Set aside lots of RAM for your VM. Now when you launch Virtual box, it'll display all the VMs you have. Clicking on the IE8 - WinXP machine will get you Internet Explorer 8 on your computer.

{% figure_img 4 caption %}

Select "Tools" > "Developer Tools" to get to a very poor but still usable element inspector. One major flaw is that any change on a tag will not appear until you select onto another tag.

----------------------

### *Tip #2:* Keep all IE CSS isolated

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

Only older versions of IE recognize the above condtional commenting. Modern browsers will ignore it all.

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

Again, what we are concerned about is **speed of development.** Writing CSS for older versions of IE is tedious and frustrating. There are many debates whether it's better to use conditional commenting versus hacks, but there's one thing that cannot be doubted: debugging with conditional commenting is *faster.*

------------

### *Tip #3:* Set your page's content to a fixed with of 984 pixels (984px)

If your page is using a grid layout, or especially if you're using frameworks such as Bootstrap or Foundation, then you've most likely set {% raw %}<code>box-sizing: border-box;</code>{% endraw %}. This means on IE7 machines, all your floats are going to break because of the paddings and margins. Save a lot of headaches by letting go of liquid columns.

I've chosen 984px specifically as a matter of praticality: Most users on IE7 or IE8 machines are likely working with old computers and old, small monitors. The majority will either be using 1024×768 or 1280×1024, so debugging time will be much faster with one lowest-common-denominator size. (984px leaves from for the scrollbar)

#### Grid layout with 984px

{% raw %}
<table>
    <tbody>
        <tr>
            <td><strong>Columns</strong></td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>6</td>
            <td>12</td>
        </tr>
        <tr>
            <td><strong>Width</strong></td>
            <td>492</td>
            <td>328</td>
            <td>246</td>
            <td>164</td>
            <td>82</td>
        </tr>
    </tbody>
</table>
{% endraw %}

This does mean that for IE7, you will not be able to set column widths with percentages, but with actual pixel numbers.

----------

### *Tip #4:* Are CSS3 polyfills worth it? No.

**Forget about Modernizr, CSS3 PIE, Selectivr, and all other tools out there.**\* Of course they work, and they do exactly what they are supposed to do. But you will waste your time picking the right library, the pouring through forums or StackOverflow or Github repos to find the right packages, then developing for them. You will survive if your IE doesn't render CSS3.

* rounded corners - flat design is all the rage anyway
* drop shadows - it's not 2008 anymore
* gradients - just pick one color and go with it
* transitions - it will just tax IE8 browser resources anyway.

\****The only exception here is*** **[html5shiv](https://github.com/aFarkas/html5shiv)** ***but I believe it's overkill.*** The simplest approach is to {% raw %}<code>createElement</code>{% endraw %} all all your html5 elements and declare them as block elements in your CSS.

#### Insert this JS snippet into your {% raw %}<code><HEAD /></code>{% endraw %}

{% highlight javascript %}
var html5Elements = [
    'abbr', 'article', 'aside', 'bdi', 'data', 'datalist', 
    'figcaption', 'figure', 'footer', 'header', 'main', 'mark', 'meter', 
    'nav', 'output', 'progress', 'section', 'summary', 'time'];
    headElement = document.head || document.getElementsByTagName('head')[0],
    blockCSS = 'article,aside,figcaption,figure,footer,header,main,nav,section{display: block;}';
    insertStyle = document.createElement('style');
for (var i = 0; i < html5Elements.length; i++) {
    document.createElement(html5Elements[i]);
}
insertStyle.type = 'text/css';
if (insertStyle.styleSheet){
    insertStyle.styleSheet.cssText = blockCSS;
}
else {
    insertStyle.appendChild(document.createTextNode(blockCSS));
}
headElement.appendChild(insertStyle);
{% endhighlight %}

This JavaScript is also available as a [Gist on my Github](https://gist.github.com/herereadthis/f035f18a22b503d785a8) You can link to it by pasting: 

{% highlight html %}
<script src="https://gist.github.com/herereadthis/f035f18a22b503d785a8.js"></script>
{% endhighlight %}


-------------

### *Tip #5:* Tackle the low-hanging fruit by converting everything to pixels.

Wherever you use REMs or EMs, write the alternative CSS for IE in pixels. All your fonts and sizes will fit correctly afterwards. Hopefully, you've [set your page defaults to 1REM = 10PX](/code/mossflower/) to make your life easier. Here's an example written in LESS:

#### Original LESS
{% highlight CSS %}
[role="banner"] {
    height: 12rem;
    background-position: 0% 100%;

    .bellmaker_container {
        height: 12rem;
        margin: 0 auto;
    }
    h1 {
        padding-top: 3rem;
        font-weight: 300;
        font-size: 4rem;
        line-height: 8rem;
        text-transform: uppercase;

        @media @da_baseline {
            padding-left: 2rem;
        }
        @media @da_small {
            padding-left: (1 / 12) * @pw_small;
        }
        @media @da_medium {
            padding-left: 0;
        }
    }
}
{% endhighlight %}

#### supplement for IE7 and IE8
{% highlight CSS %}
.ie7_8 {
    [role="banner"] {
        height: 120px;

        .bellmaker_container {
            height: 120px;
        }
        h1 {
            padding-top: 30px;
            font-size: 20px;
            line-height: 80px;

            padding-left: 0;
        }
    }
}
{% endhighlight %}

Notice how the the media queries for the IE7/IE8 version went away? Since older Internet Explorer doesn't support media queries anyway, there's no need. Also, since content width has already been set to 984px, any calculations will be much simpler.

