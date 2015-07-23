module.exports = function(grunt) {

  var fs = require('fs');

  grunt.loadNpmTasks('grunt-githooks');

  // insert git hook into local repo.
  grunt.initConfig({
    githooks: {
      all: {
        options: {
          dest: fs.readFileSync('.git'),
          template: 'validate.js'
        },
        'pre-commit': 'test'
      }
    }
  });

};
