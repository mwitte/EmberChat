/**
 * This class is the abstract for all Message classes
 *
 * @class AbstractMessage
 * @namespace EmberChat
 */
EmberChat.AbstractMessage = Ember.Object.extend({

    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        throw new Ember.Error('Process method needs do be implemented in '+ this.constructor.toString());
    }
});