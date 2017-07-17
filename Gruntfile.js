/**
 * Created by Administrator on 2017/4/13.
 */

module.exports = function ( grunt ) {
    "use strict";
    grunt.initConfig( {
        browserify : {
            debug : {
                files : {
                    'public/bundle.js' : 'public/main.js'
                },
                options : {
                    transform : [ 'brfs' ],
                    debug : true
                }
            }
        },
        jshint : {
            debug : [ 'public/**/*.js', '!public/assets' ]
        },
        watch : {
            rebuild : {
                tasks : [ 'browserify:debug' ],
                files : [ 'public/**/*.js', 'public/**/*.html' ]
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-browserify' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    grunt.registerTask( 'build:debug', [ 'browserify:debug' ] );

    grunt.registerTask( 'build:watch', [ 'watch:rebuild' ] );

};
