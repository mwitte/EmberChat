/**
 * View for all conversations
 *
 * @namespace EmberChat
 * @class ConversationView
 */
EmberChat.ConversationView = Ember.View.extend({

    /**
     * Classes used for this view
     *
     * @property classNames
     * @type {Array}
     */
    classNames: [''],

    /**
     * Gets called if the conversation content changed. Scrolls the viewport down.
     *
     * @event conversationChanged
     */
    conversationChanged: function(){
        var _this = this;
        this.scrollContent();
        Ember.run.later(function(){
            Ember.$(_this.get('element')).find('.conversation-content .content a').click(function(){
                EmberChat.DefaultEnvironment.openExternal(Ember.$(this).attr('href'));
                return false;
            });
        }, 20);
    }.observes('controller.conversation.content.@each'),

    /**
     * Scrolls the viewport for the content down
     *
     * @method scrollContent
     */
    scrollContent: function() {
        var _this = this;
        Ember.run.later(function(){
            var conversationContainer = Ember.$(_this.get('element')).find('.conversation-content');

            if(conversationContainer && conversationContainer[0]){
                conversationContainer.animate({scrollTop: conversationContainer[0].scrollHeight}, 'fast');
            }
        }, 10);

    }
});