/**
 * Global route mapping
 */
EmberChat.Router.map(function () {

    this.resource('conversation', function () {
        this.route('user', {path: 'user/:id'});
    });

});
