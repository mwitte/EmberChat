/**
 * The view for one single advice
 *
 * @class AdviceView
 * @extends Ember.View
 * @namespace EmberChat
 */
EmberChat.AdviceView = Ember.View.extend({

    /**
     * @property templateName
     * @type {string}
     */
    templateName: function(){
        var type = this.get('content').get('type') ? this.get('content').get('type') : 'default';
        return 'advice/' + type;
    }.property(),

    /**
     * Gets called when dom get's inserted
     * @event didInsertElement
     */
    didInsertElement: function() {
        var _this = this;
        Ember.$(this.get('element')).hide();
        Ember.$(this.get('element')).slideDown('fast', '', function() {
            _this.didShow();
        });
    },

    /**
     * Hides the advice with fx
     * @method hideFx
     */
    hideFx: function(){
        var _this = this;
        Ember.$(this.get('element')).slideUp('slow', '', function() {
            _this.didHide();
        });
    },

    /**
     * Gets called when the advice got showed completely
     * @event didShow
     */
    didShow: function() {
        var _this = this;
        if(this.get('content.static')){
            Ember.$(this.get('element')).find('.close-action').click(function() {
                _this.hideFx();
            });
        }else{
            Ember.run.later(function(){
                _this.hideFx();
            }, 2000);
        }
    },

    /**
     * Gets called when the advice got hided completely
     * @event didHide
     */
    didHide: function(){
        this.get('controller').shiftMessage(this.get('content'));
    }
});