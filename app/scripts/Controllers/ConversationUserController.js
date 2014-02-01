require('scripts/Controllers/ConversationController');
/**
 * This controller delegates the conversation between two users
 *
 * @namespace EmberChat
 * @class ConversationUserController
 * @extends ConversationController
 */
EmberChat.ConversationUserController = EmberChat.ConversationController.extend({
    actions: {
        send: function() {
            EmberChat.MessageProcessor.processOutgoing({type: 'message', user: this.get('conversation').get('id'), content: this.get('text')});
            this.set('text', '');
        }
    }
});