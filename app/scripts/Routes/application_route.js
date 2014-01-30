EmberChat.ApplicationRoute = Ember.Route.extend({

    setupController: function() {
        EmberChat.Socket.connect();
    },
    // admittedly, this should be in IndexRoute and not in the
    // top level ApplicationRoute; we're in transition... :-)
    model: function () {
        return ['red', 'yellow', 'blue'];
    }
});
