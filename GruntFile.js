module.exports = function (grunt) {
    // Prepare our gtx wrapper
    var gtx = require('gruntfile-gtx').wrap(grunt);

    // Load our npm task dependencies
    gtx.loadNpm([
        'grunt-typescript',
        'grunt-tslint'
    ]);

    // Load up our configuration
    gtx.config({
        typescript: {
            cats: {
                src: [
                    "src/typings/**/*.ts",
                    require('./build/source-deps/main.js')
                ],
                dest: "lib/main.js",
                options: {
                    "target": "es5",
                    "sourceMap": true
                }
            },
            uml: {
                src: [
                    "src/typings/**/*.ts",
                    require('./build/source-deps/uml.js')
                ],
                dest: "lib/uml.js",
                options: {
                    "target": "es5",
                    "sourceMap": true
                }
            },
            worker: {
                src: [
                    "src/typings/**/*.ts",
                    require('./build/source-deps/tsworker.js')
                ],
                dest: "lib/tsworker.js",
                options: {
                    "target": "es5",
                    "sourceMap": true
                }
            }
        },
        tslint: {
            options: {
                configuration: gtx.readJSON("build/tslint.json")
            },
            files: {
                src: 'src/ts/**/*.ts'
            }
        }
    });

    // Define our usable tasks
    gtx.alias('default', ['build', 'tslint']);



    gtx.alias('build', gtx.parallel([
        'typescript:cats',
        'typescript:uml',
        'typescript:worker'
    ]));

    // Initialize grunt
    gtx.finalise();
};