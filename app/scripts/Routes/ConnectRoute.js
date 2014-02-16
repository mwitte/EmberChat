/**
 * Every route which should only accessible for authenticated session should extend this
 *
 * @namespace EmberChat
 * @class ConnectRoute
 * @extends Ember.Route
 */
EmberChat.ConnectRoute = Ember.Route.extend({

    /**
     * Connect to the server
     *
     * @method setupController
     */
    setupController: function(controller, model) {
        var _this = this;

        // subscribe to authenticated event
        Ember.Instrumentation.subscribe("signal.connected", {
            before: function() {
                _this.transitionTo('authenticate');
            },
            after: function() {}
        });

        if(localStorage.host && localStorage.path){
            controller.connect(localStorage.host, localStorage.path);
        }
    }
});
