var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates'),
    Handlebars  = require('handlebars'),
    fs          = require('fs');

Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbs').toString());

Metalsmith(__dirname)
    .use(markdown())
    .use(templates('handlebars'))
    .source('./src')
    .destination('../../dist/code')
    .build(function (err) {
        if (err) throw err;
    });

