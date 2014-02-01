/**
 * Displays the open conversations
 *
 * @class ConversationListComponent
 * @namespace EmberChat
 */
EmberChat.ConversationListComponent = Ember.Component.extend({

    /**
     * All current open conversations. Elements are of type EmberChat.Conversation
     *
     * @type {Ember.Array}
     * @property conversations
     */
    conversationsBinding: 'EmberChat.Session.conversations'
});