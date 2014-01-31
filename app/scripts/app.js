/*global Ember */
var EmberChat = window.EmberChat = Ember.Application.create({
    /**
     * log transitions in console
     * @var boolean
     */
    LOG_TRANSITIONS: true,

    /**
     * Connection Settings
     * @property server
     */
    server: {
        host: window.location.hostname,
        port: '61457',
        path: ''
    }
});

require('scripts/Prototypes.js');
require('scripts/Classes/*');
require('scripts/Objects/*');
require('scripts/Controllers/*');
require('scripts/store');
require('scripts/Models/*');
require('scripts/Routes/*');
require('scripts/Components/*');
require('scripts/Views/*');
require('scripts/router');
