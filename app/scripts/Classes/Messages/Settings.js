require('scripts/Objects/Messages/Abstract');

/**
 * This class represents all settings messages
 *
 * @namespace EmberChat
 * @class SettingsMessage
 */
EmberChat.SettingsMessage = EmberChat.AbstractMessage.extend({

    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        var user = EmberChat.Session.get('user');
        if(this.get('userId')){
            user.set('id', this.get('userId'))
        }

        if(this.get('userName')){
            user.set('name', this.get('userName'))
        }
        return false;
    }
});