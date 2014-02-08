require('scripts/Classes/Messages/ConversationMessage');
require('scripts/Classes/User');

/**
 * When a user leaves a room
 *
 * @class RoomLeaveMessage
 * @extends EmberChat.RoomJoinMessage
 * @namespace EmberChat
 */
EmberChat.RoomLeaveMessage = EmberChat.RoomJoinMessage.extend({

    createContent: function(user) {
        return [{info: true, content: user.get('name') + ' left'}];
    }
});