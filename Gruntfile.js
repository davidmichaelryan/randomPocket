module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {   
            compile: {
                options: {
                    join: true
                },
                files: {
                    'build/js/login.js': 'public/coffee/login.coffee',
                    'build/js/countdown.js': 'public/coffee/countdown.coffee',
                    'app/routes.js': 'app/routes.coffee'
                }
            }
        },
        uglify: {
            build: {
                src: 'build/js/scripts.js',
                dest: 'build/js/scripts.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'public/images/',
                    src: 'public/images/*.{png,jpg,gif}',
                    dest: 'build/images'
                }]
            }
        },
        stylus: {
          compile: {
            files: {
              'build/css/styles.css': 'public/stylus/*.styl' // compile and concat into single file
            }
          }
        },
        watch: {
            files: ['public/coffee/*.coffee', 'public/images/*', 'public/stylus/global.styl', 'app/*.coffee'],
            tasks: ['stylus', 'coffee', 'imagemin', 'uglify']
        },
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['stylus', 'coffee', 'uglify', 'imagemin', 'watch']);
};