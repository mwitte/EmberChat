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
     * Fetches the EmberChat.Conversation for the given id or transition to index route
     *
     * @method model
     * @param {object} params
     * @returns {EmberChat.Conversation|void}
     */
    model: function (params) {
        return EmberChat.Session.get('availableRooms');
    }

});
