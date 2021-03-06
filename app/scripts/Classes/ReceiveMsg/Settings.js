require('scripts/Classes/ReceiveMsg/Abstract');

/**
 * This class represents all settings messages
 *
 * @class Settings
 * @extends EmberChat.ReceiveMsg.Abstract
 * @namespace EmberChat.ReceiveMsg
 */
EmberChat.ReceiveMsg.Settings = EmberChat.ReceiveMsg.Abstract.extend({

    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        var user = EmberChat.Session.get('user');
        Ember.assert('Settings message contains no user data!', this.get('user'));
        EmberChat.Session.set('user', EmberChat.User.create(this.get('user')));
        // @TODO for debugging
        Ember.$(document).attr('title', 'EC: ' + EmberChat.Session.get('user').get('name'));

        if(this.get('token')){
            localStorage.token = this.get('token');
        }
        EmberChat.Session.set('isAdmin', this.get('admin'));
        EmberChat.Session.set('authenticated', true);
        try{
            // fire authenticated event
            Ember.Instrumentation.instrument("signal.authenticated");
        }catch (e){}
        return true;
    }
});