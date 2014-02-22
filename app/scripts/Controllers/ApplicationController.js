/**
 * The central application controller
 *
 * @namespace EmberChat
 * @class ApplicationController
 */
EmberChat.ApplicationController = Ember.ArrayController.extend({

    /**
     * Updates every minute the serverStartTime
     *
     * @event updateServerStartTime
     */
    updateServerStartTime: function(){
        var _this = this;
        this.setServerStartTime();
        Ember.run.later(function(){
            _this.setServerStartTime();
            _this.updateServerStartTime();
        }, 60000);
    },

    /**
     * Sets the serverUpTime
     * @method setServerStartTime
     */
    setServerStartTime: function(){
        this.set('serverUpTime', moment(EmberChat.Session.get('serverStartTime')).fromNow());
    }.observes('EmberChat.Session.serverStartTime'),

    actions: {
        authenticate: function() {
            this.transitionToRoute('authenticate');
        },
        disconnect: function() {
            EmberChat.Socket.saveConnection();
            this.transitionToRoute('connect');
        },
        unAuthenticate: function() {
            EmberChat.Socket.get('socket').close();
            EmberChat.Session.unAuthenticate();
            this.transitionToRoute('connect');
        },
        openExternal: function(url) {
            EmberChat.DefaultEnvironment.openExternal(url);
        }
    }
});