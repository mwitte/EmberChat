require('scripts/Views/ConversationView');

/**
 *
 * @namespace EmberChat
 * @class ConversationUserView
 * @extends EmberChat.ConversationView
 */
EmberChat.ConversationUserView = EmberChat.ConversationView.extend({

    /**
     * Gets called if the conversation content changed. Scrolls down.
     *
     * @event conversationChanged
     */
    conversationChanged: function(){
        this.scrollContent();
    }.observes('controller.user.conversation.@each')
});