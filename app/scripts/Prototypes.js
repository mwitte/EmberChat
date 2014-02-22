/**
 * @class Handlebars
 * @namespace Ember
 */

/**
 * Viewhelper for rendering a formatted date. If no format is given it uses a default format.
 *
 * Usage:
 * ```
 * {{formatDate date "h:mm:ss"}}
 * ```
 *
 * @method formatDate
 * @param {Date} date
 * @param {string} format (Optional) Provide the used format
 * @return {string}
 */
Ember.Handlebars.registerBoundHelper('formatDate', function(date, format, options) {
    if(typeof options === 'undefined'){
        options = format;
        format = "llll";
    }
    return moment().format(format);
});