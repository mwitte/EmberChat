EmberChat.ConversationView = Ember.View.extend({

    conversationChanged: function(){
        var conversationContainer = Ember.$(this.get('element')).find('.conversation-content');

        if(conversationContainer && conversationContainer[0]){
            conversationContainer.animate({scrollTop: conversationContainer[0].scrollHeight}, 'fast');
        }
    }.observes('controller.user.conversation.@each'),

    didInsertElement: function(){

    }
});