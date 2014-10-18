'use strict';
var _ = require('lodash'),
    fs = require('../lib/fs-helper'),
    path = require('path');
module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask('idl', '{%= description %}', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.

      var dest = f.dest;
      var lang = f.lang;

      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      var translate = require('..');

      var projMap = {};
      projMap[lang] = dest;
      var fileMap = translate(src, projMap);
    
      // Handle options.
      // Write the destination file.
      _.each(fileMap, function (i, filename) {
        fs.writeFileSync(path.resolve(filename), grunt.util.normalizelf(fileMap[filename]));
        grunt.log.writeln('File "' + filename + '" created.');
      });
      


      // Print a success message.
      
    });
  });
}
