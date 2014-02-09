require('scripts/Classes/Messages/UserConversation');

/**
 * Another user requests a key for secure communication
 *
 * @class RequestEncryptedKeyMessage
 * @namespace EmberChat
 */
EmberChat.KeyExchangeMessage = EmberChat.UserConversationMessage.extend({

    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        if(this.get('publicKey')){
            this.generateKeyAndTransmit();
        }
        if(this.get('encryptedKey')){
            this.receiveKeyAndDecrypt();
        }
    },

    /**
     * Receive encrypted key and decrypt with conversation's JSEncrypt instance
     */
    receiveKeyAndDecrypt: function(){
        var conversation = this.getConversationObject();

        // getting the instance which controller had to set
        var jsEncrypt = conversation.get('rsaEncrypt');
        // conversation should have an instance of JSEncrypt for decoding
        if(!jsEncrypt){
            throw new Ember.Error('Conversation has no instance of JSEncrypt in '+ this.constructor.toString());
        }
        // set decrypted key as conversation property
        conversation.set('encryptionKey', jsEncrypt.decrypt(this.get('encryptedKey')));
    },

    /**
     * Generates a new key, encrypts it with given publicKey and sends it back
     *
     * @returns {boolean}
     */
    generateKeyAndTransmit: function(){
        var conversation = this.getConversationObject();
        // generate a key
        var generatedKey = this.generateKey();
        conversation.set('encryptionKey', generatedKey);

        var jsEncrypt = new JSEncrypt({default_key_size: EmberChat.encryption.rsa});
        jsEncrypt.setPublicKey(this.get('publicKey'));

        var message = {
            type: 'KeyExchange',
            user: this.get('user').id,
            encryptedKey: jsEncrypt.encrypt(generatedKey)
        };

        EmberChat.MessageProcessor.processOutgoing(message);

        return true;
    },

    /**
     * Generates a random string with needed length
     *
     * @returns {string}
     */
    generateKey: function(){
        // rsa encryption text max length
        var maxLength = EmberChat.encryption.rsa / 8 - 11;
        // use JSEncrypt for Random string
        var keyGenerator = new JSEncrypt({default_key_size: 512});
        // generate random string
        var randomString = keyGenerator.getPrivateKeyB64();
        // hash string and cut
        return Sha256.hash(randomString).substr(0, maxLength);
    }
});