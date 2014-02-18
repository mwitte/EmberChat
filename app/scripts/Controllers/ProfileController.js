/**
 * The central application controller
 *
 * @namespace EmberChat
 * @class ProfileController
 */
EmberChat.ProfileController = Ember.Controller.extend({

    passwordMinLength: 7,

    errorMessage: null,

    currentPassword: '',
    password: '',
    passwordCheck: '',

    checkPassword: function(){
        if(this.get('password').length <= this.get('passwordMinLength')){
            this.set('errorMessage', 'Password is too short. At least ' + this.get('passwordMinLength') + ' needed.');
            return;
        }
        if(this.get('password') !== this.get('passwordCheck')){
            this.set('errorMessage', 'Passwords are not equal.');
            return;
        }
        var hash = Sha256.hash(this.get('password'));
        if(!hash){
            this.set('errorMessage', 'Could not hash given password.');
            return;
        }
        this.set('errorMessage', null);
        this.set('currentPassword', '');
        this.set('password', '');
        this.set('passwordCheck', '');
        return hash;
    },

    /**
     * Gets called if update was successful
     */
    updateSuccess: function(){
        var _this = this;
        this.set('successMessage', 'Successfully updated your profile.');
        Ember.run.later(this, function() {
            _this.set('successMessage', null);
        }, 3000);
    },

    /**
     * Gets called if update failed
     * @param message
     */
    updateFailed: function(message){
        this.set('errorMessage', 'Update failed.');
    },

    actions: {
        save: function(){
            var _this = this;
            if(this.get('password')){
                var passwordHash = this.checkPassword();
                var rawMessage = {
                    type: 'UpdateProfile',
                    profile: {
                        password: passwordHash,
                        currentPassword: Sha256.hash(this.get('currentPassword'))
                    }
                };
                EmberChat.MessageProcessor.processOutgoing(rawMessage);

                // subscript event listener
                Ember.Instrumentation.subscribe("signal.profileUpdated", {
                    before: function(name, timestamp, payload) {
                        if(payload.get('success')){
                            _this.updateSuccess();
                        }else{
                            _this.updateFailed(payload);
                        }
                    },
                    after: function() {}
                });
            }
        }
    }
});