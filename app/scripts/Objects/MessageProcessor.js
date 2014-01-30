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
     * @param {string} rawMessage
     * @returns {null}
     */
    processIncoming: function(rawMessage) {
        var messageContent = JSON.parse(rawMessage.data);
        // determine type
        switch (messageContent.type) {
            case 'settings':
                return EmberChat.SettingsMessage.create(messageContent).process();
            case 'userlist':
                return EmberChat.UserListMessage.create(messageContent).process();
            case 'conversation':
                return EmberChat.ConversationMessage.create(messageContent).process();
            default :
                Ember.warn("Unknown message type: " + messageContent.type);
                return false;
        }
    },

    /**
     * @param {EmberChat.AbstractMessage} message
     */
    processOutgoing: function(message) {
        if(typeof message === 'object') {
            EmberChat.Socket.sendMessage(JSON.stringify(message));
        }
    }
});