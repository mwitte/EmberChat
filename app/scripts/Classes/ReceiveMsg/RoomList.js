require('scripts/Classes/ReceiveMsg/AbstractList');

/**
 * This class represents the user list messages.
 *
 * @class RoomList
 * @extends EmberChat.ReceiveMsg.AbstractList
 * @namespace EmberChat.ReceiveMsg
 */
EmberChat.ReceiveMsg.RoomList = EmberChat.ReceiveMsg.AbstractList.extend({

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
    },

    /**
     * Closes all room conversations which are not valid rooms
     *
     * @method closeRoomConversations
     * @param {array} existingRooms
     */
    closeRoomConversations: function(existingRooms){
        var conversations = EmberChat.Session.get('conversations');

        // iterate all open conversations
        for(var i=0; i < conversations.length; i++){
            // only room conversations
            if(conversations[i].get('room')){
                var conversationFoundInRoomList = false;
                // try to find given room conversation in room list
                for(var j=0; j < existingRooms.length;j++){
                    var listRoom = existingRooms[j];
                    if(listRoom.id === conversations[i].get('id')){
                        conversationFoundInRoomList = true;
                    }
                }
                if(!conversationFoundInRoomList){
                    conversations[i].set('closed', true);
                }
            }

        }
    },

    /**
     * Updates the given listContainer with the given updateList
     *
     * @method updateListContainer
     * @param {Ember.Array} updateList
     * @param {Ember.Array} listContainer
     * @return {void}
     */
    updateListContainer: function(updateList, listContainer){
        this.closeRoomConversations(updateList);
        this._super(updateList, listContainer);
    }
});