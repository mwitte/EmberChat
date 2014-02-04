test('User name', function() {
    var user = EmberChat.User.create({name: 'Matze'});
    var result = user.get('name');
    equal(result, 'Matze');
});

test('users', function(){
    var user = EmberChat.User.create({name: 'test', id: '123'});
    EmberChat.Session.set('availableUsers', Ember.A([user]));

    deepEqual(EmberChat.Session.findUserById('123'), user);
});