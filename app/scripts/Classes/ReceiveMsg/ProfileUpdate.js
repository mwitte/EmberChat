require('scripts/Classes/ReceiveMsg/Abstract');

/**
 * This class represents a conversation message
 *
 * @class ProfileUpdate
 * @extends EmberChat.ReceiveMsg.Abstract
 * @namespace EmberChat.ReceiveMsg
 */
EmberChat.ReceiveMsg.ProfileUpdate = EmberChat.ReceiveMsg.Abstract.extend({
    process: function(){
        try{
            // fire authenticated event
            Ember.Instrumentation.instrument("signal.profileUpdated", this);
        }catch (e){}
    }
});
