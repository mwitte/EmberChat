/**
 * Abstract for specific conversation views
 *
 * @namespace EmberChat
 * @class AbstractConversationView
 * @extends Ember.View
 */
EmberChat.AbstractConversationView = Ember.View.extend({

    /**
     * Current position in the history
     *
     * @property historyPosition
     * @type {Ember.Array}
     */
    historyPositionBinding: 'controller.historyPosition',

    /**
     * @event didInsertElement
     */
    didInsertElement: function(){
        var _this = this;
        Ember.$(this.get('element')).find('input[type=text]').unbind('keydown');
        Ember.$(this.get('element')).find('input[type=text]').keydown(function(event) {
            // arrow up and down
            if(event.keyCode === 38 || event.keyCode === 40){
                _this.browseHistory(event.keyCode);
            }
        });
    },

    /**
     * Browse the history of sent messages with the arrow keys
     * @method browseHistory
     * @param {int} keyCode
     */
    browseHistory: function(keyCode) {
        var sentContent = this.get('controller.conversation').get('sentContent');
        // arrow up
        if(keyCode === 38){
            if(sentContent.length > this.get('historyPosition')){
                this.set('historyPosition', parseInt(this.get('historyPosition'), 'string') + 1);
            }
        }
        // arrow down
        else{
            if(this.get('historyPosition') > 0){
                this.set('historyPosition', parseInt(this.get('historyPosition'), 'string') - 1);
            }
        }
        var prevMsg = sentContent.objectAt(sentContent.length - this.get('historyPosition'));
        var fieldText = '';
        if(typeof prevMsg !== 'undefined'){
            fieldText = prevMsg;
        }
        this.get('controller').set('text', fieldText);
    }
});