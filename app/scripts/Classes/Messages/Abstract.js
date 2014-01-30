/**
 * This class is the abstract for all Message classes
 *
 * @namespace EmberChat
 * @class AbstractMessage
 */
EmberChat.AbstractMessage = Ember.Object.extend({

    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        Ember.warn('Process method needs do be implemented in '+ this.constructor.toString());
        return false;
    }
});