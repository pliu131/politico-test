module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
        ],
        dist: {
          src: 'css/*.css'
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          require: 'susy'
        },
        files: {
          'css/main.css': 'css/main.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          livereload: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
        options: {
          interrupt: true
        }
      },
      reload: {
        files: [
          "*.html",
          "js/*.js"
        ]
      },
      post: {
        files: 'css/*.css',
        tasks: ['postcss']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-postcss');


  grunt.registerTask('default', ['sass', 'connect', 'watch']);

};