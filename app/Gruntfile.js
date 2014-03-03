
module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['models/**/*.js', 'controllers/**/*.js', 'routes/**/*.js', 'config/**/*.js']
    }

  })


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint:all']);
}