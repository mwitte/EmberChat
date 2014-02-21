require('scripts/Classes/ReceiveMsg/Abstract');

/**
 * This class represents a conversation message
 *
 * @class AdminAction
 * @extends EmberChat.ReceiveMsg.Abstract
 * @namespace EmberChat.ReceiveMsg
 */
EmberChat.ReceiveMsg.AdminAction = EmberChat.ReceiveMsg.Abstract.extend({
    process: function(){
        try{
            // fire authenticated event
            Ember.Instrumentation.instrument("signal.admin." + this.get('action'), this);
        }catch (e){}
    }
});
