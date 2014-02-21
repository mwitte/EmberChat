/**
 * Create rooms
 *
 * @class RoomCreateComponent
 * @namespace EmberChat
 * @extends Ember.Component
 */
EmberChat.RoomCreateComponent = Ember.Component.extend({

    /**
     * Shows success message
     *
     * @method createSuccess
     */
    createSuccess: function(){
        var _this = this;
        this.set('successMessage', 'Successfully created room "' + this.get('name'));
        this.set('name', '');
        Ember.run.later(this, function() {
            _this.set('successMessage', null);
        }, 5000);
    },

    /**
     * Shows error if something is wrong
     *
     * @method createFailed
     * @param message
     */
    createFailed: function(message){
        var _this = this;
        this.set('errorMessage', 'Failed to create room: ' + message);
        Ember.run.later(this, function() {
            _this.set('errorMessage', null);
        }, 5000);
    },

    actions: {
        /**
         * creates a new room
         */
        create: function() {
            var _this = this;
            if(this.get('existingRooms').findBy('name', this.get('name'))){
                this.createFailed("There is already a room with this name");
                return;
            }

            // subscript event listener
            Ember.Instrumentation.subscribe("signal.admin.CreateRoom", {
                after: function(name, timestamp, payload) {
                    if(payload.get('success')){
                        _this.createSuccess();
                    }else{
                        _this.createFailed(payload.get('message'));
                    }
                }
            });

            var rawMessage = {
                type: 'Room\\Create',
                room: {
                    name: this.get('name')
                }
            };
            EmberChat.MessageProcessor.processOutgoing(rawMessage);
        }
    }

});