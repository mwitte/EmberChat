/**
 * The user class
 *
 * @class User
 * @namespace EmberChat
 */
EmberChat.User = Ember.Object.extend({

    /**
     * Name of this user
     *
     * @property name
     * @type {string}
     */
    name: null,

    /**
     * Unique id for this user
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