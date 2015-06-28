var Metalsmith    = require('metalsmith'),
    markdown      = require('metalsmith-markdown'),
    templates     = require('metalsmith-templates'),
    Handlebars    = require('handlebars'),
    collections   = require('metalsmith-collections'),
    permalinks    = require('metalsmith-permalinks'),
    metallic      = require('metalsmith-metallic'),
    dateFormatter = require('metalsmith-date-formatter'),
    fs            = require('fs');

Handlebars.registerPartial('head_boilerplate',
    fs.readFileSync(__dirname + '/templates/partials/head_boilerplate.hbs').toString());
Handlebars.registerPartial('header',
    fs.readFileSync(__dirname + '/templates/partials/header.hbs').toString());
Handlebars.registerPartial('footer',
    fs.readFileSync(__dirname + '/templates/partials/footer.hbs').toString());
Handlebars.registerPartial('icon_facebook',
    fs.readFileSync(__dirname + '/templates/partials/icon_facebook.hbs').toString());
Handlebars.registerPartial('icon_twitter',
    fs.readFileSync(__dirname + '/templates/partials/icon_twitter.hbs').toString());
Handlebars.registerPartial('icon_github',
    fs.readFileSync(__dirname + '/templates/partials/icon_github.hbs').toString());
Handlebars.registerPartial('icon_googleplus',
    fs.readFileSync(__dirname + '/templates/partials/icon_googleplus.hbs').toString());
Handlebars.registerPartial('icon_pinterest',
    fs.readFileSync(__dirname + '/templates/partials/icon_pinterest.hbs').toString());
Handlebars.registerPartial('icon_vimeo',
    fs.readFileSync(__dirname + '/templates/partials/icon_vimeo.hbs').toString());


Metalsmith(__dirname)
    .metadata({
        siteUrl: 'http://herereadthis.com',
        baseUrl: '/code/',
        siteTitle: 'Here, Read this Code'
    })
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
            sortBy: 'modified',
            reverse: true
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

