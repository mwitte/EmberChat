require('scripts/Classes/ReceiveMsg/UserConversation');

/**
 * Key exchange messages for encrypted conversations. Detailed doc about the procedure can be found in docs folder
 *
 * @class KeyExchange
 * @extends EmberChat.ReceiveMsg.UserConversation
 * @namespace EmberChat.ReceiveMsg
 */
EmberChat.ReceiveMsg.KeyExchange = EmberChat.ReceiveMsg.UserConversation.extend({

    /**
     * Used word for encrypted acknowledge message. This word can be public because the acknowledge message it the
     * test for the other side that both got the same AES key.
     *
     * @property acknowledgeWord
     * @type {string}
     */
    acknowledgeWord : 'Acknowledge',

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
        if(this.get('disable')){
            this.disableEncryption();
        }
        if(this.get('acknowledge')){
            this.acknowledgeEncryption();
        }
    },

    /**
     * Acknowledge encryption is for preventing man-in-the-middle attacks. Only the other client could decode the
     * given encrypted key and used it for encryption the acknowledge and this acknowledge could decoded by
     * secure encryptionKey on this side enabling the encryption for messaging
     *
     * @method acknowledgeEncryption
     * @return {void}
     */
    acknowledgeEncryption: function(){
        var conversation = this.getConversationObject();
        // try to decrypt acknowledge with secure encryptionKey
        try{
            var decryptedAcknowledge = GibberishAES.dec(this.get('acknowledge'), conversation.get('encryptionKey'));
        }catch (e){

        }
        // only if acknowledge word could decoded by secure encryptionKey
        if(decryptedAcknowledge === this.get('acknowledgeWord')){
            conversation.set('encryptionValidated', true);
        }else{
            // something was wrong
            Ember.warn('Could not acknowledgeEncryption '+ this.constructor.toString());
            conversation.disableEncryption();
        }
    },

    /**
     * Disables the encryption on this side, the conversation itself sends a disabling message to other client
     *
     * @method disableEncryption
     * @return {void}
     */
    disableEncryption: function(){
        var conversation = this.getConversationObject();
        conversation.disableEncryption();
    },

    /**
     * Receive encrypted key and decrypt with conversation's JSEncrypt instance
     * @method receiveKeyAndDecrypt
     * @return {void}
     */
    receiveKeyAndDecrypt: function(){
        var conversation = this.getConversationObject();

        // getting the instance which controller had to set
        var jsEncrypt = conversation.get('rsaEncrypt');
        // conversation should have an instance of JSEncrypt for decoding
        if(!jsEncrypt){
            throw new Ember.Error('Conversation has no instance of JSEncrypt in '+ this.constructor.toString());
        }

        var decryptedKey = jsEncrypt.decrypt(this.get('encryptedKey'));

        // only if decryption succeeded
        if(decryptedKey){
            // set decrypted key as conversation property
            conversation.set('encryptionKey', decryptedKey);
            conversation.set('encryptionValidated', true);

            var rawMessage = {};
            rawMessage.acknowledge = GibberishAES.enc(this.get('acknowledgeWord'), decryptedKey);
            rawMessage.user = conversation.get('user').get('id');
            rawMessage.type = 'User\\KeyExchange';
            EmberChat.MessageProcessor.processOutgoing(rawMessage);
        }else{
            // something was wrong
            Ember.warn('Could not receiveKeyAndDecrypt '+ this.constructor.toString());
            conversation.disableEncryption();
        }
    },

    /**
     * Generates a new key, encrypts it with given publicKey and sends it back
     *
     * @method generateKeyAndTransmit
     * @returns {boolean}
     */
    generateKeyAndTransmit: function(){
        var conversation = this.getConversationObject();
        // generate a key
        var generatedKey = this.generateKey();
        conversation.set('encryptionKey', generatedKey);
        conversation.set('isEncrypted', true);

        var jsEncrypt = new JSEncrypt({default_key_size: EmberChat.encryption.rsa});
        jsEncrypt.setPublicKey(this.get('publicKey'));

        var encryptedKey = jsEncrypt.encrypt(generatedKey);

        // only if encryption succeeded
        if(encryptedKey){
            var message = {
                type: 'User\\KeyExchange',
                user: this.get('user').id,
                encryptedKey: encryptedKey
            };

            EmberChat.MessageProcessor.processOutgoing(message);

            conversation.set('encryptionValidated', false);
        }else{
            // something was wrong, disable encryption
            conversation.disableEncryption();
            Ember.warn('Could not generateKeyAndTransmit '+ this.constructor.toString());
        }

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