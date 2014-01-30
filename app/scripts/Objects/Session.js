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

    conversation: Ember.A(),

    availableUsers: Ember.A(),

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