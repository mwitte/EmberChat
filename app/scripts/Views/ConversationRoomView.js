require('scripts/Views/ConversationView');

/**
 *
 * @namespace EmberChat
 * @class ConversationRoomView
 * @extends Ember.View
 */
EmberChat.ConversationRoomView = Ember.View.extend({
    didInsertElement: function(){
        // enable bootstrap tooltips
        Ember.$(this.get('element')).find("[data-toggle='tooltip']").tooltip();
        // set focus to input
        Ember.$(this.get('element')).find("input[type='text']").focus();
    }
});