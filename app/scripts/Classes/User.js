require('scripts/Classes/Participant');

/**
 * The user class
 *
 * @class User
 * @extends EmberChat.Participant
 * @namespace EmberChat
 */
EmberChat.User = EmberChat.Participant.extend({

    /**
     * Name of this participant
     *
     * @property name
     * @type {string}
     */
    forename: null,

    /**
     * Name of this participant
     *
     * @property name
     * @type {string}
     */
    surname: null,

    /**
     * The full name of the user as dynamic property
     *
     * @property name
     * @type {string}
     */
    name: function(){
        return this.get('forename') + ' ' + this.get('surname');
    }.property('forename', 'surname')
});