
// The "wrapper" function
module.exports = function(grunt) {
    // Do grunt-related things in here
    // Project configuration.
    grunt.initConfig({
        // imports the JSON metadata stored in package.json
        pkg: grunt.file.readJSON('package.json'),
        bowercopy: {
            build: {
                options: {
                    destPrefix: 'build/js'
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
                    base: './src/index.html'
                }
            }
        },
        jekyll: {
            dev: {
                src: "./bellmaker/README.md",
                dest: './code/'
            }
        },
        // compiles LESS file to minified CSS
        less: {
            // 'less:redwall' will pull bellmaker's CSS into redwall CSS
            redwall: {
                options: {
                    paths: ["./src/less"],
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
                    baseUrl: "src/js/",
                    mainConfigFile: "src/js/main.js",
                    name: "main",
                    out: "build/js/main.js"
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
            less: {
                files: ["./src/less/*", "./src/less/*/*"],
                tasks: ["less"]
            },
            html: {
                files: ['**/*.html'],
                tasks: ["xmlpoke:updateLastModified"]
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
                    './src/xml/sitemap.xml': './src/xml/sitemap.xml'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-connect');
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
        'less',
        'requirejs',
        'watch'
    ]);
    grunt.registerTask('devserver', [
        // 'uglify'
        'connect:livereload'
    ]);
};