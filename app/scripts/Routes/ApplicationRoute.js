/**
 * Central application route
 *
 * @namespace EmberChat
 * @class ApplicationRoute
 * @extends Ember.Route
 */
EmberChat.ApplicationRoute = Ember.Route.extend({

    /**
     * Connect to the server
     *
     * @method setupController
     */
    setupController: function(controller, model) {
        controller.updateServerStartTime();
    }
});
