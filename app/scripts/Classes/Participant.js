/**
 * The Participant class is the abstract for a user or a room
 *
 * @class Participant
 * @extends Ember.Object
 * @namespace EmberChat
 */
EmberChat.Participant = Ember.Object.extend({

    /**
     * Name of this participant
     *
     * @property name
     * @type {string}
     */
    name: null,

    /**
     * Unique id for this participant
     *
     * @property id
     * @type {string}
     */
    id: null,

    /**
     * Amount of unread messages
     *
     * @property newMessages
     * @type {integer}
     */
    newMessages: 0
});