/**
 *
 * @namespace EmberChat
 * @class ConversationView
 *
 */
EmberChat.ConversationView = Ember.View.extend({

    /**
     * @method scrollContent
     */
    scrollContent: function() {
        var conversationContainer = Ember.$(this.get('element')).find('.conversation-content');

        if(conversationContainer && conversationContainer[0]){
            conversationContainer.animate({scrollTop: conversationContainer[0].scrollHeight}, 'fast');
        }
    }
});