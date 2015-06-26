var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates');


Metalsmith(__dirname)
    .use(markdown())
    .use(templates('handlebars'))
    .source('./src')
    .destination('../../dist/code')
    .build(function (err) {
        if (err) throw err;
    });
