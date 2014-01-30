EmberChat.ConversationUserRoute = Ember.Route.extend({

    setupController: function(controller, user) {
        controller.set('user', user);

        user.set('isDisplayed', true);
        user.set('newMessages', 0);

        if(!user.get('conversation')){
            var message = EmberChat.SettingsMessage.create({
                type: 'requestHistory',
                user: user.id
            });
            EmberChat.MessageProcessor.processOutgoing(message);
        }
    },

    model: function (params) {
        if(typeof params === 'object' && params.id) {
            var users = EmberChat.Session.get('availableUsers');
            for(var i = 0; i < users.length; i++) {
                if(users.objectAt(i).id === params.id){
                    return users.objectAt(i);
                }
            }
        }
        this.transitionTo('index');
    },

    actions: {
        willTransition: function(transition) {
            this.controller.get('user').set('isDisplayed', false);
        }
    }
});
