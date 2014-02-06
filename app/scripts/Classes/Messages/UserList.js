require('scripts/Classes/Messages/AbstractList');

/**
 * This class represents the user list messages.
 *
 * @class UserListMessage
 * @extends EmberChat.AbstractListMessage
 * @namespace EmberChat
 */
EmberChat.UserListMessage = EmberChat.AbstractListMessage.extend({

    /**
     * Container for the users
     * @property listContainer
     * @type {Ember.Array}
     */
    listContainerBinding: 'EmberChat.Session.availableUsers',

    /**
     * Gets called by updateListContainer method if an element in the updateList was not in
     * the listContainer
     *
     * @param updateList
     * @param listContainer
     * @returns {void}
     */
    createListElement: function(updateList, listContainer){
        // unprocessed updateList
        for(var j=0; j < updateList.length; j++){
            listContainer.pushObject(EmberChat.Room.create(updateList[j]));
        }
    }
});