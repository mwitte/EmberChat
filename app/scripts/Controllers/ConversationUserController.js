EmberChat.ConversationUserController = EmberChat.ConversationController.extend({
    actions: {
        send: function() {
            EmberChat.MessageProcessor.processOutgoing({type: 'message', user: this.get('user').get('id'), content: this.get('text')});
            this.set('text', '');
        },

        willTransition: function(transition){

            console.log(transition);
            //implement the behavior you want.
            // you can for example abort the transition if a condition is not fullfiled
            // by calling transition.abort().
        }
    }
});