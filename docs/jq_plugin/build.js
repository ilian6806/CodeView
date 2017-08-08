
var fs = require('fs');

const TEMPLATE = 'docs/jq_plugin/jquery.code-view.js';
const SOURCE = 'docs/src/jquery.code-view.js';
const CORE = 'docs/src/code-view.js';

function log(m) {
    console.log('[jq_plugin]: ' + m);
}

log('Start building...');
log(TEMPLATE + ' -> ' + SOURCE);

fs.readFile(TEMPLATE, 'utf8', function (err, template) {

    if (err) {
        return console.log(err);
    }

    fs.readFile(CORE, 'utf8', function (err, core) {

        if (err) {
            return console.log(err);
        }

        var result = template.replace('$&', core);

        fs.writeFile(SOURCE, result, 'utf8', function (err) {

            if (err) {
                return console.log(err);
            }
            log('Building finished.');
        });
    });
});