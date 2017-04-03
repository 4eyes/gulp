/*global Modernizr*/
(function (window, $, undefined) {
    'use strict';

    if ($ === undefined) {
        alert('Error: jQuery not loaded!');
        return;
    }

    var X4e = window.X4e || {},
        NotificationHandler = X4e.NotificationHandler || (X4e.NotificationHandler = {})
        ;

    var Notification = function ($container) {
        this.$container = $container;
        this.init();
    };

    $.extend(true, NotificationHandler, {
        Selectors: {
            container: '[data-notification-event]'
        },
        $allContainer: null,
        instances: [],
        init: function () {
            var self = this;
            this.$allContainer = $(this.Selectors.container);
            this.$allContainer.each(function (i) {
                var $container = $(this);
                if ($container.length) {
                    var id = i + 1;
                    $container.attr('data-notification-id', id);
                    self.instances[id] = new Notification($container);
                }
            });
        },
        onDocumentReadyTests: function () {
            if (!((Modernizr.flexbox|| Modernizr.flexboxtweener) && Modernizr.flexwrap)) {
                $(document).triggerHandler('x4e:notification:event:show:no-flexbox');
            }
        },
        getInstanceById: function (id) {
            if (this.instances[id]) {
                return this.instances[id];
            } else {
                return false;
            }
        }
    });

    $.extend(true, Notification.prototype, {
        Selectors: {
            close: '[data-notification="close"]'
        },
        Classes: {
            isVisible: 'is-visible'
        },
        init: function () {
            this.event = this.$container.data('notification-event');
            this.$close = this.$container.find(this.Selectors.close);

            $(document).on('x4e:notification:event:show:' + this.event, $.proxy(this, 'onShowEventTrigger'));
            this.$close.on('click touchstart', $.proxy(this, 'onCloseClick'));
        },
        show: function () {
            this.$container.addClass(this.Classes.isVisible);
        },
        close: function () {
            this.$container.removeClass(this.Classes.isVisible);
        },
        onShowEventTrigger: function () {
            this.show();
        },
        onCloseClick: function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            this.close();
        }
    });

    window.X4e = X4e;

})(this, jQuery);