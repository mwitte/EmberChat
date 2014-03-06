/**
 * Displays the open conversations
 *
 * @class ConversationListComponent
 * @namespace EmberChat
 */
EmberChat.ConversationListComponent = Ember.Component.extend({

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
         * Disconnect from server
         */
        disconnect:  function() {
            EmberChat.Socket.get('socket').close();
            this.sendAction('disconnect');
        },

        logout: function() {
            this.sendAction('unAuthenticate');
        },

        openExternal: function(url) {
            this.sendAction('openExternal', url);
        }
    },

    /**
     * @event didInsertElement
     */
    didInsertElement: function(){
        // enable bootstrap tooltips
        Ember.$(this.get('element')).find("[data-toggle='tooltip']").tooltip();
    }

});