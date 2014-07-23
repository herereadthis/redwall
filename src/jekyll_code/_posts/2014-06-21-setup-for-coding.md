---
layout:         post
title:          "How to set up your computer for coding"
created:        2014-06-21
modified:		2014-07-17
permalink:      setup-for-coding/
description:    "It takes a lot to get a computer ready to begin writing code, including getting the right applications, packages, testing environments, etc. Here are all the best tools and things you need."
tags:           css, less, sass
image:
    - url: setup-for-coding-github-2048x1536.png
      caption: '#### Add SSH key to Github profile' 
      alt: 'Add SSH key to Github profile'
---

It takes a lot to get a computer ready to begin writing code, including getting the right applications, packages, testing environments, etc. Here are all the best tools and things you need.
<!--more-->

#### Notes:

1. The {% raw %}<code>$</code>{% endraw %} does not mean something you should copy, it's the prompt in your Terminal.
2. Any line that begins with {% raw %}<code>#</code>{% endraw %} is just a comment.
3. The instructions assume *you are using a Mac computer (OS X).* Most of the commands below will also work for Linux. But if you're using a Windows machine, then I really don't know what you're doing, sorry.
4. Some commands below require you to install globally. If your machine won't allow you because of permissions, preface the command with {% raw %}<code>sudo</code>{% endraw %}. For example:

{% highlight bash %}
# If this doesn't work:
$ npm install less -g
# try this
$ sudo npm install less -g
{% endhighlight %}

----------------

### Basic Installs

First, install xCode from the App Store. It gives you command line tools.

#### Install Homebrew, a package manager for OS X

{% highlight bash %}
$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
{% endhighlight %}

Basically, by installing Homebrew, "brew" is now a command in terminal. Check to see if the installation is working by running {% raw %}<code>brew doctor</code>{% endraw %}

#### Update Brew

{% highlight bash %}
# Check your version of Homebrew
$ brew doctor
# Update if needed
$ brew update
{% endhighlight %}

Once you have Homebrew, you can install pip, which is a tool for installing python packages.

#### Install Python & Pip

{% highlight bash %}
$ brew install python
$ curl -O http://python-distribute.org/distribute_setup.py
$ python distribute_setup.py
$ curl -O https://raw.github.com/pypa/pip/master/contrib/get-pip.py
$ python get-pip.py
{% endhighlight %}

#### Install important Pip packages

{% highlight bash %}
# Install virtualenv, used for creating isolated Python environments
$ pip install virtualenv
# Install Fabric, a command line tool for streamlining tasks and SSH
$ pip install Fabric
{% endhighlight %}

-------------

### Github Setup

Github is basically the de facto tool for maintaining, hosting, deploying, and sharing code. It's basically the social media for coders, but that would be an understatement. Before beginning, [create an account on Github](https://github.com/).

#### Install Git with Homebrew

{% highlight bash %}
$ brew install git
# Confirm your installation
$ git --version
# Use your credentials from your github account creation
$ git config --global user.name "GITHUB_USERNAME"
$ git config --global user.email "EMAIL@EXAMPLE.COM"
{% endhighlight %}

To allow your computer to talk to Github, you have to make an SSH Key. That is, every time you push or pull, your computer will authenticate automatically so you won't have to enter your username/password.

### Create SSH Key

{% highlight bash %}
$ cd ~/.ssh
# Check to see if you don't already have stuff there
# If you do, open the folder in Finder and move them to a backup
$ ls -lha
# Generate key
$ ssh-keygen -t rsa -C "EMAIL@EXAMPLE.COM"
Generating public/private rsa key pair.
# Press "Enter" here
Enter file in which to save the key (/Users/herereadthis/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
{% endhighlight %}

You will be prompted to created a password. Some people leave it blank, but I recommend you create one anyway, and make sure it is not the same password as the one to your github account. If the ssh key creation is successful, you'll see something like this:

{% highlight bash %}
Your identification has been saved in /home/demo/.ssh/id_rsa.
Your public key has been saved in /home/demo/.ssh/id_rsa.pub.
The key fingerprint is:
3f:ed:44:4a:27:38:93:67:8c:74:4e:4d:dd:0a:c6:35 EMAIL@EXAMPLE.COM
The key's randomart image is:
+--[ RSA 2048]----+
|      ++  .oo.   |
|      .  o.E     |
|        + .  o   |
|  . 0 = .        |
|    = + = .      |
|   E + = o       |
|    . o S o .    |
|     . ++        |
|                 |
+-----------------+
{% endhighlight %}

#### Copy your new SSH key

{% highlight bash %}
$ pbcopy < ~/.ssh/id_rsa.pub
{% endhighlight %}

{% figure_img 0 caption %}

Go to your Github profile (from the homepage, click "Edit Profile"), choose "SSH Keys," and click "Add SSH Key". Choose a name that you can remember and will identify the machine you're using. Then, in the text area, paste the key that you had previously copied. Success!

-------------

### Node Package Manager

NPM is another package manager for a lot of very useful Javascript tools. First, you will need to [install Node.js](http://nodejs.org), a JavaScript platform. 

#### Check if NPM install is successful

{% highlight bash %}
# check npm install version
$ npm -v
{% endhighlight %}

#### Install very useful node packages

{% highlight bash %}
# Install Grunt, an automated JavasScript task runner\
$ sudo npm install -g grunt
$ sudo npm install -g grunt-cli
# Bower, a package manager
$ sudo npm install -g bower
{% endhighlight %}

*For more information on Bower, read the tutorial,* ["How to manage 3rd party libraries using Bower"](/code/bower-how-to/).

#### Install optional node packages

{% highlight bash %}
# LESS, a CSS preprocessor
$ sudo npm install less -g
# Jekyll, a website/blogging platform also used on GitHub pages
$ sudo npm install generator-jekyllrb -g
{% endhighlight %}

-------------

### More to Come:

* Ruby, Ruby gems, applications (Sublime, VirtualBox), browser settings


