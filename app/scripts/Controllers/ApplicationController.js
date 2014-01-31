/**
 * The central application controller
 *
 * @namespace EmberChat
 * @class ApplicationController
 */
EmberChat.ApplicationController = Ember.ArrayController.extend({

    /**
     * Determines the online state of the socket
     *
     * @type {boolean}
     * @property isOnline
     */
    isOnlineBinding: 'EmberChat.Socket.online',

    /**
     * The current user(session)
     *
     * @property user
     * @type {EmberChat.User}
     */
    userBinding: 'EmberChat.Session.user',

    /**
     * All available users
     *
     * @property availableUsers
     * @type {Ember.Array}
     */
    availableUsersBinding: 'EmberChat.Session.availableUsers',

    conversationsBinding: 'EmberChat.Session.conversations',

    actions: {

        /**
         * Connect to server
         */
        connect: function() {
            EmberChat.Socket.connect();
        },

        /**
         * Disconnect from server
         */
        disconnect:  function() {
            EmberChat.Socket.get('socket').close();
        }
    }
});