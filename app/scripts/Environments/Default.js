/**
 * Wraps all ChromeApp Api
 *
 * @class DefaultEnvironment
 * @namespace EmberChat
 */
EmberChat.DefaultEnvironment = Ember.Object.create({

    /**
     * Determines if the window is currently in focus
     *
     * @property inFocus
     * @type {boolean}
     */
    inFocus: false,

    init: function(){
        var _this = this;
        window.onfocus = function() {
            _this.set('inFocus', true);
        };
        window.onblur = function() {
            _this.set('inFocus', false);
        };
    }
});