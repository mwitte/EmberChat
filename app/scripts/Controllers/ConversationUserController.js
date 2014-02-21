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
            var rawMessage = {};

            if(this.get('conversation').get('encryptionKey')){
                rawMessage.content = GibberishAES.enc(this.get('text'), this.get('conversation').get('encryptionKey'));
                rawMessage.encrypted = true;
            }else{
                rawMessage.content = this.get('text');
            }

            rawMessage.user = this.get('conversation').get('user').get('id');
            rawMessage.type = 'User\\Conversation';
            EmberChat.MessageProcessor.processOutgoing(rawMessage);
            this.set('text', '');
        },

        close: function() {
            EmberChat.Session.get('conversations').removeObject(this.get('conversation'));
            this.get('conversation').destroy();
            this.transitionToRoute('index');
        }
    }
});