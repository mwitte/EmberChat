/**
 * Information about the current session and actions like connect and disconnect
 *
 * @class SessionInfoComponent
 * @namespace EmberChat
 */
EmberChat.SessionInfoComponent = Ember.Component.extend({

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
            EmberChat.Session.offlineTasks();
        }
    }
});