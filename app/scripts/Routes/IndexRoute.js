require('scripts/Routes/AuthenticatedRoute');
/**
 * Default Route
 *
 * @namespace EmberChat
 * @class IndexRoute
 * @extends EmberChat.AuthenticatedRoute
 */
EmberChat.IndexRoute = EmberChat.AuthenticatedRoute.extend({

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