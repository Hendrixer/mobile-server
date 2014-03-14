
module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        node: true,
        globals: {
          console: true
        },
        reporter: require('jshint-stylish')
      },
      all: ['app/models/**/*.js', 'app/controllers/**/*.js', 'app/routes/**/*.js', 'app/config/**/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['app/spec/**/*.js']
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('test', ['mochaTest:test']);
  grunt.registerTask('default', ['jshint:all']);
};