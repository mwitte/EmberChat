require('scripts/Classes/Messages/ConversationMessage');
require('scripts/Classes/User');

/**
 * When a user joins a room
 *
 * @class RoomJoinMessage
 * @extends EmberChat.RoomConversationMessage
 * @namespace EmberChat
 */
EmberChat.RoomJoinMessage = EmberChat.RoomConversationMessage.extend({


    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        var conversation = this.getConversationObject();
        if(!conversation){
            return false;
        }
        var messageUserObject = EmberChat.User.create(this.get('user'));

        var user = EmberChat.Session.findUserById(messageUserObject.get('id'));
        // if the user could not be found the joining user is the session user
        if(!user){
            return false;
        }

        var content = this.createContent(user);

        if(conversation.get('content')){
            conversation.get('content').pushObjects(content);
        }else{
            conversation.set('content', Ember.A(content));
        }
        return true;
    },

    createContent: function(user) {
        return [{info: true, content: user.get('name') + ' joined'}];
    }
});