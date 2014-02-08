/**
 * Controller for authentication
 *
 * @namespace EmberChat
 * @class AuthenticateController
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
                    password: this.get('password'),
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
                password: 'password',
                keep: false
            };
            EmberChat.MessageProcessor.processOutgoing(rawMessage);
        }
    }
});