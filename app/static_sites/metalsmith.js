var Metalsmith    = require('metalsmith'),
    markdown      = require('metalsmith-markdown'),
    templates     = require('metalsmith-templates'),
    Handlebars    = require('handlebars'),
    collections   = require('metalsmith-collections'),
    permalinks    = require('metalsmith-permalinks'),
    metallic      = require('metalsmith-metallic'),
    dateFormatter = require('metalsmith-date-formatter'),
    fs            = require('fs');

Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbs').toString());

Metalsmith(__dirname)
    .use(dateFormatter({
        dates: [
            {
                key: 'created',
                format: 'DD MMMM YYYY'
            },
            {
                key: 'createdDT',
                format: 'YYYY-MM-DD'
            },
            {
                key: 'modified',
                format: 'DD MMMM YYYY'
            },
            {
                key: 'modifiedDT',
                format: 'YYYY-MM-DD'
            }
        ]
    }))
    .use(metallic())
    .use(collections({
        posts: {
            pattern: 'posts/*.md',
            sortBy: 'modified'
        }
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ':permalink'
    }))
    .use(templates('handlebars'))
    .source('./src')
    .destination('../../dist/code')
    .build(function (err) {
        if (err) throw err;
    });

