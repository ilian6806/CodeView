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


}));