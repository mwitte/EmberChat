/**
 * Creates a user
 *
 * @namespace EmberChat
 * @class AdminCreateUserController
 * @extends Ember.Controller
 */
EmberChat.AdminCreateUserController = Ember.Controller.extend({

    /**
     * @property forename
     * @type {string}
     */
    forename: '',

    /**
     * @property surname
     * @type {string}
     */
    surname: '',

    /**
     * @property auth
     * @type {string}
     */
    auth: '',

    /**
     * @property password
     * @type {string}
     */
    password: '',

    /**
     * @property admin
     * @type {boolean}
     */
    admin: false,

    /**
     * @property errorMessage
     * @type {string}
     */
    errorMessage: null,

    /**
     * Determines if the sending should be disabled or enabled
     *
     * @property disabled
     * @type {boolean}
     */
    disabled: function(){
        if(this.get('forename').length + this.get('surname').length >= 3 &&
            this.get('auth').length >= 3 &&
            this.get('password').length >= 4){
            return false;
        }
        return true;
    }.property('forename', 'surname', 'auth', 'password'),

    encryptedPassword: function(){
        return Sha256.hash(this.get('password'));
    }.property('password'),

    /**
     * Gets called if forename or surname changes, fills the auth field
     * @event preFillAuth
     */
    preFillAuth: function(){
        this.set('auth', this.get('surname').toLowerCase() + this.get('forename').toLowerCase().charAt(0));
    }.observes('forename', 'surname'),

    /**
     * Resets all form fields
     * @method reset
     */
    reset: function(){
        this.set('forename', '');
        this.set('surname', '');
        this.set('auth', '');
        this.set('password', '');
        this.set('admin', false);
    },

    /**
     * Gets called if update was successful
     * @event updateSuccess
     */
    updateSuccess: function(){
        var _this = this;
        this.set('successMessage', 'Successfully created user "' + this.get('forename') + ' '+ this.get('surname') +'" with auth "' + this.get('auth') + '"');
        this.reset();
        Ember.run.later(this, function() {
            _this.set('successMessage', null);
        }, 5000);
    },

    /**
     * Gets called if update failed
     * @event updateFailed
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
                    type: 'Admin\\CreateUser',
                    user: {
                        forename: this.get('forename'),
                        surname: this.get('surname'),
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