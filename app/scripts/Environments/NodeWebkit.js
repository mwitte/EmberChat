require('scripts/Default');

/**
 * Wraps all NodeWebkit Api
 *
 * @class NodeWebkitEnvironment
 * @namespace EmberChat
 * @extends Ember.Object
 */
EmberChat.NodeWebkitEnvironment = Ember.Object.create({

    init: function(){
    },

    /**
     * Determine if this environment is current context
     *
     * @method isEnv
     * @returns {boolean}
     */
    isEnv: function(){
        return (typeof process !=='undefined' && typeof process.versions !=='undefined' && typeof process.versions['node-webkit'] !=='undefined');
    },

    /**
     * Create a new notification
     *
     * @method newNotification
     * @param title
     * @param message
     * @param id
     */
    newNotification: function(title, message, id) {
        if(!this.isEnv()){
            return false;
        }

        // @TODO seems not working in node webkit context
        if(EmberChat.DefaultEnvironment.get('inFocus')){
            //return false;
        }

        // creates a new notification
        window.LOCAL_NW.desktopNotifications.notify(
            'app://a/images/static/icon-128.png',
            title,
            message,
            function(){}
        );
    },

    /**
     * Gets called when app got a web-socket connection
     *
     * @event onConnected
     */
    onConnected: function() {
        // creates a new notification
        window.LOCAL_NW.desktopNotifications.notify(
            //@TODO path seems strange
            'app://a/images/static/icon-128.png',
            "EmberChat",
            "connected",
            function(){}
        );
    },

    /**
     * Open external url
     *
     * @method openExternal
     * @param {string} url
     */
    openExternal: function(url) {
        if(!this.isEnv()) return;
        var gui = require('nw.gui');
        gui.Shell.openExternal(url);
    }
});