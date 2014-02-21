module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: ['gh-pages/README.md'],
      tasks: ['build']
    },
    copy: {
      main: {
        src: "gh-pages/README.md",
        dest: "gh-pages/_includes/index.md",
        options: {
          process: function(content, srcpath) {
            return content.replace(/^# .+$/gm, "");
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['copy']);
  grunt.registerTask('default', ['build', 'watch']);
};