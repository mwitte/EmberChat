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
            var rawMessage = {content: this.get('text')};
            rawMessage.room = this.get('conversation').get('id');
            rawMessage.type = 'Room';
            rawMessage.subType = 'Conversation';
            EmberChat.MessageProcessor.processOutgoing(rawMessage);
            this.set('text', '');
        },

        close: function() {
            var message = {
                type: 'Room',
                subType: 'Leave',
                room: this.get('conversation').get('room').get('id')
            };
            EmberChat.MessageProcessor.processOutgoing(message);
            EmberChat.Session.get('conversations').removeObject(this.get('conversation'));
            this.get('conversation').destroy();
            this.transitionToRoute('index');
        }
    }
});