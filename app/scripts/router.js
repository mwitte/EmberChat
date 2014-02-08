/**
 * Global route mapping
 */
EmberChat.Router.map(function () {

    this.route('authenticate');
    this.route('rooms');

    this.resource('conversation', function () {
        this.route('user', {path: 'user/:id'});
        this.route('room', {path: 'room/:id'});
    });


});
