/**
 * The central application controller
 *
 * @namespace EmberChat
 * @class RoomsController
 */
EmberChat.RoomsController = Ember.ArrayController.extend({
    actions: {
        /**
         * creates a new room
         */
        create: function() {
            var rawMessage = {
                type: 'Room',
                subType: 'Create',
                user: {
                    name: this.get('name')
                }
            };
            EmberChat.MessageProcessor.processOutgoing(rawMessage);
        }
    }
});