require('scripts/Classes/ReceiveMsg/Abstract');

/**
 * This class represents the user list messages.
 *
 * @class AbstractList
 * @extends EmberChat.ReceiveMsg.Abstract
 * @namespace EmberChat.ReceiveMsg
 */
EmberChat.ReceiveMsg.AbstractList = EmberChat.ReceiveMsg.Abstract.extend({

    /**
     * Process this message
     *
     * @method process
     * @returns {boolean}
     */
    process: function() {
        var updateList = this.get('content');
        Ember.assert( this.constructor.toString() + ' contains no content!', typeof updateList === 'object');
        Ember.assert(
            this.constructor.toString() + ' needs a listContainer property',
            typeof this.get('listContainer') === 'object'
        );
        this.updateListContainer(updateList, this.get('listContainer'));
        return true;
    },

    /**
     * Gets called by updateListContainer method if an element in the updateList was not in
     * the listContainer
     *
     * @param updateList
     * @param listContainer
     * @returns {void}
     */
    createListElement: function(updateList, listContainer){
        throw new Ember.Error('Method createListElement needs do be implemented in '+ this.constructor.toString());
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
        for(var ia=0; ia < listContainer.length; ia++){
            var listElement = updateList.findBy('id', listContainer[ia].get('id'));
            // could not find a listElement for this available User
            if(!listElement){
                // the user is not existing in message so remove him
                listContainer.removeObject(listContainer[ia]);
                continue;
            }
            // set properties
            listContainer[ia].setProperties(listElement);
            // remove listElement
            updateList.removeObject(listElement);
        }
        this.createListElement(updateList, listContainer);
    }
});