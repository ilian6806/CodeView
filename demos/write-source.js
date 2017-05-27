/**
 * Demo purposes only
 */
(function () {

    // remove indentation
    var content = document.getElementById('source').innerHTML
        .split('\n')
        .map(function (row) {
            return row.replace(/^\s\s\s\s/, '');
        })
        .join('\n')
        .replace(/^\s/, '');

    new CodeView({
        selector: "#code",
        content: content
    });
}());