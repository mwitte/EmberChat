/**
 * Information about the current session and actions like connect and disconnect
 *
 * @class SessionInfoComponent
 * @namespace EmberChat
 */
EmberChat.UserInfoComponent = Ember.Component.extend({
    actions: {
        closeConversation:  function() {
            this.sendAction('closeConversation');
        }
    }
});