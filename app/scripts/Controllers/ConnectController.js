/**
 *
 * @namespace EmberChat
 * @class ConnectController
 * @extends Ember.Controller
 */
EmberChat.ConnectController = Ember.Controller.extend({

    /**
     * @property host
     * @type {string}
     */
    host: localStorage.host ? localStorage.host : 'appserver.local:8589',

    /**
     * @property path
     * @type {string}
     */
    path: localStorage.path ? localStorage.path : 'emberchat/socket',


    /**
     * Connect to server
     *
     * @param {String} host
     * @param {String} path
     */
    connect: function(host, path){
        EmberChat.Socket.connect(host, path);
        // delay connection
        Ember.run.later(this, function() {

        }, 100);
    },

    actions: {
        /**
         * Authenticate with form information
         */
        connect: function(){
            EmberChat.Socket.saveConnection(this.get('host'), this.get('path'));
            this.connect(this.get('host'), this.get('path'));
        }
    }
});