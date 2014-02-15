/**
 * The Conversation object class represents a conversation
 *
 * @class Conversation
 * @namespace EmberChat
 */
EmberChat.Conversation = Ember.Object.extend({

    /**
     * The name of the conversation
     * @property name
     * @type {string}
     */
    name: null,

    id: null,

    content: null,

    newMessages: 0,

    room: null,

    user: null,

    users: null,

    isEncrypted: false,

    encryptionKey: null,

    encryptionValidated: false,

    /**
     * Determines if the current conversation should be disabled
     *
     * @property isConversationDisabled
     * @type {boolean}
     */
    isConversationDisabled: function(){
        /**
         * if conversation is encrypted but not valid so far, this happens if the exchanged key is not acknowledged
         */
        if(this.get('isEncrypted') && !this.get('encryptionValidated')){
            return true;
        }
        return false;
    }.property('isEncrypted', 'encryptionValidated'),


    /**
     * Request a encrypted key of the other client, sends him a generated RSA public key for encryption
     */
    requestEncryptedKey: function() {
        if(!this.get('user').get('online')){
            this.set('isEncrypted', false);
            return;
        }
        if(this.get('isEncrypted') && !this.get('encryptionKey')){
            var rsaEncrypt = new JSEncrypt({default_key_size: EmberChat.encryption.rsa});
            // build message with public key
            var exChangeMsg = {
                type: 'KeyExchange',
                publicKey: rsaEncrypt.getPublicKeyB64(),
                user: this.get('user').get('id')
            };
            EmberChat.MessageProcessor.processOutgoing(exChangeMsg);
            // set JSEncrypt instance as conversation property
            this.set('rsaEncrypt', rsaEncrypt);
        }else if(this.get('isEncrypted') === false){
            var disableMsg = {
                type: 'KeyExchange',
                disable: true,
                user: this.get('user').get('id')
            };
            EmberChat.MessageProcessor.processOutgoing(disableMsg);
            this.set('encryptionKey', null);
        }
    }.observes('isEncrypted'),

    disableEncryption: function() {
        this.set('isEncrypted', false);
        this.set('encryptionKey', null);
        this.set('encryptionValidated', false);
    }.observes('user.online'),

    /**
     *
     * @param {array} contentArray
     */
    addContent: function(contentArray){

        // is this conversation encrypted?
        if(this.get('encryptionKey')){
            // iterate all conversation elements
            for(var i=0; i<contentArray.length;i++){
                var content = contentArray[i];
                // only if it got content, and it's type is msg
                if(content.content &&
                    content.type &&
                    content.type === 'msg'){
                    // try to decode it, can fail if given text is not encrypted
                    try {
                        content.content = GibberishAES.dec(content.content, this.get('encryptionKey'));
                        content.encrypted = true;
                    } catch (e) {

                    }
                }
            }
        }

        // create new notification on user chat
        if(contentArray[0] && contentArray[0].content && this.get('user')){
            EmberChat.DefaultEnvironment.newNotification(this.get('name'), contentArray[0].content);
        }

        if(this.get('content')){
            this.get('content').pushObjects(contentArray);
        }else{
            this.set('content', Ember.A(contentArray));
        }
    }
});