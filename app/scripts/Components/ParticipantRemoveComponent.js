/**
 * Removes participants
 *
 * @class ParticipantRemoveComponent
 * @namespace EmberChat
 * @extends Ember.Component
 */
EmberChat.ParticipantRemoveComponent = Ember.Component.extend({

    classNames: ['participant-remove'],

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
            var _this = this;
            var rawMessage;
            if(this.get('participant').get('isRoom')){
                rawMessage = {
                    type: 'Admin\\RemoveRoom',
                    room: this.get('participant')
                };
            }else{
                rawMessage = {
                    type: 'Admin\\RemoveUser',
                    user: this.get('participant')
                };
            }

            EmberChat.MessageProcessor.processOutgoing(rawMessage);
            Ember.$(this.get('element')).find('.removeBtn').remove();

            Ember.$(this.get('element')).find('.modal').on('hidden.bs.modal', function (e) {
                _this.sendAction('closeConversation');
            });
        }
    }

});