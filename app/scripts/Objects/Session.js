/**
 * Contains all session related data like the logged in user, other users etc.
 *
 * @class Session
 * @namespace EmberChat
 */
EmberChat.Session = Ember.Object.create({
    /**
     * The current user
     *
     * @property user
     * @type {EmberChat.User}
     */
    user: EmberChat.User.create(),
    conversations: Ember.A(),
    availableUsers: Ember.A()
});