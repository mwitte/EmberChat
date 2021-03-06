/**
 * Central application route
 *
 * @namespace EmberChat
 * @class ApplicationRoute
 * @extends Ember.Route
 */
EmberChat.AuthenticateRoute = Ember.Route.extend({

    /**
     * Redirect to index if authenticated
     */
    redirect: function(){
        if(!EmberChat.Socket.get('online')){
            this.transitionTo('connect');
        }
        if(EmberChat.Session.get('authenticated')){
            this.transitionTo('index');
        }
    },

    /**
     * Connect to the server
     *
     * @method setupController
     */
    setupController: function(controller, model) {
        var _this = this;
        EmberChat.Session.authenticate();

        // subscribe to authenticated event
        Ember.Instrumentation.subscribe("signal.authenticated", {
            before: function() {
                if(EmberChat.attemptedTransition){
                    EmberChat.attemptedTransition.retry();
                }else{
                    _this.transitionTo('rooms');
                }
                EmberChat.Session.onAuthenticated();
                controller.set('password', '');
                controller.set('auth', '');
            },
            after: function() {}
        });
    }
});
