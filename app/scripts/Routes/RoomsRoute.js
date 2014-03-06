require('scripts/Routes/AuthenticatedRoute');
/**
 * ConversationUserRoute
 *
 * @namespace EmberChat
 * @class RoomsRoute
 * @extends EmberChat.AuthenticatedRoute
 */
EmberChat.RoomsRoute = EmberChat.AuthenticatedRoute.extend({

    /**
     * Connect to the server
     *
     * @method setupController
     */
    setupController: function(controller, model) {
        controller.updateServerStartTime();
    }

});
