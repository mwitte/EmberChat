require('scripts/Classes/Messages/*');

/**
 * The MessageProcessor processes all messages which come in. It determines which message type it is, creates the
 * determined Message Object, sets message content as properties and processes the message.
 *
 * @namespace EmberChat
 * @class MessageProcessor
 */
EmberChat.MessageProcessor = Ember.Object.create({

    /**
     * Process the given raw message
     *
     * @method processIncoming
     * @param {string} rawMessage
     * @returns {null}
     */
    processIncoming: function(rawMessage) {
        var messageContent = JSON.parse(rawMessage.data);

        // determine type @TODO get rid of the switch
        switch (messageContent.type) {
            case 'Settings':
                return EmberChat.SettingsMessage.create(messageContent).process();
            case 'UserList':
                return EmberChat.UserListMessage.create(messageContent).process();
            case 'RoomList':
                return EmberChat.RoomListMessage.create(messageContent).process();
            case 'UserConversation':
                return EmberChat.UserConversationMessage.create(messageContent).process();
            case 'RoomConversation':
                return EmberChat.RoomConversationMessage.create(messageContent).process();
            case 'RoomJoin':
                return EmberChat.RoomJoinMessage.create(messageContent).process();
            case 'RoomLeave':
                return EmberChat.RoomLeaveMessage.create(messageContent).process();
            case 'KeyExchange':
                return EmberChat.KeyExchangeMessage.create(messageContent).process();
            case 'Connected':
                return EmberChat.ConnectedMessage.create(messageContent).process();
            default :
                Ember.warn("Unknown message type: " + messageContent.type);
                return false;
        }
    },

    /**
     * Process an outgoing message
     *
     * @method processOutgoing
     * @param {EmberChat.AbstractMessage} message
     */
    processOutgoing: function(message) {
        if(typeof message === 'object') {
            EmberChat.Socket.sendMessage(JSON.stringify(message));
        }
    }
});