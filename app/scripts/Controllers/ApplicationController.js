/**
 * The central application controller
 *
 * @namespace EmberChat
 * @class ApplicationController
 */
EmberChat.ApplicationController = Ember.ArrayController.extend({

    actions: {
        authenticate: function() {
            this.transitionToRoute('authenticate');
        },
        disconnect: function() {
            EmberChat.Socket.saveConnection();
            this.transitionToRoute('connect');
        }
    }
});