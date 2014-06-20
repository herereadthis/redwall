---
layout: post
title:  "How to manage 3rd party libraries using Bower"
date:   2014-06-19 20:30:10
---

Nearly every project requires third party libraries and frameworks (e.g. jQuery, Bootstrap), and it can get complicated keeping them updated and maintained. Fortunately, there's [Bower](http://bower.io), a package manager that will take registered components and organize them as depencies.


### Setup

Install Bower using npm

{% highlight html %}
$ npm install -g bower
{% endhighlight %}

Make sure that your project is using npm

{% highlight html %}
$ cd my_project/
$ npm install
{% endhighlight %}