test('EmberChat.Session.findUserById', function(){
    var user = EmberChat.User.create({name: 'test', id: '123'});
    EmberChat.Session.set('availableUsers', Ember.A([user]));
    deepEqual(EmberChat.Session.findUserById('123'), user);
});