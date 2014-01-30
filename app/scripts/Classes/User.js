/**
 * The user class
 *
 * @class User
 * @namespace EmberChat
 */
EmberChat.User = Ember.Object.extend({

    /**
     * @property name
     * @type {string}
     */
    name: null,

    /**
     * @property id
     * @type {string}
     */
    id: null,

    newMessages: 0

});