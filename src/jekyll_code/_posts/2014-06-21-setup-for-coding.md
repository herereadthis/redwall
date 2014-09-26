---
layout:         post
title:          "How to set up your computer for coding"
created:        2014-06-21
modified:		2014-09-25
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

However, don't think of sudo a easy way out. Sudo should always be a last resort

----------------

### Basic Installs

First **[install iTerm](http://iterm.sourceforge.net/downloads.shtml)**, a terminal app to use the command line in OSX.

Next, **[install Xcode](https://developer.apple.com/xcode/downloads/)** from the App Store.

{% highlight bash %}
# test Xcode installation
$ xcode-select -p
# you should see /Applications/Xcode.app/Contents/Developer
{% endhighlight %}

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

#### Install Ruby, an interpreted object-oriented scripting language

{% highlight bash %}
# Check to see if you already have Ruby
$ ruby --version
# Install Ruby if you don't have it
$ brew install ruby
{% endhighlight %}

Once you have Homebrew, you can install pip, which is a tool for installing python packages.

#### Install Python & Pip

{% highlight bash %}
# You should already have Python try:
$ which python
# if you don't see anything then install with homebrew
$ brew install python
$ sudo easy_install pip
{% endhighlight %}

<!--
	$ curl -O http://python-distribute.org/distribute_setup.py
$ python distribute_setup.py
$ curl -O https://raw.github.com/pypa/pip/master/contrib/get-pip.py
$ python get-pip.py
-->

#### Install important Pip packages

{% highlight bash %}
# Install virtualenv, used for creating isolated Python environments
$ pip install virtualenv
$ pip install virtualenvwrapper
# to use virtualenv tools, use:
$ source /usr/local/bin/virtualenvwrapper.sh
# Install Fabric, a command line tool for streamlining tasks and SSH
$ pip install Fabric
# Install Grip: "GitHub Readme Instant Preview"
$ pip install grip
# then to preview a file, run $ grip FILENAME.md
{% endhighlight %}

#### Install Django, a web framework for python

{% highlight bash %}
$ pip install django
# confirm your Django install
$ python -c "import django; print(django.get_version())"
# CD to where you keep your repositories
$ cd [PATH_TO]/mysites/
# Attempt to run django-admin to create your new project
$ django-admin startproject my_django_app
# It may not work (-bash: django-admin: command not found)
# In which case, symlink your django-admin
# your path to python may be different
$ sudo ln -s /library/Python/2.7/site-packages/django/bin/django-admin.py /usr/local/bin/django-admin.py
$ django-admin.py startproject my_django_app
# confirm installation, you should see a page at 127.0.0.1:8000/
$ cd my_django_app
$ python manage.py runserver
# create a database
$ python manage.py syncdb
{% endhighlight %}

<!--
$ python manage.py startapp polls
-->
<!-- https://code.djangoproject.com/wiki/InstallationPitfalls -->

-------------

### Github Setup

Github is basically the de facto tool for maintaining, hosting, deploying, and sharing code. It's basically the social media for coders, but that would be an understatement. Before beginning, [create an account on Github](https://github.com/).

#### Install Git with Homebrew

{% highlight bash %}
$ brew install git
# Confirm your installation
$ git --version
# Use your own credentials from your github account creation
$ git config --global user.name "John Smith"
$ git config --global user.email EMAIL@EXAMPLE.COM
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

NPM is another package manager for a lot of very useful Javascript tools. Use Homebrew.

{% highlight bash %}
$ brew install node
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

### Productivity Shortcuts

#### Useful Terminal commands

Below are lesser-known terminal commands that are good to know

{% highlight bash %}
# Display disc usage information (-h means "human readable")
$ df -h
# Display a summary of your current directory (-s means "summary")
$ du -sh *
{% endhighlight %}

#### Add Bash Aliases

Locate a file at {% raw %}<code>~/.bash_profile</code>{% endraw %} and add the following lines. Basically each "alias" is a shortcut for writing much longer commands. For example, with the following alias, you can just type {% raw %}<code>cfr</code>{% endraw %} to fetch and reset the master branch of your repository.

{% highlight bash %}
# go up one directory level
alias ..='cd ../' 
# go up two directory levels
alias ...='cd ../../' 
# go to Desktop
alias desk='cd ~/Desktop/'
# make sure you git branch is up-to-date
alias cfr='git checkout master;git fetch --all;git reset --hard origin/master'
# if you keep all your repos in one spot, get to by typing "repo REPO_NAME"
repo() {
	cd MY_GITHUB_FOLDER_PATH/$1
}
# create a directory and move into that directory: "mcd DIRECTORY_NAME"
mcd() {
	mkdir -p $1
	cd $1
}
{% endhighlight %}

-------------

### More to Come:

* Ruby, Ruby gems, applications (Sublime, VirtualBox), browser settings


