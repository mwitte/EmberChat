/**
 * Abstract for the specific conversation controllers
 *
 * @namespace EmberChat
 * @class ConversationController
 * @extends Ember.Controller
 */
EmberChat.ConversationController = Ember.Controller.extend({

    /**
     * Current position in history. This is for the "arrow-up" "arrow-down" functionality
     *
     * @property historyPosition
     * @type {int}
     */
    historyPosition: 0,

    /**
     * Sends the given message and sets controller and conversation properties
     *
     * @method sendMessage
     * @param {object} rawMessage
     */
    sendMessage: function(rawMessage){
        EmberChat.MessageProcessor.processOutgoing(rawMessage);
        this.get('conversation').addSentContent(this.get('text'));
        this.set('historyPosition', 0);
        this.set('text', '');
    },

    actions: {
        close: function() {
            EmberChat.Session.get('conversations').removeObject(this.get('conversation'));
            this.get('conversation').destroy();
            this.transitionToRoute('index');
        }
    }
});