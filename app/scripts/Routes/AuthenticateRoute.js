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
    setupController: function() {
        var _this = this;
        EmberChat.Session.authenticate();

        // subscribe to authenticated event
        Ember.Instrumentation.subscribe("signal.authenticated", {
            before: function() {
                if(EmberChat.attemptedTransition){
                    _this.transitionTo(EmberChat.attemptedTransition.targetName);
                }else{
                    _this.transitionTo('rooms');
                }
            },
            after: function() {}
        });
    }
});
