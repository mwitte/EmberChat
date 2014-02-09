require('scripts/Classes/Messages/Conversation');

/**
 * This class represents a conversation message
 *
 * @class RoomConversationMessage
 * @extends EmberChat.ConversationMessage
 * @namespace EmberChat
 */
EmberChat.RoomConversationMessage = EmberChat.ConversationMessage.extend({

    /**
     * Get always a valid Conversation object
     *
     * @method getConversationObject
     * @returns {EmberChat.Conversation}
     */
    getConversationObject: function(){
        var room = EmberChat.Session.findRoomById(this.get('room').id);
        Ember.assert('ConversationMessage: Could not get room by id ' + this.get('room'), typeof room === 'object');
        var conversation = EmberChat.Session.findConversationById(room.get('id'));
        if(!conversation){
            conversation = EmberChat.Conversation.create({id: room.get('id'), name: room.get('name'), room: room});
            EmberChat.Session.get('conversations').pushObject(conversation);
        }
        return conversation;
    }
});