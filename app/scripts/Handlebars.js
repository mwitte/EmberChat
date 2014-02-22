/**
 * All custom handlebars
 *
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

/**
 * Renders the content for the conversations
 *
 * ```
 * {{renderConversationContent content}}
 * ```
 *
 * @method renderConversationContent
 * @param {string} content
 * @return {string}
 */
Ember.Handlebars.registerBoundHelper('renderConversationContent', function(content, options) {
    // escape special chars
    var escaped = Handlebars.Utils.escapeExpression(content);

    // replace urls
    content = content.replace(/(https?:\/\/[^\s]+)/g, function(url) {
        return '<a target="_blank" href="'+url+'">' + url + '</a>';
    });

    return new Handlebars.SafeString(content);
});