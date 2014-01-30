var EmberChat = window.EmberChat = Ember.Application.create({
    /**
     * log transitions in console
     * @var boolean
     */
    LOG_TRANSITIONS: true,

    host: 'localhost',
    port: '61457',
    path: ''
});

require('scripts/Prototypes.js');
require('scripts/Classes/*');
require('scripts/Objects/*');
require('scripts/Controllers/*');
require('scripts/store');
require('scripts/Models/*');
require('scripts/Routes/*');
require('scripts/Views/*');
require('scripts/router');
