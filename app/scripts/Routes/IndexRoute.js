/**
 * Default Route
 *
 * @class IndexRoute
 * @namespace EmberChat
 */
EmberChat.IndexRoute = Ember.Route.extend({

    /**
     * Redirects to rooms route
     *
     * @method redirect
     * @returns {void}
     */
    redirect: function() {
        this.transitionTo('rooms');
    }
});