/**
 *
 * @namespace EmberChat
 * @class ConversationController
 */
EmberChat.ConversationController = Ember.Controller.extend({
    actions: {
        send: function() {
            EmberChat.MessageProcessor.processOutgoing({type: 'message', user: this.get('conversation').get('id'), content: this.get('text')});
            this.set('text', '');
        },

        close: function() {
            this.transitionToRoute('index');
            EmberChat.Session.get('conversations').removeObject(this.get('conversation'));
        }
    }
});