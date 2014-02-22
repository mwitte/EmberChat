/**
 * Create rooms
 *
 * @class RoomRemoveComponent
 * @namespace EmberChat
 * @extends Ember.Component
 */
EmberChat.RoomRemoveComponent = Ember.Component.extend({

    classNames: ['room-remove'],

    /**
     * Gets called after rendering
     *
     * @event didInsertElement
     */
    didInsertElement: function(){
        var modal = Ember.$(this.get('element')).find('.modal');
        Ember.$(this.get('element')).find('.removeBtn').click(function(){
            modal.modal('show');
            return false;
        });

    },

    actions: {
        /**
         * removes a new room
         */
        remove: function() {
            var rawMessage = {
                type: 'Admin\\RemoveRoom',
                room: this.get('room')
            };
            EmberChat.MessageProcessor.processOutgoing(rawMessage);
            Ember.$(this.get('element')).find('.removeBtn').remove();
        }
    }

});