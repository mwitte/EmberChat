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

    encryptionKey: null,

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
                    } catch (e) {

                    }
                }
            }
        }

        if(this.get('content')){
            this.get('content').pushObjects(contentArray);
        }else{
            this.set('content', Ember.A(contentArray));
        }
    }
});