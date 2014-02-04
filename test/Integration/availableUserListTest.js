/**
 * Api doc for qunit:
 * http://api.qunitjs.com/category/assert/
 *
 * Integration Testing with ember.js:
 * http://emberjs.com/guides/testing/integration/
 */

/**
 * define the context fo this tests
 */
module('integration tests', {
    setup: function() {
        TestEnv.IntegrationHandler.setup();
    },
    teardown: function() {
        TestEnv.IntegrationHandler.tearDown();
    }
});

test("Are availableUsers visible", function() {
    // Runs in runloop context
    Ember.run(function(){
        // create two users
        var userA = EmberChat.User.create({name: 'usera', id: '123'});
        var userB = EmberChat.User.create({name: 'userb', id: '124'});
        // add them as availableUsers
        EmberChat.Session.set('availableUsers', Ember.A([userA, userB]));
        // ensure that dom is rendered
        Ember.run(EmberChat, 'advanceReadiness');
        // search for visible users
        var domElements = find(".userlist .list-group a");
        // there should be two users
        equal(domElements.length, 2, 'Found visible users in .userlist');
    });
});