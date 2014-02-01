/**
 * Displays a list of the available users
 *
 * @class UserListComponent
 * @namespace EmberChat
 */
EmberChat.UserListComponent = Ember.Component.extend({

    /**
     * All available users
     *
     * @property availableUsers
     * @type {Ember.Array}
     */
    usersBinding: 'EmberChat.Session.availableUsers'
});