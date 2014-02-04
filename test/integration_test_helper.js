document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

EmberChat.rootElement = '#ember-testing';
EmberChat.setupForTesting();
EmberChat.injectTestHelpers();

function exists(selector) {
    return !!find(selector).length;
}