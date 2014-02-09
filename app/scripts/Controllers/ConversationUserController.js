require('scripts/Controllers/ConversationController');
/**
 * This controller delegates the conversation between two users
 *
 * @namespace EmberChat
 * @class ConversationUserController
 * @extends ConversationController
 */
EmberChat.ConversationUserController = EmberChat.ConversationController.extend({


    /**
     * Request a encrypted key of the other client, sends him a generated RSA public key for encryption
     */
    requestEncryptedKey: function() {
        if(this.get('encryptEnable')){
            var rsaEncrypt = new JSEncrypt({default_key_size: EmberChat.encryption.rsa});
            // build message with public key
            var message = {
                type: 'KeyExchange',
                publicKey: rsaEncrypt.getPublicKeyB64(),
                user: this.get('conversation').get('user').get('id')
            };
            EmberChat.MessageProcessor.processOutgoing(message);
            // set JSEncrypt instance as conversation property
            this.get('conversation').set('rsaEncrypt', rsaEncrypt);
        }
        //@TODO disable encryption message
    }.observes('encryptEnable'),

    actions: {
        send: function() {
            var rawMessage = {};

            if(this.get('conversation').get('encryptionKey')){
                rawMessage.content = GibberishAES.enc(this.get('text'), this.get('conversation').get('encryptionKey'));
            }else{
                rawMessage.content = this.get('text');
            }

            rawMessage.user = this.get('conversation').get('user').get('id');
            rawMessage.type = 'UserConversation';
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