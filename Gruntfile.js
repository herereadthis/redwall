
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
        // compiles LESS file to minified CSS
        less: {
            // $ grunt bellmaker will only compile what is needed for bellmaker submodule
            bellmakerUncompressed: {
                options: {
                    paths: ["./bellmaker/src/less", "./bellmaker/src/demo/less"],
                    cleancss: false
                },
                files: {
                    "./bellmaker/src/main.css": "./bellmaker/src/less/main.less"
                }
            },
            // output both a minified a full version of CSS for bellmaker
            bellmakerMinified: {
                options: {
                    paths: ["./bellmaker/src/less", "./bellmaker/src/demo/less"],
                    cleancss: true
                },
                files: {
                    "./bellmaker/src/main.minified.css": "./bellmaker/src/less/main.less"
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
                    "./src/main.css": "./src/less/main.less"
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
                files: "**/*.html"
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('bellmaker', [
        'less:bellmakerUncompressed',
        'less:bellmakerMinified'
    ]);
    grunt.registerTask('default', [
        // 'uglify'
        'less',
        'watch'
    ]);
    grunt.registerTask('devserver', [
        // 'uglify'
        'connect:livereload'
    ]);
};