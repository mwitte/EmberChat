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
     * @param controller
     * @param {EmberChat.User} user
     */
    setupController: function(controller, conversation) {
        conversation.set('isDisplayed', true);
        conversation.set('newMessages', 0);
        controller.set('conversation', conversation);
        if(!conversation.get('content')){
            var message = EmberChat.SettingsMessage.create({
                type: 'requestHistory',
                user: conversation.get('user').get('id')
            });
            EmberChat.MessageProcessor.processOutgoing(message);
        }
    },

    /**
     * Fetches the User for the given id or transition to index route
     *
     * @method model
     * @param {object} params
     * @returns {EmberChat.User|void}
     */
    model: function (params) {
        if(typeof params !== 'object' || !params.id) {
            this.transitionTo('index');
            return null;
        }
        var conversation = EmberChat.Session.findConversationById(params.id);

        if(!conversation) {
            var user = EmberChat.Session.findUserById(params.id);
            if(!user){
                this.transitionTo('index');
                return null;
            }
            conversation = EmberChat.Conversation.create({id: params.id, name: user.get('name'), user: user});
            EmberChat.Session.get('conversations').pushObject(conversation);
        }
        return conversation;
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
