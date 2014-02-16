require('scripts/Classes/Messages/Abstract');

/**
 * This class represents a conversation message
 *
 * @class ConversationMessage
 * @extends EmberChat.AbstractMessage
 * @namespace EmberChat
 */
EmberChat.ConnectedMessage = EmberChat.AbstractMessage.extend({
    process: function(){
        // fire authenticated event
        Ember.Instrumentation.instrument("signal.connected");
    }
});
