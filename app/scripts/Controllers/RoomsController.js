/**
 * The central application controller
 *
 * @namespace EmberChat
 * @class RoomsController
 * @extends Ember.Controller
 */
EmberChat.RoomsController = Ember.Controller.extend({

    /**
     * The available rooms
     *
     * @property rooms
     * @type {Ember.Array}
     */
    roomsBinding: 'EmberChat.Session.availableRoomsSorted',

    /**
     * Updates every minute the serverStartTime
     *
     * @event updateServerStartTime
     */
    updateServerStartTime: function(){
        var _this = this;
        this.setServerStartTime();
        console.log(this.get('serverUpTime'));
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
    }.observes('EmberChat.Session.serverStartTime')

});