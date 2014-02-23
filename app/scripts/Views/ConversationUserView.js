require('scripts/Views/ConversationView');

/**
 *
 * @namespace EmberChat
 * @class ConversationUserView
 * @extends EmberChat.AbstractConversationView
 */
EmberChat.ConversationUserView = EmberChat.AbstractConversationView.extend({

    /**
     * @event didInsertElement
     */
    didInsertElement: function(){
        var _this = this;
        this._super();
        Ember.run.later(function(){
            // enable bootstrap tooltips
            Ember.$(_this.get('element')).find("[data-toggle='tooltip']").tooltip();
            // set focus to input
            Ember.$(_this.get('element')).find("input[type='text']").focus();
        }, 40);
    }
});