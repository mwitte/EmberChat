/**
 * Every route which should only accessible for authenticated session should extend this
 *
 * @namespace EmberChat
 * @class AuthenticatedRoute
 * @extends Ember.Route
 */
EmberChat.AuthenticatedRoute = Ember.Route.extend({

    afterModel: function(model, transition){
        if(!EmberChat.Session.get('authenticated')){
            // safe original transition
            EmberChat.attemptedTransition = transition;
            this.transitionTo('authenticate');
        }
        this.redirect(model);
    }
});
