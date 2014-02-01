/**
 * ConversationUserRoute
 *
 * @namespace EmberChat
 * @class ConversationUserRoute
 */
EmberChat.ConversationUserRoute = Ember.Route.extend({

    /**
     * Sets the needed data for the controller
     *
     * @method setupController
     * @param {Ember.Controller} controller
     * @param {EmberChat.Conversation} conversation
     * @param {EmberChat.User} user
     */
    setupController: function(controller, conversation) {
        conversation.set('isDisplayed', true);
        conversation.set('newMessages', 0);
        controller.set('conversation', conversation);
    },


    /**
     * Fetches the EmberChat.Conversation for the given id
     *
     * @method model
     * @param {object} params
     * @returns {EmberChat.Conversation|null|void}
     */
    model: function (params) {
        if(typeof params !== 'object' || !params.id) {
            this.transitionTo('index');
            return null;
        }
        return EmberChat.Session.findConversationById(params.id);
    },

    actions: {

        /**
         * Gets called when the route or the model changes
         *
         * @event willTransition
         * @param transition
         */
        willTransition: function(transition) {
            this.controller.get('conversation').set('isDisplayed', false);
        }
    }
});
