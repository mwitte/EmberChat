require('scripts/Classes/Messages/Abstract');

/**
 * This class represents a conversation message
 *
 * @class ConversationMessage
 * @extends EmberChat.AbstractMessage
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
        var conversation = this.getConversationObject();
        if(!conversation.get('isDisplayed')){
            this.doBackgroundTasks(conversation);
        }
        this.fillConversationObject(conversation);
        return true;
    },

    /**
     * Get always a valid Conversation object
     *
     * @method getConversationObject
     * @returns {EmberChat.Conversation}
     */
    getConversationObject: function(){
        throw new Ember.Error('Method getConversationObject needs do be implemented in '+ this.constructor.toString());
    },

    /**
     * Fill the conversion with the content of this message
     *
     * @method fillConversationObject
     * @param {EmberChat.Conversation} conversation
     */
    fillConversationObject: function(conversation) {
        var content = this.get('content');
        Ember.assert('ConversationMessage contains no content!', typeof content === 'object');
        if(conversation.get('content')){
            conversation.get('content').pushObjects(content);
        }else{
            conversation.set('content', Ember.A(content));
        }
    },

    /**
     * Certain tasks which should processed when the conversion is not displayed
     *
     * @method doBackgroundTasks
     * @param {EmberChat.Conversation} conversation
     */
    doBackgroundTasks: function(conversation){
        conversation.set('newMessages', parseInt(conversation.get('newMessages')) + 1);
    }
});