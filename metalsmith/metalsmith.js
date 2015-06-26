var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates');


Metalsmith(__dirname)
    .use(markdown())
    .use(templates('handlebars'))
    .source('./src')
    .destination('../build')
    .build(function (err) {
        if (err) throw err;
    });
