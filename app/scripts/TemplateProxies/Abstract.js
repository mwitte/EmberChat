/**
 * Base class for template proxies
 *
 * @class AbstractTemplateProxy
 * @namespace EmberChat
 * @extends Ember.Object
 */
EmberChat.AbstractTemplateProxy = Ember.Object.extend({

    /**
     * Contains all original templates which got replaced by proxy
     * @type {Array}
     * @property templates
     */
    templates: [],

    /**
     * Replaces named template with given callback
     *
     * Usage:
     * ```js
     * EmberChat.TemplateProxy.MyProxy = EmberChat.TemplateProxy.create({});
     *
     * EmberChat.TemplateProxy.MyProxy.replaceTemplate('components/my-component', function(template, context, arguments) {
     *      // some condition
     *      if(true){
     *          // apply original template
     *          template.apply(context, arguments);
     *      }else{
     *          // apply other template
     *          Ember.TEMPLATES['components/other-component'].apply(context, arguments);
     *      }
     * });
     * ```
     *
     * @method replaceTemplate
     * @param {string} name identifier of the template
     * @param {function} callback function which gets invoked
     * @returns {callback}
     */
    replaceTemplate: function(name, callback) {
        var _this = this;

        var originalTemplate = Ember.TEMPLATES[name];

        // safe reference of original template
        this.templates[name] = originalTemplate;

        // overwrite old template with given callback
        Ember.TEMPLATES[name] = function() {
            return callback(_this.templates[name], this, arguments);
        };

    }
});