require('scripts/Objects/Messages/Abstract');

/**
 * This class represents the user list messages.
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
        Ember.assert('UserList message contains no content!', typeof users === 'object');
        this.updateAvailableUsers(users);
        return true;
    },

    /**
     * Updates the available users by reference
     *
     * @method updateAvailableUsers
     * @param {Ember.Array} messageUsers
     * @return {void}
     */
    updateAvailableUsers: function(messageUsers){
        var availableUsers = EmberChat.Session.get('availableUsers');
        for(var ia=0; ia < availableUsers.length; ia++){
            var messageUser = messageUsers.findBy('id', availableUsers[ia].get('id'));
            // could not find a messageUser for this available User
            if(!messageUser){
                // the user is not existing in message so remove him
                availableUsers.removeObject(availableUsers[ia]);
                continue;
            }
            // set properties
            availableUsers[ia].setProperties(messageUser);
            // remove messageUser
            messageUsers.removeObject(messageUser);
        }
        // unprocessed messageUsers
        for(var j=0; j < messageUsers.length; j++){
            availableUsers.pushObject(EmberChat.User.create(messageUsers[j]));
        }
        EmberChat.Session.propertyDidChange('availableUsers');
    }
});