require('scripts/Classes/Messages/Abstract');

/**
 * This class represents a conversation message
 *
 * @class AdminActionMessage
 * @extends EmberChat.AbstractMessage
 * @namespace EmberChat
 */
EmberChat.AdminActionMessage = EmberChat.AbstractMessage.extend({
    process: function(){
        try{
            // fire authenticated event
            Ember.Instrumentation.instrument("signal.admin." + this.get('action'), this);
        }catch (e){}
    }
});
