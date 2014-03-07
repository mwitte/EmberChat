/**
 * New methods for Window prototype
 * @class window
 */
/**
 * Adds css to the dom
 *
 * Usage:
 * ```
 * window.addCss('div.scroll-v', ['max-height: 300px'], 'screen and (min-width: 768px)');
 * ```
 * @method addCss
 * @param {string} selector
 * @param {array} styleContent
 * @param {string} mediaQuery
 */
window.addCss = function addCss(selector, styleContent, mediaQuery) {
    mediaQuery = mediaQuery ? mediaQuery : false;
    var container = Ember.$('#overwrite-css-container');
    if (container.length === 0){
        container = Ember.$('<div id="overwrite-css-container"></div>');
        container.hide();
        container.appendTo(Ember.$('body'));
    }
    // get unique identifier for given selector with mediaQuery
    var identifier = (selector + mediaQuery).split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a;},0);
    // and we need one div for each class
    var cssContainer = container.find('div[data-class="' + identifier + '"]');
    if (cssContainer.length === 0){
        cssContainer = Ember.$('<div data-class="' + identifier + '"></div>');
        cssContainer.appendTo(container);
    }

    // create css content
    var content = styleContent.join('; \n');
    // wrap with given selctor
    content = selector + ' {\n' + content + '; \n}\n';
    // wrap with given mediaQuery if given
    if (mediaQuery) {
        content = '@media '+ mediaQuery + ' {\n' + content + '}';
    }
    // apply as style
    cssContainer.html('<style type="text/css">\n' + content + '\n</style>');
};