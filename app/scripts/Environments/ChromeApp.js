require('scripts/Default');

/**
 * Wraps all ChromeApp Api
 *
 * @class ChromeAppEnvironment
 * @namespace EmberChat
 */
EmberChat.ChromeAppEnvironment = Ember.Object.create({

    /**
     * uniquie id for each notification
     */
    notificationId: 0,

    /**
     * Determine if this environment is current context
     * @returns {boolean}
     */
    isEnv: function(){
        return (typeof chrome !== 'undefined');
    },

    /**
     * Create a new notification
     * @param title
     * @param message
     * @param id
     */
    newNotification: function(title, message, id){
        if(!this.isEnv() || EmberChat.DefaultEnvironment.get('inFocus')){
            return false;
        }
        // @todo is this useful?
        if(!id){
            id = parseInt(this.get('notificationId'), "string");
            this.set('notificationId', id + 1);
        }
        var opt = {
            type: "basic",
            title: title,
            message: message,
            iconUrl: "images/static/icon-48.png"
        };
        chrome.notifications.create(id.toString(), opt, function(){});
    }
});