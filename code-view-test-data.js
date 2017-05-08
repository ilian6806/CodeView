
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

    if (this.opt.url) {
        writeFileContent.call(this);
    }
};