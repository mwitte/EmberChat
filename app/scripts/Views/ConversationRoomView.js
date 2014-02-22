require('scripts/Views/ConversationView');

/**
 *
 * @namespace EmberChat
 * @class ConversationRoomView
 * @extends EmberChat.AbstractConversationView
 */
EmberChat.ConversationRoomView = EmberChat.AbstractConversationView.extend({

    /**
     * @event didInsertElement
     */
    didInsertElement: function(){
        this._super();
        // enable bootstrap tooltips
        Ember.$(this.get('element')).find("[data-toggle='tooltip']").tooltip();
        // set focus to input
        Ember.$(this.get('element')).find("input[type='text']").focus();
    }
});