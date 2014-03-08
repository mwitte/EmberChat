/**
 * Displays messages
 *
 * @class AdviceComponent
 * @namespace EmberChat
 */
EmberChat.AppAdviceComponent = Ember.Component.extend({

    /**
     * Contains all advices
     *
     * @property advices
     * @type {Ember.Array}
     */
    advices: [],

    /**
     * Searches given message and removes it from messages
     * @method shiftMessage
     * @param {Ember.Object} advice
     */
    shiftMessage: function(advice) {
        var advices = this.get('advices');
        for(var i=0; i < advices.length; i++){
            if(advice === advices[i]) {
                advices.removeAt(i);
            }
        }
    },

    /**
     *
     */
    messageSaver: function() {
        this.get('advices').pushObject(this.get('newAdvice'));
    }.observes('newAdvice'),

    newAdviceBinding: 'EmberChat.Advice.message'
});