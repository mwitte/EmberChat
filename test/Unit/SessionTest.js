module('Session', {
    setup: function() {
        TestEnv.IntegrationHandler.setup();
    },
    teardown: function() {
        TestEnv.IntegrationHandler.tearDown();
    }
});

test('findUserById', function(){
    var user = EmberChat.User.create({name: 'test', id: '123'});
    EmberChat.Session.set('availableUsers', Ember.A([user]));
    deepEqual(EmberChat.Session.findUserById('123'), user);
});