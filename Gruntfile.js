module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,
        uglify: {
            src: {
                files: {
                    'src/code-view.min.js': ['src/code-view.js'],
                    'src/jquery.code-view.min.js': ['src/jquery.code-view.js']
                },
                options: {
                    maxLineLen: 0,
                    indentLevel: 0,
                    beautify: false,
                    mangle: false,
                    wrap: true,
                    banner: '/**\n' +
                            ' * Code visualizer for web\n' +
                            ' * Autor: Ilian Iliev\n' +
                            ' * \n' +
                            ' * Date: <%= grunt.template.today("dd-mm-yyyy") %>\n' +
                            ' */\n'
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'src/themes/partials/',
                    src: ['**/*.scss'],
                    dest: 'src/themes/',
                    ext: '.css'
                }]
            }
        },
        copy: {
            main: {
                expand: true,
                src: 'src/**/*',
                dest: 'docs'
            }
        },
        watch: {
            scripts: {
                files: 'src/**/*',
                tasks: ['uglify', 'sass', 'copy'],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['uglify', 'sass', 'copy']);
};