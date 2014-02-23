require('scripts/TemplateProxies/Abstract');
/**
 * Proxies for admin actions
 *
 * @class AdminTemplateProxy
 * @namespace EmberChat.TemplateProxy
 * @extends EmberChat.TemplateProxy
 */
EmberChat.AdminTemplateProxy = EmberChat.AbstractTemplateProxy.create({

    /**
     * Determines if this aspect is active
     *
     * @method isActive
     * @returns {boolean}
     */
    isActive: function () {
        return EmberChat.Session.get('isAdmin');
    }
});
/**
 * @method components/participant-remove
 */
EmberChat.AdminTemplateProxy.replaceTemplate('components/participant-remove', function(originalTemplate, originalContext, originalArguments) {
    if (EmberChat.AdminTemplateProxy.isActive()) {
        // apply original template
        originalTemplate.apply(originalContext, originalArguments);

    }
});