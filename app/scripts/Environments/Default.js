/**
 * Wraps all environment api
 *
 * @class DefaultEnvironment
 * @namespace EmberChat
 * @extends Ember.Object
 */
EmberChat.DefaultEnvironment = Ember.Object.create({

    /**
     * Determines if the window is currently in focus
     *
     * @property inFocus
     * @type {boolean}
     */
    inFocus: true,

    init: function(){
        var _this = this;
        window.onfocus = function() {
            _this.set('inFocus', true);
        };
        window.onblur = function() {
            _this.set('inFocus', false);
        };
    },

    /**
     * Creates a new notification
     *
     * @method newNotification
     * @param {String} title
     * @param {String} message
     * @param {String} id
     */
    newNotification: function(title, message, id) {
        if(EmberChat.ChromeAppEnvironment.isEnv()){
            EmberChat.ChromeAppEnvironment.newNotification(title, message, id);
        }
        if(EmberChat.NodeWebkitEnvironment.isEnv()){
            EmberChat.NodeWebkitEnvironment.newNotification(title, message, id);
        }
    },

    /**
     * Gets called when app got a web-socket connection
     *
     * @event onConnected
     */
    onConnected: function(){
        if(EmberChat.NodeWebkitEnvironment.isEnv()) {
            EmberChat.NodeWebkitEnvironment.onConnected();
        }
    },

    /**
     * Open external url
     *
     * @method openExternal
     * @param {string} url
     */
    openExternal: function(url) {
        if(typeof url === 'undefined'){
            throw new Ember.Error('Now url provided for external opening. '+ this.constructor.toString());
        }
        if(EmberChat.NodeWebkitEnvironment.isEnv()){
            EmberChat.NodeWebkitEnvironment.openExternal(url);
        }else{
            window.open(url, '_blank');
        }
    }
});