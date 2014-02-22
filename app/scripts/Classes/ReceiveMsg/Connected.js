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
        try{
            EmberChat.set('versionServer', this.get('version'));

            if(EmberChat.get('versionWebApp') < EmberChat.get('versionServer')){
                EmberChat.set('versionConflict', true);
            }else{
                EmberChat.set('versionConflict', false);
            }

            // fire connected event
            Ember.Instrumentation.instrument("signal.connected");
        }catch(e){}
    }
});
