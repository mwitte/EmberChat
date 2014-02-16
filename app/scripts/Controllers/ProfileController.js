/**
 * The central application controller
 *
 * @namespace EmberChat
 * @class ProfileController
 */
EmberChat.ProfileController = Ember.Controller.extend({

    passwordMinLength: 7,

    errorMessage: null,

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
        this.set('password', '');
        this.set('passwordCheck', '');
        return hash;
    },

    actions: {
        save: function(){
            if(this.get('password')){
                var passwordHash = this.checkPassword();
                var rawMessage = {
                    type: 'updateProfile',
                    profile: {
                        password: passwordHash
                    }
                };
                EmberChat.MessageProcessor.processOutgoing(rawMessage);
            }
        }
    }
});