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
    process: function(rawMessage) {
        var messageContent = JSON.parse(rawMessage.data);
        // determine type
        switch (messageContent.type) {
            case 'settings':
                return EmberChat.SettingsMessage.create(messageContent).process();
                break;
            default :
                Ember.warn("Unknown message type: " + rawMessage);
                return false;
        }
    }
});