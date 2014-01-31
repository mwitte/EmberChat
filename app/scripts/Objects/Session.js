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

    /**
     * The available users
     *
     * @property availableUsers
     * @type {Ember.Array}
     */
    availableUsers: Ember.A(),

    /**
     * The opened conversations
     *
     * @property conversations
     * @type {Ember.Array}
     */
    conversations: Ember.A(),

    /**
     * Returns the Ember.User for the given id or null
     *
     * @method findUserById
     * @param {string} id
     * @returns {EmberChat.User|null}
     */
    findConversationById: function(id) {
        var conversations = this.get('conversations');
        for(var i=0; i < conversations.length; i++) {
            if(conversations.objectAt(i).get('id') === id){
                return conversations.objectAt(i);
            }
        }
        return null;
    },

    /**
     * Returns the Ember.User for the given id or null
     *
     * @method findUserById
     * @param {string} id
     * @returns {EmberChat.User|null}
     */
    findUserById: function(id) {
        var users = this.get('availableUsers');
        for(var i=0; i < users.length; i++) {
            if(users.objectAt(i).get('id') === id){
                return users.objectAt(i);
            }
        }
        return null;
    }
});