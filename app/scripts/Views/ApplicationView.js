/**
 *
 * @namespace EmberChat
 * @class ApplicationView
 * @extends EmberChat.AbstractConversationView
 */
EmberChat.ApplicationView = Ember.View.extend({

    /**
     * @event didInsertElement
     */
    didInsertElement: function(){
        // enable bootstrap tooltips
        Ember.$(this.get('element')).find("[data-toggle='tooltip']").tooltip();

        this.adjustContainerSizes();
    },

    /**
     * Keeps specific containers on the right size
     *
     * @method adjustContainerSizes
     */
    adjustContainerSizes: function() {
        // resize the vertical scroll containers depending on the viewport size
        var resizeListContainer = function() {
            var height = Ember.$(window).height();
            if(height < 300) return false;
            height = height - 10;
            window.addCss('div.scroll-v', ['max-height: '+ (height - 90) +'px'], 'screen and (min-width: 768px)');
            window.addCss('div.scroll-v-mid', ['max-height: '+ (height - 150) +'px'], 'screen and (min-width: 768px)');
            window.addCss('div.scroll-v-conversation', ['max-height: '+ (height - 191) +'px'], 'screen and (min-width: 768px)');
            window.addCss('div.scroll-v-conversation.room', ['max-height: '+ (height - 166) +'px'], 'screen and (min-width: 768px)');
        };

        // bind event on viewport size change
        Ember.$(window).on('resize', function() {
            resizeListContainer();
        });
        resizeListContainer();
    }
});