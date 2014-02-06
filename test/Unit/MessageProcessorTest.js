module('Message Processor', {
    setup: function() {
        TestEnv.IntegrationHandler.setup();
    },
    teardown: function() {
        TestEnv.IntegrationHandler.tearDown();
    }
});

test('MessageProcessor throws Exception for unknown Message', function(){
    var rawMessage = {
        data: JSON.stringify({type: 'Unknown', user: {name: 'username', id: 123}})
    };
    throws(
        EmberChat.MessageProcessor.processIncoming(rawMessage)
    );
});