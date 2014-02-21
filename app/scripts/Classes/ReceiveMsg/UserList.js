require('scripts/Classes/ReceiveMsg/AbstractList');

/**
 * This class represents the user list messages.
 *
 * @class UserList
 * @extends EmberChat.ReceiveMsg.AbstractList
 * @namespace EmberChat.ReceiveMsg
 */
EmberChat.ReceiveMsg.UserList = EmberChat.ReceiveMsg.AbstractList.extend({

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