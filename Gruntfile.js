module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,
        uglify: {
            src: {
                files: {
                    'docs/src/code-view.min.js': ['docs/src/code-view.js'],
                    'docs/src/jquery.code-view.min.js': ['docs/src/jquery.code-view.js']
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
        run: {
            buildPlugin: {
                exec: 'node docs/jq_plugin/build.js',
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
                    cwd: 'docs/src/themes/partials/',
                    src: ['*.scss'],
                    dest: 'docs/src/themes/',
                    ext: '.css'
                }]
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'docs/src',
                src: '**',
                dest: 'src/'
            }
        },
        watch: {
            // scripts: {
            //     files: ['docs/src/code-view.js', 'docs/src/jquery.code-view.js'],
            //     tasks: ['uglify'],
            // },
            plugin: {
                files: ['docs/jq_plugin/jquery.code-view.js'],
                tasks: ['run:buildPlugin'],
            },
            sass: {
                files: 'docs/src/**/*.scss',
                tasks: ['sass'],
            },
        },
    });

    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', [
        'run:buildPlugin',
        'uglify',
        'sass',
        'copy'
    ]);
};