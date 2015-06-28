---
title:      	"Mossflower, a CSS global reset"
repo_title:     "<em>Mossflower</em>, a CSS global reset"
template:       page.hbs
created:       	2014-06-20
createdDT:     	2014-06-20
modified:		2014-06-23
modifiedDT:     2014-06-23
permalink:  	mossflower/
snippet:        <p>Mossflower is a global reset CSS utility for both LESS and SASS</p><ul><li>Both robust and bare-bones; you won't find yourself fighting against this utility</li><li>It is free to use and modify as you please.</li><li>Both <strong>LESS</strong> (.less) and <strong>SASS</strong> (.scss) versions are available.</li><li>It sets a single standard for sizing (REM) so you can do all sizing off 1REM = 10PX</li></ul>
description:	"Mossflower is a global reset CSS utility for both LESS and SASS to help you spin up new websites."
tags:       	css, less, sass
---

<ul id="github_badges" class="navmenu">
    <li><a href="http://badge.fury.io/js/mossflower" title="npm version">
            <img alt="npm version" src="https://badge.fury.io/js/mossflower.svg" />
        </a></li> 
    <li><a href="http://badge.fury.io/bo/mossflower" title="Bower version">
            <img alt="Bower version" src="https://badge.fury.io/bo/mossflower.svg" />
        </a></li> 
    <li><a href="http://travis-ci.org/herereadthis/mossflower" title="Build Status">
            <img alt="Build Status" src="https://travis-ci.org/herereadthis/mossflower.svg?branch=master" />
        </a></li> 
    <li><a href="https://david-dm.org/herereadthis/mossflower" title="devDependency Status">
            <img alt="devDependency Status" src="https://david-dm.org/herereadthis/mossflower/dev-status.svg" />
        </a></li> 
</ul>

### Build

```
$ git clone https://github.com/herereadthis/mossflower.git
$ cd mossflower/
$ npm install
$ npm run bower
$ npm run grunt
```

### CSS importing

##### Recommended (A): Add Mossflower as a Bower dependency

```
$ bower install --save mossflower
```

##### Recommended (B): Add Mossflower as a package

```
$ npm install --save mossflower
```

##### Alternative: Add Mossflower as a submodule

```
$ cd my_repo
$ git submodule add https://github.com/herereadthis/mossflower.git
$ git add mossflower .gitmodules
$ git commit -m "adds Mossflower submodule"
```

##### As LESS: Add to your imports

```CSS
@import "/PATH_TO/../mossflower/src/less/mossflower.less";
```

##### As SASS: Add to your imports

```CSS
@import "/PATH_TO/../mossflower/src/sass/mossflower.scss";
```

### What about Normalize CSS?

Mossflower was created as an alternative to Normalize because of several reasons:

1. Normalize doesn't use a consistent font sizing setup. Sometimes things are defined by percentages, sometimes by EM units and sometimes by pixels. Mossflower just uses REM units.
2. Normalize defines a lot of HTML elements that most developers won't be using anyway (such as the `small`, `figure`, and `h1`) and you'll end up writing overrides for it - which defeats the purpose of having a global reset.
3. Normalize also contains a lot of overrides to remove Mac/Apple styling on forms. It will probably confuse Mac users who notice their forms look different than what they're most accustomed to seeing.
