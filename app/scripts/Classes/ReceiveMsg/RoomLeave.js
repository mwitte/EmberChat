require('scripts/Classes/ReceiveMsg/Conversation');
require('scripts/Classes/User');

/**
 * When a user leaves a room
 *
 * @class RoomLeave
 * @extends EmberChat.ReceiveMsg.RoomJoin
 * @namespace EmberChat.ReceiveMsg
 */
EmberChat.ReceiveMsg.RoomLeave = EmberChat.ReceiveMsg.RoomJoin.extend({


    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        var messageUserObject = EmberChat.User.create(this.get('user'));
        if(messageUserObject.get('id') === EmberChat.Session.get('user').get('id')){
            return false;
        }
        var conversation = this.getConversationObject();

        var user = EmberChat.Session.findUserById(messageUserObject.get('id'));
        // if the user could not be found the joining user is the session user
        if(!user){
            return false;
        }

        // append joining user
        conversation.get('users').removeObject(user);

        this.publishContent(conversation, this.createContent(user));

        return true;
    },

    createContent: function(user) {
        return [{info: true, content: user.get('name') + ' left'}];
    }
});