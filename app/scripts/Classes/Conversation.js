/**
 * The Conversation object class represents a conversation
 *
 * @class Conversation
 * @namespace EmberChat
 * @extends Ember.Object
 */
EmberChat.Conversation = Ember.Object.extend({

    /**
     * The name of the conversation
     * @property name
     * @type {string}
     */
    name: null,

    /**
     * Unique id for this conversation
     * @property id
     * @type {string}
     */
    id: null,

    /**
     * Conversation content
     * @property content
     * @type {Ember.Array}
     */
    content: null,

    /**
     * Contains the last messages the user sent
     *
     * @property sentContent
     * @type {Ember.Array}
     */
    sentContent: Ember.A(),

    /**
     * Amount of unseen messages
     * @property newMessages
     * @type {int}
     */
    newMessages: 0,

    /**
     * Determines if this conversion is closed. Closed means that an admin removed the room for this conversation
     * @property closed
     * @type {boolean}
     */
    closed: false,

    /**
     * User of this conversation if its a user conversation
     * @property user
     * @type EmberChat.User
     */
    user: null,

    /**
     * Room of this conversation if its a room conversation
     * @property room
     * @type EmberChat.Room
     */
    room: null,

    /**
     * The users which are in this room conversation
     * @property users
     * @type {Ember.Array}
     */
    users: null,

    /**
     * Determines if this conversation is encrypted
     * @property isEncrypted
     * @type {boolean}
     */
    isEncrypted: false,

    /**
     * The encryption key for this conversation
     * @property encryptionKey
     * @type {string}
     */
    encryptionKey: null,

    /**
     * Determines if this conversation encryption is validated
     * @property encryptionValidated
     * @type {boolean}
     */
    encryptionValidated: false,

    /**
     * Adds sent messages, the sent messages are used for history browsing
     * @method addSentContent
     * @param message
     */
    addSentContent: function(message){
        var sentContent = this.get('sentContent');
        // save only 20 messages
        if(sentContent.length > 20) sentContent.shiftObject();
        // remove duplicated content
        sentContent.forEach(function(object, index){
            if(object === message){
                sentContent.removeAt(index);
            }
        });
        sentContent.pushObject(message);
    },

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
     *
     * @method requestEncryptedKey
     * @return {void}
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
                type: 'User\\KeyExchange',
                publicKey: rsaEncrypt.getPublicKeyB64(),
                user: this.get('user').get('id')
            };
            EmberChat.MessageProcessor.processOutgoing(exChangeMsg);
            // set JSEncrypt instance as conversation property
            this.set('rsaEncrypt', rsaEncrypt);
        }else if(this.get('isEncrypted') === false){
            var disableMsg = {
                type: 'User\\KeyExchange',
                disable: true,
                user: this.get('user').get('id')
            };
            EmberChat.MessageProcessor.processOutgoing(disableMsg);
            this.set('encryptionKey', null);
        }
    }.observes('isEncrypted'),

    /**
     * Disables the encryption, gets called when the online state of the other user changes
     * @event disableEncryption
     */
    disableEncryption: function() {
        this.set('isEncrypted', false);
        this.set('encryptionKey', null);
        this.set('encryptionValidated', false);
    }.observes('user.online'),

    /**
     * Adds content to this conversation
     *
     * @method addContent
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
            // @TODO conversation body should be changed
            if(contentArray[0].user !== EmberChat.Session.get('user').get('name')){
                EmberChat.DefaultEnvironment.newNotification(this.get('name'), contentArray[0].content);
            }
        }

        if(this.get('content')){
            // remove old content
            if(this.get('content').length >= 100){
                this.get('content').shiftObject();
            }
            this.get('content').pushObjects(contentArray);
        }else{
            this.set('content', Ember.A(contentArray));
        }
    }
});