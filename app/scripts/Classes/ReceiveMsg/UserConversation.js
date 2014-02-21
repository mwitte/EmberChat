require('scripts/Classes/ReceiveMsg/Conversation');

/**
 * This class represents a conversation message
 *
 * @class UserConversation
 * @extends EmberChat.ReceiveMsg.Conversation
 * @namespace EmberChat.ReceiveMsg
 */
EmberChat.ReceiveMsg.UserConversation = EmberChat.ReceiveMsg.Conversation.extend({

    /**
     * Get always a valid Conversation object
     *
     * @method getConversationObject
     * @returns {EmberChat.Conversation}
     */
    getConversationObject: function(){
        var user = EmberChat.Session.findUserById(this.get('user').id);
        Ember.assert('ConversationMessage: Could not get user by id ' + this.get('user'), typeof user === 'object');
        var conversation = EmberChat.Session.findConversationById(user.get('id'));
        if(!conversation){
            conversation = EmberChat.Conversation.create({id: user.get('id'), name: user.get('name'), user: user});
            EmberChat.Session.get('conversations').pushObject(conversation);
        }
        return conversation;
    }
});