
// The "wrapper" function
module.exports = function(grunt) {
    // Do grunt-related things in here
    // Project configuration.
    grunt.initConfig({
        // imports the JSON metadata stored in package.json
        pkg: grunt.file.readJSON('package.json'),
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
            // $ grunt bellmaker will only compile what is needed for bellmaker submodule
            bellmakerUncompressed: {
                options: {
                    paths: ["./bellmaker/src/less", "./bellmaker/src/demo/less"],
                    cleancss: false
                },
                files: {
                    "./bellmaker/src/css/main.less.css": "./bellmaker/src/less/main.less"
                }
            },
            // output both a minified a full version of CSS for bellmaker
            bellmakerMinified: {
                options: {
                    paths: ["./bellmaker/src/less", "./bellmaker/src/demo/less"],
                    cleancss: true
                },
                files: {
                    "./bellmaker/src/css/main.less-minified.css": "./bellmaker/src/less/main.less"
                }
            },
            // 'less:redwall' will pull bellmaker's CSS into redwall CSS
            redwall: {
                options: {
                    paths: ["./src/less", "./bellmaker/src/less"],
                    // yuicompress: true,
                    // compress: true,
                    cleancss: true
                },
                files: {
                    "./src/main.css": "./src/less/main.less",
                    "./src/404.css": "./src/less/404.less"
                }
            }
        },
        sass: {
            minifiedSass: {
                options: {
                    style: 'compressed',
                    precision: 4
                },
                files: {
                    "./bellmaker/src/css/main.sass-minified.css": "./bellmaker/src/sass/main.scss"
                }
            },
            uncompressedSass: {
                options: {
                    style: 'expanded',
                    precision: 4
                },
                files: {
                    "./bellmaker/src/css/main.sass.css": "./bellmaker/src/sass/main.scss"
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
                files: ["./src/less/*", "./bellmaker/src/less/*", "./bellmaker/src/demo/less/*"],
                tasks: ["less"]
            },
            html: {
                files: ['**/*.html'],
                tasks: ["xmlpoke:updateLastModified"]
            },
            sass: {
                files: ["./bellmaker/src/sass/*", "./bellmaker/src/demo/sass/*"],
                tasks: ['sass']  
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
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-xmlpoke');

    grunt.registerTask('bellmaker', [
        'less:bellmakerUncompressed',
        'less:bellmakerMinified'
    ]);
    grunt.registerTask('sitemap', [
        // 'uglify'
        'xmlpoke'
    ]);
    grunt.registerTask('default', [
        // 'uglify'
        'less',
        'sass',
        'watch'
    ]);
    grunt.registerTask('doJekyll', [
        // 'uglify'
        'jekyll'
    ]);
    grunt.registerTask('makeSass', [
        'sass'
    ]);
    grunt.registerTask('devserver', [
        // 'uglify'
        'connect:livereload'
    ]);
};