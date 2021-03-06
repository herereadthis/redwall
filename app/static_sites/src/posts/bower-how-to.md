---
title:          "How to manage 3rd party libraries using Bower"
repo_title:     "How to manage 3rd party libraries using Bower"
template:       page.hbs
created:        2014-06-19
createdDT:      2014-06-19
modified:       2014-07-15
modifiedDT:     2014-07-15
permalink:      bower-how-to/
snippet:        <p>Nearly every project requires third party libraries and frameworks (e.g. jQuery, Bootstrap), and it can get complicated keeping them updated and maintained. Fortunately, there's <a href="http://bower.io">Bower</a>, a package manager that will take registered components and organize them as dependencies.</p>
description:    "Bower is a package manager that will help you keep all your 3rd party libraries (e.g. jQuery) updated and maintained."
tags:           bower, github
---

### Setup

#### Install Bower using npm

```bash
$ npm install -g bower
```

#### Make sure that your project is using npm

```bash
$ cd myproject/
$ npm install
```

All bower components will be installed by default at {% raw %}<code>./bower_components/</code>{% endraw %}. you can change this by creating a {% raw %}<code>.bowerrc</code>{% endraw %} file at root level. For example, I like to put my dependencies in {% raw %}<code>./src/components</code>{% endraw %}

#### Custom components directory (./.bowerrc)

```javascript
{
  "directory": "src/components"
}
```

#### Add a component, such as jQuery

```bash
$ bower install jquery
```

#### If you don't know the name of your component you can search for it instead

```bash
$ bower search [NAME]
```

------------------------

### Initialize Bower

```bash
$ bower init
```

It will ask you for a bunch of options, enter in information as needed, or just keep hitting &lt;ENTER&gt; to get the default answers.

```bash
[?] name: <myproject>
[?] version: <0.0.0>
[?] description: 
[?] main file: 
[?] what types of modules does this package expose? 
[?] keywords: 
[?] authors: <John Smith>
[?] license: <MIT>
[?] homepage: 
[?] set currently installed components as dependencies? <Yes>
[?] add commonly ignored files to ignore list? <Yes>
[?] would you like to mark this package as private which prevents it from being accidentally published to the registry? <Yes>
```

It will generate a bower.json file for your approval

```javascript
{
  name: 'my_project',
  version: '0.0.0',
  authors: [
    'John Smith <john.smith@example.com>'
  ],
  license: 'MIT',
  ignore: [
    '**/.*',
    'node_modules',
    'bower_components',
    'test',
    'tests'
  ],
  "dependencies": {
    "jquery": "~2.1.1"
  }
}
```

Notice that it will show jQuery, because you have installed it as a component before initializing Bower.

```javascript
"dependencies": {
    "jquery": "~2.1.1"
}
```

This means that the current version of jQuery for your project is 2.1.1. This version number comes from the [jQuery Github release tag](https://github.com/jquery/jquery/releases/tag/2.1.1). If you ever want to change the version of jQuery in the future, go to your bower.json file and change the version number.

```bash
# Install all dependencies based on bower.json
$ bower install
# Install a new dependency after bower.json has been created
$ bower install [name] --save
```


By running the above command, the component will be added, and your bower.json file will be updated accordingly.

#### Update dependencies to latest version

```bash
$ bower update
```

------------------------

### bower.json Specifications

#### "resolutions" - dealing with package conflicts

Sometimes you will have packages that depend on other packages at different versions, and it will ask you to choose. For example,

```
Unable to find a suitable version for jquery, please choose one:
    1) jquery#~1.7 which resolved to 1.7.2 and is requird by typeahead.js#0.10.4
    2) jquery#~1.9.1 which resolved to 1.9.1 and is required by bootstrap#3.0.3
    3) jquery#>=1.7 which resolved to 2.1.1 and is required by mocha.events#0.0.3

Prefix the choice with ! to persist it to bower.json

[?] Answer:
```

This gets annoying and you can type something like {% raw %}<code>!3</code>{% endraw %} to make it always go with 2.1.1. Your bower.json file will be updated with a [resolution](https://github.com/bower/bower.json-spec#resolutions):

```javascript
"resolutions": {
    "jquery": "2.1.1"
},
```

You can always be proactive and add resolutions before they are needed as well.

------------------------

### Registering a Bower Package

Before you begin (assuming your project is hosted on Github),

* Initialize a bower.json file, and set the version number to the next release you want it to be. The release tag comes in the form of #.#.#, where:
  * the first number is a major change that renders previous versions obsolete,
  * the second number indicates a new feature, and
  * the third number is a small patch.
* make sure you modify {% raw %}<code>"ignore": [...]</code>{% endraw %} part of bower.json so that only essential items necessary get copied
  * For example, there probably is no need for the package to have build or .tmp files, or demo or example pages
* Commit and push the new bower.json file, along with any new changes.
* Cut a release on Github
  * You can do from a terminal, but it's easier to go to https://github.com/[MYNAME]/[MYPROJECT]/releases
  * Name the "Tag version" and the "Release title" the same as your version number

#### Register in terminal

```bash
$ bower register [app name] [git endpoint]
```

#### Example

```bash
$ bower register MYPROJECT git://github.com/MYNAME/MYPROJECT.git
[?] Registering a package will make it installable via the registry (https://bower.herokuapp.com), continue? Yes
bower register      git://github.com/MYNAME/MYPROJECT.git
Package MYPROJECT registered successfully!
```



