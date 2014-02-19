/**
 * The central application controller
 *
 * @namespace EmberChat
 * @class AdminCreateUserController
 * @extends Ember.Controller
 */
EmberChat.AdminCreateUserController = Ember.Controller.extend({

    name: '',
    auth: '',
    password: '',
    admin: false,

    disabled: function(){
        if(this.get('name').length > 4 && this.get('auth').length > 4 && this.get('password').length > 4){
            return false;
        }
        return true;
    }.property('name', 'auth', 'password'),

    encryptedPassword: function(){
        return Sha256.hash(this.get('password'));
    }.property('password'),

    preFillAuth: function(){
        this.set('auth', this.get('name'));
    }.observes('name'),

    errorMessage: null,

    reset: function(){
        this.set('name', '');
        this.set('auth', '');
        this.set('password', '');
        this.set('admin', false);
    },

    /**
     * Gets called if update was successful
     */
    updateSuccess: function(){
        var _this = this;
        this.set('successMessage', 'Successfully created user "' + this.get('name') + '" with auth "' + this.get('auth') + '"');
        this.reset();
        Ember.run.later(this, function() {
            _this.set('successMessage', null);
        }, 5000);
    },

    /**
     * Gets called if update failed
     * @param message
     */
    updateFailed: function(message){
        var _this = this;
        this.set('errorMessage', 'Failed to create user: ' + message);
        Ember.run.later(this, function() {
            _this.set('errorMessage', null);
        }, 5000);
    },

    actions: {
        save: function(){
            var _this = this;
            if(this.get('password')){
                var rawMessage = {
                    type: 'Admin',
                    subType: 'CreateUser',
                    user: {
                        name: this.get('name'),
                        auth: this.get('auth'),
                        password: Sha256.hash(this.get('password')),
                        admin: this.get('admin')
                    }
                };
                EmberChat.MessageProcessor.processOutgoing(rawMessage);

                // subscript event listener
                Ember.Instrumentation.subscribe("signal.admin.CreateUser", {
                    before: function(name, timestamp, payload) {
                        if(payload.get('success')){
                            _this.updateSuccess();
                        }else{
                            _this.updateFailed(payload.get('message'));
                        }
                    },
                    after: function() {}
                });
            }
        }
    }
});