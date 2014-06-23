
// The "wrapper" function
module.exports = function(grunt) {
    // Do grunt-related things in here
    // Project configuration.
    grunt.initConfig({
        // imports the JSON metadata stored in package.json
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            src: './src',
            build: './build'
        },
        bowercopy: {
            build: {
                options: {
                    destPrefix: '<%= paths.build %>/js'
                },
                files: {
                    'jquery.js': 'jquery/dist/jquery.min.js',
                    'require.js': 'requirejs/require.js'
                }
            }
        },
        connect: {
            options: {
                livereload: 35729,
                port: 9000,
                // base: 'www-root',
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    passphrase: 'grunt',
                    open: 'http://localhost:9000',
                    // open: true,
                    base: '<%= paths.src %>/index.html'
                }
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= paths.src %>',
                    dest: '<%= paths.build %>',
                    src: [
                        '404.html',
                        'xml/{,*/}*.*'
                    ]
                }]
            }
        },
        jekyll: {
            build: {
                options: {
                    config: './src/jekyll_code/_config.yml',
                    src: './src/jekyll_code',
                    dest: './code'
                }
            }
        },
        // compiles LESS file to minified CSS
        less: {
            // 'less:redwall' will pull bellmaker's CSS into redwall CSS
            redwall: {
                options: {
                    paths: ["<%= paths.src %>/less"],
                    // yuicompress: true,
                    // compress: true,
                    cleancss: true
                },
                files: {
                    "./build/css/code.css": "./src/less/code/code.less",
                    "./build/css/main.css": "./src/less/main.less",
                    "./build/css/404.css": "./src/less/404.less"
                }
            }
        },
        requirejs: {
            build: {
                options: {
                    baseUrl: "<%= paths.src %>/js/",
                    mainConfigFile: "<%= paths.src %>/js/main.js",
                    name: "main",
                    out: "<%= paths.build %>/js/main.js"
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            // runs less task when any less files change
            build: {
                files: [
                    "<%= paths.src %>/404.html",
                    "./src/xml/*",
                    "./src/xml/*/*"
                ],
                tasks: ["copy:build"] 
            },
            less: {
                files: ["./src/less/*", "./src/less/*/*"],
                tasks: ["less"]
            },
            html: {
                files: ['**/*.html'],
                tasks: ["xmlpoke:updateLastModified"]
            },
            jekyll: {
                files: ["./src/jekyll_code/*", "./src/jekyll_code/*/*"],
                tasks: ['jekyll']
            },
            js: {
                files: ['./src/js/*'],
                tasks: ['requirejs']
            }
        },
        xmlpoke: {
            updateLastModified: {
                options: {
                    replacements: [{
                        xpath: '/urlset/url/lastmod',
                        value: function newDate() {
                            var today = new Date(), yyyy, mm, dd;
                            yyyy = today.getFullYear();
                            mm = today.getMonth() + 1;
                            dd = today.getDate();
                            if (mm < 10) {mm = '0' + mm;} 
                            if (dd < 10) {dd = '0' + dd;}
                            return yyyy + '-' + mm + '-' + dd;
                        }
                    }]
                },
                files: {
                    '<%= paths.src %>/xml/sitemap.xml': '<%= paths.src %>/xml/sitemap.xml'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-xmlpoke');

    grunt.registerTask('default', [
        // 'uglify'
        'bowercopy',
        'copy',
        'less',
        'jekyll',
        'requirejs',
        'watch'
    ]);
    grunt.registerTask('devserver', [
        // 'uglify'
        'connect:livereload'
    ]);
};