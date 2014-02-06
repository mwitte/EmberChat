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
        // delay connection
        Ember.run.later(this, function() {
            EmberChat.Socket.connect();
        }, 100);
    }
});
