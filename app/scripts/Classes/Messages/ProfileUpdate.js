require('scripts/Classes/Messages/Abstract');

/**
 * This class represents a conversation message
 *
 * @class ProfileUpdate
 * @extends EmberChat.AbstractMessage
 * @namespace EmberChat
 */
EmberChat.ProfileUpdate = EmberChat.AbstractMessage.extend({
    process: function(){
        try{
            // fire authenticated event
            Ember.Instrumentation.instrument("signal.profileUpdated", this);
        }catch (e){}
    }
});
