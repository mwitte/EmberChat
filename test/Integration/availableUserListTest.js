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
module('UserList Test', {
    setup: function() {
        TestEnv.IntegrationHandler.setup();
    },
    teardown: function() {
        TestEnv.IntegrationHandler.tearDown();
    }
});

//@TODO Tests needs to get changed due authentication
/*
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

test("Open UserConversation, username is visible", function() {
    // Runs in runloop context
    Ember.run(function(){
        // create a user
        var user = EmberChat.User.create({name: 'AwesomeUserName', id: '123'});
        // add as available user
        EmberChat.Session.set('availableUsers', Ember.A([user]));
        // ensure that dom is rendered
        Ember.run(EmberChat, 'advanceReadiness');
        // click user in list
        click('.userlist .list-group a').then(function(){
            // find element which contains the username
            var domElements = find(".conversation .name");
            //
            ok(domElements.html().indexOf('AwesomeUserName') >= 0);
        });
    });
});
 */