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
        port: '8589',
        path: window.location.pathname + 'emberchat/socket'
    }
});

/**
 * Create the properties.js file to overwrite settings above
 */
require('scripts/properties');


require('scripts/Prototypes');
require('scripts/Classes/*');
require('scripts/Objects/*');
require('scripts/Controllers/*');
require('scripts/store');
require('scripts/Models/*');
require('scripts/Routes/*');
require('scripts/Components/*');
require('scripts/Views/*');
require('scripts/router');
