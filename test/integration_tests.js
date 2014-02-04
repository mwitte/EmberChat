/**
 * Api doc for qunit:
 * http://api.qunitjs.com/category/assert/
 *
 * Integration Testing with ember.js:
 * http://emberjs.com/guides/testing/integration/
 */
module('integration tests', {
    setup: function() {
        Ember.run(function() {
            EmberChat.reset();
            EmberChat.deferReadiness();
        });
    },
    teardown: function() {
        //$.mockjaxClear();
    }
});

// not working so far
/*
test('simulate available users', function(){
    var user = EmberChat.User.create({name: 'test', id: '123'});
    EmberChat.Session.set('availableUsers', Ember.A([user]));
    Ember.run(EmberChat, 'advanceReadiness');
    var users = find('.userlist .list-group a').length;
    equal(users, 7);

});
*/