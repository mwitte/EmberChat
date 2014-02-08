/**
 * The Conversation object class represents a conversation
 *
 * @class Conversation
 * @namespace EmberChat
 */
EmberChat.Conversation = Ember.Object.extend({

    /**
     * The name of the conversation
     * @property name
     * @type {string}
     */
    name: null,

    id: null,

    content: null,

    newMessages: 0,

    room: null,

    user: null
});