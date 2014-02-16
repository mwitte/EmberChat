/**
 * Global route mapping
 */
EmberChat.Router.map(function () {

    this.route('connect');
    this.route('authenticate');
    this.route('rooms');
    this.route('profile');

    this.resource('conversation', function () {
        this.route('user', {path: 'user/:id'});
        this.route('room', {path: 'room/:id'});
    });


});
