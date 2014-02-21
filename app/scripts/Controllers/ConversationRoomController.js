require('scripts/Controllers/ConversationController');
/**
 * This controller delegates the conversation for a room
 *
 * @namespace EmberChat
 * @class ConversationRoomController
 * @extends ConversationController
 */
EmberChat.ConversationRoomController = EmberChat.ConversationController.extend({
    actions: {
        send: function() {
            if(this.get('conversation').get('closed')){
                return;
            }
            var rawMessage = {content: this.get('text')};
            rawMessage.room = this.get('conversation').get('id');
            rawMessage.type = 'Room\\Conversation';
            EmberChat.MessageProcessor.processOutgoing(rawMessage);
            this.set('text', '');
        },

        close: function() {
            if(!this.get('conversation').get('closed')){
                var message = {
                    type: 'Room\\Leave',
                    room: this.get('conversation').get('room').get('id')
                };
                EmberChat.MessageProcessor.processOutgoing(message);
            }

            EmberChat.Session.get('conversations').removeObject(this.get('conversation'));
            this.get('conversation').destroy();
            this.transitionToRoute('index');
        }
    }
});