/**
 * Create rooms
 *
 * @class RoomCreateComponent
 * @namespace EmberChat
 * @extends Ember.Component
 */
EmberChat.RoomCreateComponent = Ember.Component.extend({

    classNames: ['room-create'],

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
            if(!_this.isDestroyed){
                _this.set('successMessage', null);
                Ember.$(_this.get('element')).find('.showForm').fadeIn('fast');
            }
        }, 5000);
        Ember.$(this.get('element')).find('form').fadeOut('fast');
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
            if(!_this.isDestroyed) _this.set('errorMessage', null);
        }, 5000);
    },

    /**
     * Gets called after rendering
     *
     * @event didInsertElement
     */
    didInsertElement: function(){
        var formElement = Ember.$(this.get('element')).find('form');
        var showFormElement = Ember.$(this.get('element')).find('.showForm');
        // hide with jQuery
        formElement.hide();
        // remove css hiding
        formElement.removeClass('hide');
        showFormElement.click(function(){
            showFormElement.fadeOut('fast', function(){
                formElement.fadeIn('fast');
            });
            return false;
        });
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