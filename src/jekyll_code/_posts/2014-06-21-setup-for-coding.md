---
layout:     post
title:      "How to Set Up Your Computer for Coding"
date:       2014-06-22 20:30:10
permalink:  setup-for-coding/
tags:       css, less, sass
---

It takes a lot to get a computer ready to begin writing code, including getting the right applications, packages, testing environments, etc. Here are all the best tools and things you need.

<!--more-->

*Note: the {% raw %}<code>$</code>{% endraw %} does not mean something you should copy, it's the prompt in your Terminal.*

*Also note: the instructions assume* ***you are using a Mac computer (OS X)*** *Most of the commands below will also work for Linux. But if you're using a Windows machine, then I really don't know what you're doing, sorry.*

### Basic Installs

First, install xCode from the App Store. It gives you command line tools.

#### Install Homebrew, a package manager for OS X

{% raw %}
<div class="highlight">
    <pre>
<code>$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"</code>
    </pre>
</div>
{% endraw %}

Basically, by installing Homebrew, "brew" is now a command in terminal. Check to see if the installation is working by running {% raw %}<code>brew doctor</code>{% endraw %}

#### Update Brew

{% highlight html %}
$ brew update
{% endhighlight %}

Once you have Homebrew, you can isntall pip, which is a tool for installing python packages.

#### Install Python & Pip

{% highlight html %}
$ brew install python
$ curl -O http://python-distribute.org/distribute_setup.py
$ python distribute_setup.py
$ curl -O https://raw.github.com/pypa/pip/master/contrib/get-pip.py
$ python get-pip.py
{% endhighlight %}

-------------

### Github Setup

Github is basically the de facto tool for maintaining, hosting, deploying, and sharing code. It's basically the social media for coders, but that would be an understatement. Before beginning, [create an account on Github](https://github.com/).

-------------

### Node Package Manager

NPM is another package manager for a lot of very useful Javascript tools.

