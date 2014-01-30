require('scripts/Objects/Messages/Abstract');

/**
 * This class represents all settings messages
 *
 * @class UserListMessage
 * @namespace EmberChat
 */
EmberChat.UserListMessage = EmberChat.AbstractMessage.extend({

    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        var users = this.get('content');
        if(typeof users === 'object'){
            var userObjects = Ember.A();
            for(var i=0; i < users.length; i++){
                userObjects.push(EmberChat.User.create(users[i]));
            }
            EmberChat.Session.set('availableUsers', userObjects);
            return true;
        }
        return false;
    }
});