require('scripts/Objects/Messages/Abstract');

/**
 * This class represents all settings messages
 *
 * @class UserListMessage
 * @namespace EmberChat
 */
EmberChat.ConversationMessage = EmberChat.AbstractMessage.extend({

    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        var content = this.get('content');
        var user = EmberChat.Session.findUserById(this.get('user'));
        if(!user) {
            return false;
        }
        if(!user.get('isDisplayed')){
            this.background(user);
        }
        if(!user.get('conversation')){
            user.set('conversation', Ember.A(content));
        }else{
            user.get('conversation').pushObjects(content);
        }
        return true;
    },

    background: function(user){
        user.set('newMessages', parseInt(user.get('newMessages')) + 1);
    }
});