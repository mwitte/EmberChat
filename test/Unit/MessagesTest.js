module('Message Tests', {
    setup: function() {
        TestEnv.IntegrationHandler.setup();
    },
    teardown: function() {
        TestEnv.IntegrationHandler.tearDown();
    }
});

test('SettingsMessage creates Session User', function(){
    // create and process a settingsMessage
    EmberChat.ReceiveMsg.Settings.create({user: {name: 'username', id: 123}}).process();
    // determine if Session user got set with message data
    equal(EmberChat.Session.get('user').get('id'), 123);
});