EmberChat.ApplicationController = Ember.ArrayController.extend({

    /**
     * Determines the online state of the socket
     *
     * @type {boolean}
     * @property isOnline
     */
    isOnlineBinding: 'EmberChat.Socket.online',

    userBinding: 'EmberChat.Session.user',

    availableUsersBinding: 'EmberChat.Session.availableUsers',

    actions: {
        connect: function() {
            EmberChat.Socket.connect();
        },

        disconnect:  function() {
            EmberChat.Socket.get('socket').close();
        }
    }
});