require('scripts/Classes/ReceiveMsg/Abstract');

/**
 * This class represents a conversation message
 *
 * @class Conversation
 * @extends EmberChat.ReceiveMsg.Abstract
 * @namespace EmberChat.ReceiveMsg
 */
EmberChat.ReceiveMsg.Connected = EmberChat.ReceiveMsg.Abstract.extend({
    process: function(){
        // fire authenticated event
        Ember.Instrumentation.instrument("signal.connected");
    }
});
