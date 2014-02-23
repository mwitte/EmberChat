/**
 *
 * @namespace EmberChat
 * @class ApplicationView
 * @extends EmberChat.AbstractConversationView
 */
EmberChat.ApplicationView = Ember.View.extend({

    /**
     * @event didInsertElement
     */
    didInsertElement: function(){
        // enable bootstrap tooltips
        Ember.$(this.get('element')).find("[data-toggle='tooltip']").tooltip();
    }
});