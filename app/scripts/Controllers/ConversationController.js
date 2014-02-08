/**
 *
 * @namespace EmberChat
 * @class ConversationController
 */
EmberChat.ConversationController = Ember.Controller.extend({
    actions: {
        send: function() {
            var rawMessage = {type: 'message', content: this.get('text')};
            if(this.get('conversation').get('user')){
                rawMessage.user = this.get('conversation').get('id');
            }else{
                rawMessage.room = this.get('conversation').get('id');
            }
            EmberChat.MessageProcessor.processOutgoing(rawMessage);
            this.set('text', '');
        },

        close: function() {
            this.transitionToRoute('index');
            if(this.get('conversation').get('room')){
                var message = {
                    type: 'RoomLeave',
                    room: this.get('conversation').get('room').get('id')
                };
                EmberChat.MessageProcessor.processOutgoing(message);
            }
            EmberChat.Session.get('conversations').removeObject(this.get('conversation'));
        }
    }
});