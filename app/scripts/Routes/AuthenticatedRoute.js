require('scripts/Routes/ConnectionRoute');
/**
 * Every route which should only accessible for authenticated session should extend this
 *
 * @namespace EmberChat
 * @class AuthenticatedRoute
 * @extends Ember.Route
 */
EmberChat.AuthenticatedRoute = Ember.Route.extend({

    afterModel: function(model, transition){
        // safe original transition
        EmberChat.attemptedTransition = transition;
        if(!EmberChat.Socket.get('online')){
            this.transitionTo('connect');
        }else if(!EmberChat.Session.get('authenticated')){
            this.transitionTo('authenticate');
        }
        this.redirect(model);
    }
});
