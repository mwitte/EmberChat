require('scripts/Classes/Messages/ConversationMessage');
require('scripts/Classes/User');

/**
 * When a user joins a room
 *
 * @class RoomJoinMessage
 * @extends EmberChat.RoomConversationMessage
 * @namespace EmberChat
 */
EmberChat.RoomJoinMessage = EmberChat.RoomConversationMessage.extend({


    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        var messageUserObject = EmberChat.User.create(this.get('user'));
        if(messageUserObject.get('id') === EmberChat.Session.get('user').get('id')){
            return false;
        }
        var conversation = this.getConversationObject();
        if(conversation.get('users') === null){
            conversation.set('users', Ember.A());
        }

        this.roomUsers(conversation);

        var content = this.userChange(conversation);
        if(!content){
            return false;
        }

        this.publishContent(conversation, content);

        return true;
    },

    publishContent: function(conversation, content) {
        if(this.get('user').id === EmberChat.Session.get('user').get('id')){
            return false;
        }

        if(conversation.get('content')){
            conversation.get('content').pushObjects(content);
        }else{
            conversation.set('content', Ember.A(content));
        }
        return true;
    },

    userChange: function(conversation){

        var messageUserObject = EmberChat.User.create(this.get('user'));
        var user = EmberChat.Session.findUserById(messageUserObject.get('id'));
        // if the user could not be found the joining user is the session user
        if(!user){
            return false;
        }
        if(!conversation.get('users').findBy('id', user.get('id'))){
            // append joining user
            conversation.get('users').pushObject(user);
            return this.createContent(user);
        }


        return null;
    },

    roomUsers: function(conversation){
        var userArray = this.get('users');
        if(userArray){
            for(var i=0; i<userArray.length; i++){
                var listUser = EmberChat.Session.findUserById(userArray[i].id);
                // if the user could not be found the joining user is the session user
                if(!listUser){
                    continue;
                }
                if(!conversation.get('users').findBy('id', listUser.get('id'))){
                    conversation.get('users').pushObject(listUser);
                }
            }
        }
    },

    createContent: function(user) {
        return [{info: true, content: user.get('name') + ' joined'}];
    }
});