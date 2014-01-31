/**
 * Central application route
 *
 * @namespace EmberChat
 * @class ApplicationRoute
 */
EmberChat.ApplicationRoute = Ember.Route.extend({

    /**
     * Connect to the server
     *
     * @method setupController
     */
    setupController: function() {
        EmberChat.Socket.connect();
    }
});
