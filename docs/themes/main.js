(function () {

    function getJsonFromUrl() {
        if (! location.search) {
            return {};
        }
        var query = location.search.substr(1);
        var result = {};
        query.split('&').forEach(function(part) {
            var item = part.split('=');
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }


    var theme = getJsonFromUrl()['th'];

    if (theme) {
        $('<link>', { 
            href: 'src/themes/' + theme + '.css',
            rel: 'stylesheet',
            onload: '$("#main-content").show()'
        }).appendTo('head');
    }

    $('#main-content').hide().codeView([
        '/**',
        ' * ' + theme,
        ' */',
        'function getJsonFromUrl() {',
        '    if (! location.search) {',
        '        return {};',
        '    }',
        '    var query = location.search.substr(1);',
        '    var result = {};',
        '    query.split(\'&\').forEach(function(part) {',
        '        var item = part.split(\'=\');',
        '        result[item[0]] = decodeURIComponent(item[1]);',
        '    });',
        '    return result;',
        '}'
    ]);


}());