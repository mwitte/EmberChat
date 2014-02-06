
var TestEnv = {

};

/**
 * IntegrationHandler
 *
 * Default handler for setup and tear down of integration tests. Should be called in setup and teardown method of
 * every integration test module
 * @type {object}
 * @class IntegrationHandler
 * @namespace TestEnv
 */
TestEnv.IntegrationHandler = {

    /**
     * Creates dom element for application, sets root element and sets up the application for testing
     *
     * @method setup
     * @return {void}
     */
    setup: function(){
        document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
        EmberChat.reopen({
            rootElement: '#ember-testing',
            socketDisabled: true
        });
        EmberChat.socketDisabled = true;

        EmberChat.rootElement = '#ember-testing';
        EmberChat.setupForTesting();
        EmberChat.injectTestHelpers();
        EmberChat.reset();
    },

    /**
     * Undoes setup
     *
     * @method tearDown
     * @return {void}
     */
    tearDown: function() {
        var element = document.getElementById("ember-testing-container");
        element.parentNode.removeChild(element);
    }
};