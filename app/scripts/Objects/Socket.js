require('scripts/Objects/MessageProcessor');
/**
 * The socket object is a singleton which provides the server connection
 *
 * @class Socket
 * @namespace EmberChat
 */
EmberChat.Socket = Ember.Object.create({

    /**
     * Determines the online state of the socket
     *
     * @type {boolean}
     * @property online
     */
    online: false,

    /**
     * @type {WebSocket}
     * @property socket
     */
    socket: null,

    /**
     * Amount of tries to reconnect
     *
     * @property autoConnectTries
     * @type int
     */
    autoConnectTries: 0,

    /**
     * Saves the given connection data, if empty deletes current
     *
     * @param {String} host
     * @param {String} path
     */
    saveConnection: function(host, path){
        if(host && path){
            localStorage.host = host;
            localStorage.path = path;
        }else{
            delete localStorage.host;
            delete localStorage.path;
        }
    },

    /**
     * Gets called when application loses connection
     *
     * @event autoConnect
     * @return {void}
     */
    autoConnect: function() {
        var _this = this;
        // only if there are connection settings, when user switches offline there should be no connection settings given
        if(localStorage.host && localStorage.path && _this.get('autoConnectTries') < 100){
            Ember.run.later(this, function() {
                if(_this.get('online') === false){
                    _this.connect(localStorage.host, localStorage.path);
                    _this.autoConnect();
                    _this.set('autoConnectTries', parseInt(_this.get('autoConnectTries'), "string") + 1);
                }
            }, 5000);
        }
    },

    /**
     * Opens the socket connection
     *
     * @method connect
     */
    connect: function(host, path) {
        // disable connection by global prop
        if( typeof EmberChat.socketDisabled !== 'undefined' && EmberChat.socketDisabled === true ){
            return;
        }
        if(!host || !path){
            return;
        }

        var _this = this;
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        // if browser does not support WebSockets
        if (!window.WebSocket) {
            Ember.warn("Browser does not support WebSockets");
            return;
        }
        if(this.get('socket')){
            this.get('socket').close();
        }

        // create socket
        var socket = new WebSocket('ws://' + host + '/' + path);
        // bind event listeners
        socket.onopen = function () {
            _this.onOpen();
        };
        socket.onerror = function (error) {
            socket.close();
            _this.onError(error);
        };
        socket.onclose = function () {
            _this.onClose();
        };
        socket.onmessage = function (message) {
            _this.onMessage(message);
        };
        // set object property
        this.set('socket', socket);
    },

    /**
     * Sends a message
     *
     * @param message
     * @method sendMessage
     */
    sendMessage: function(message) {
        if(this.get('online')){
            this.get('socket').send(message);
        }
    },

    /**
     * @event onOpen
     */
    onOpen: function() {
        this.set('online', true);
        this.set('autoConnectTries', 0);
        EmberChat.DefaultEnvironment.onConnected();
    },

    /**
     * @event onError
     * @param error
     */
    onError: function(error) {
        Ember.warn("Socket error: " + error);
        console.dir(error);
        this.set('online', false);
    },

    /**
     * @event onClose
     */
    onClose: function() {
        this.set('online', false);
        EmberChat.Session.onOfflineTasks();
        this.autoConnect();
    },

    /**
     * @event onMessage
     * @param message
     */
    onMessage: function(message) {
        EmberChat.MessageProcessor.processIncoming(message);
    }
});