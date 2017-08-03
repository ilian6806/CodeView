(function(factory) {
    if (typeof define === 'function' && define.amd && define.amd.jQuery) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS Module
        factory(require('jquery'));
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function($) {


/*
 * Core module
 */
/*code-view.js*/


/*
 * Plugin
 */
$.fn.codeView = function(content) {

    var $el = this[0];

    if (!$el) {
        console.error('[CODE VIEW][DomException]: There is no element with this selector.');
        return this;
    }

    var view = new CodeView({
        selector: getSelector($el),
        content: content
    });

    $el.write = function () {
        view.write.apply($el, arguments);
        return $el;
    };

    return $el;
};

function getSelector(el) {
    if (el.id) {
        return '#' + el.id;
    } else if (el.classList && el.classList.length) {
        return '.' + Array.prototype.slice.call(el.classList).join('.');
    } else {
        return '';
    }
}

}));