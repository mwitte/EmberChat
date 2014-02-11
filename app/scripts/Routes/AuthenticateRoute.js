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

        // delay connection
        Ember.run.later(this, function() {
            EmberChat.Socket.connect();
        }, 100);

        // subscribe to authenticated event
        Ember.Instrumentation.subscribe("signal.authenticated", {
            before: function() {
                _this.transitionTo('rooms');
            },
            after: function() {}
        });
    }
});
