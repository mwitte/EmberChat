require('scripts/Classes/Messages/AbstractList');

/**
 * This class represents the user list messages.
 *
 * @class RoomListMessage
 * @extends EmberChat.AbstractListMessage
 * @namespace EmberChat
 */
EmberChat.RoomListMessage = EmberChat.AbstractListMessage.extend({

    /**
     * Container for the rooms
     * @property listContainer
     * @type {Ember.Array}
     */
    listContainerBinding: 'EmberChat.Session.availableRooms',

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
            listContainer.pushObject(EmberChat.User.create(updateList[j]));
        }
    }
});