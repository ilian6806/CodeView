
(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define('CodeView', factory(root));
    } else if ( typeof exports === 'object' ) {
        module.exports = factory(root);
    } else {
        root.CodeView = factory(root);
    }
})(this, function (root) {

    'use strict';

    var MAIN_ELEMENT_CLASS = 'code-view';
    var NO_WRAP_CLASS = 'code-view-no-wrap';

    var viewDefaults = {
        noWrap: true
    };


    /**
     * Main code parsing logic
     */
    var codeParser = (function () {

        var regEx = {
            tab: /\t/g,
            firstNonSpace: /(?=\S)[^\\]/,
            commentStart: /[\/|\*|\#]/,
            codeElements: [
                /([\"\'])(.*?(?:(\\"|\\').*?\3.*?)*?)\1/g,
                /var|this|window|document|body|function/g,
                /new|return|throw|goto|if|else|elseif===/g,
                /undefined|null|true|false/g,
            ]
        };

        function indent(str) {

            // tabs to spaces
            str = str.replace(regEx.tab, '    ');

            // leading spaces to &nbsp;
            var firstNonSpace = regEx.firstNonSpace.exec(str);

            if (firstNonSpace && firstNonSpace.index) {
                var spaces = '';
                for (var i = 0; i < firstNonSpace.index; i++) {
                    spaces += '&nbsp;';
                }
                str = spaces + str.slice(firstNonSpace.index)
            }

            return str;
        }

        function parse(str) {

            // all code elements
            for (var i = 0, len = regEx.codeElements.length; i < len; i++) {
                str = str.replace(regEx.codeElements[i], '<span class="code-view-color-' + (i + 1) + '">$&</span>');
            }

            return indent(str);
        }

        function isComment(str) {
            var firstNonSpace = regEx.firstNonSpace.exec(str);
            if (firstNonSpace && firstNonSpace[0]) {
                return regEx.commentStart.test(firstNonSpace);
            }
            return false;
        }

        return {
            isComment: isComment,
            indent: indent,
            parse: parse
        };
    })();


    /**
     * Basic type checker
     */
    var is = {
        number: function (p) {
            return (typeof p).toLowerCase() === 'number';
        },
        string: function (p) {
            return (typeof p).toLowerCase() === 'string';
        },
        array: function (p) {
            return p instanceof Array;
        },
        object: function (p) {
            return (typeof p).toLowerCase() === 'object' && p.constructor == Object;
        },
        func: function (p) {
            return !!(p && p.constructor && p.call && p.apply);
        },
        htmlElement: function (p) {
            return p instanceof HTMLElement;
        },
        undefined: function (p) {
            return [undefined, null, 'undefined', 'null'].indexOf(p) > -1;
        },
        not: {}
    };

    // add negative checks
    for (var type in is) {
        if (is.hasOwnProperty(type) && type != 'not') {
            is.not[type] = new Function('p', 'return ! (' + is[type] + ')(p)');
        }
    }


    /**
     * Options resolver
     */
    function Options(options, defaults) {

        var opt = (options && is.object(options)) ? options : {};
        var def = (defaults && is.object(defaults)) ? defaults : {};

        for (var prop in opt) {
            if (opt.hasOwnProperty(prop)) {
                this[prop] = opt[prop];
            }
        }

        for (var prop in def) {
            if (def.hasOwnProperty(prop) && !this.hasOwnProperty(prop)) {
                this[prop] = def[prop];
            }
        }
    }


    /**
     * XHR
     */
    function getXHR() {

        var xhr = null;

        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
            try {
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                try {
                  xhr = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (e) {}
            }
        }

        return xhr;
    }

    function readFile(url, success, error) {

        var xhr = getXHR();

        xhr.onload = function() {
            success.call(this, xhr.responseText);
        };

        xhr.onerror = function() {
            error.call(this, new HttpException('Network request failed.'));
        };

        xhr.ontimeout = function() {
            error.call(this, new HttpException('The request has timed out.'));
        };

        xhr.open('GET', url, true);
        xhr.send(null);
    }

    
    /**
     * Exceptions
     */
    function showError(e) {
        console.error(
            '[CODE VIEW]' +
            (
                (e.constructor && e.constructor.name)
                    ? '[' + e.constructor.name + ']'
                    : ''
            ) +
            ': ' + e.message
        );
        if (e.stack && e.stack.split) {
            console.log(e.stack.split('\n').slice(1).join('\n'));
        }
    }

    function ArgumentException(m) {
        this.message = m;
    }

    function DomException(m) {
        this.message = m;
    }

    function HttpException(m) {
        this.message = m;
    }


    /**
     * Initializer
     */
    function init(selector, options) {

        if (! selector) {
            throw new ArgumentException('First argument is required.');
        }

        // arguments shifting
        if (selector && is.object(selector)) {
            if (! selector.selector) {
                throw new ArgumentException('Please, provide selector as first argument, or as options property.');
            }
            options = selector;
            selector = options.selector;
        }

        this.el = document.querySelector(selector);
        this.opt = new Options(options, viewDefaults);

        if (! this.el) {
            throw new DomException('There is no element with selector "' + selector  + '".');
        }

        this.el.classList.add(MAIN_ELEMENT_CLASS);

        if (this.opt.noWrap) {
            this.el.classList.add(NO_WRAP_CLASS);
        }

        if (this.opt.content) {
            this.write(this.opt.content);
        }

        if (this.opt.url) {
            this.writeFileContent(this.opt.url);
        }
    }


    /**
     * Write methods
     */
    function write(m) {

        if (is.array(m)) {
            for (var i = 0, len = m.length; i < len; i++) {
                write.call(this, m[i]);
            }
            return;
        } else if (is.not.string(m)) {
            throw new ArgumentException('First argument to "write" method is not a string.');
        }

        var isComment = codeParser.isComment(m);
        var d = document.createElement('div');
        d.innerHTML = isComment ? codeParser.indent(m) : codeParser.parse(m);
        d.className = isComment ? 'comment' : 'line';
        this.el.appendChild(d);
        d = null;
    }


    /**
     * Main constructor
     */
    function CodeView() {
        try {
            init.apply(this, arguments);
        } catch (e) {
            showError(e);
        }
    }

    CodeView.prototype.write = function (line) {

        try {
            write.apply(this, arguments);
        } catch (e) {
            showError(e);
        }

        return this;
    };

    CodeView.prototype.writeFileContent = function (url) {

        var success = function (data) {

            if (is.not.string(data)) {
                throw new TypeError('String espected.');
            }

            var lines = data.split('\n');

            for (var i = 0, len = lines.length; i < len; i++) {
                this.write(lines[i]);
            }
        };

        readFile(url, success.bind(this), showError);
        success = null;

        return this;
    };

    return CodeView;
});
