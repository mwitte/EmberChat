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
    roomsBinding: 'EmberChat.Session.availableRoomsSorted'

});