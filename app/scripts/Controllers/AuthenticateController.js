/**
 * Controller for authentication. The password on credential authentication will not be transmitted as plain text.
 * This is very important because this is a stateful application.
 * So nobody can read the password even with access to the browser after credential authentication.
 * The evil guy may thieve the token, so he does with usual session cookies but he will not read the password.
 *
 * @namespace EmberChat
 * @class AuthenticateController
 * @extends Ember.Controller
 */
EmberChat.AuthenticateController = Ember.Controller.extend({

    /**
     * @property auth
     * @type {string}
     */
    auth: null,

    /**
     * @property password
     * @type {string}
     */
    password: null,

    /**
     * @property keep
     * @type {boolean}
     */
    keep: false,

    actions: {
        /**
         * Authenticate with form information
         */
        authenticate: function(){
            if(this.get('auth') && this.get('password')){
                var rawMessage = {
                    type: 'authentication',
                    auth: this.get('auth'),
                    // one way encrypt the password
                    password: Sha256.hash(this.get('password')),
                    keep: this.get('keep')
                };
                this.set('password', '');
                EmberChat.MessageProcessor.processOutgoing(rawMessage);
            }else{
                this.set('message', 'You should add some credentials ;)');
            }
        },

        /**
         * @TODO devAuth just for development
         */
        devAuth: function(auth){
            var rawMessage = {
                type: 'authentication',
                auth: auth,
                // one way encrypt the password
                password: Sha256.hash('password'),
                keep: false
            };
            EmberChat.MessageProcessor.processOutgoing(rawMessage);
        }
    }
});