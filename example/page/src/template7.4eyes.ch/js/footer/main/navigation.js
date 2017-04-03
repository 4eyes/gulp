(function (window, $, undefined) {
    'use strict';

    if ($ === undefined) {
        alert('Error: jQuery not loaded!');
        return;
    }

    var X4e = window.X4e || {},
        NavigationHandler = X4e.NavigationHandler || (X4e.NavigationHandler = {})
        ;

    var Navigation = function ($container) {
        this.$container = $container;
        this.init();
    };

    $.extend(true, NavigationHandler, {
        Selectors: {
            container: '[data-navigation="init"]'
        },
        instances: [],
        init: function () {
            var self = this;
            $(this.Selectors.container).each(function () {
                var $instance = $(this),
                    id = $instance.attr('data-navigation-id')
                    ;
                self.instances[id] = new Navigation ($instance);
            });
            $(document).on('x4e:navigation:closeAll', $.proxy(this, 'closeAll'));
        },
        getInstanceById: function (id) {
            if (this.instances[id]) {
                return this.instances[id];
            } else {
                return false;
            }
        },
        closeAll: function () {
            for (var i in this.instances) {
                if (this.instances.hasOwnProperty(i)) {
                    this.instances[i].close();
                }
            }
        }
    });

    $.extend(true, Navigation.prototype, {
        Options: {
            expand: {
                duration: 200
            }
        },
        Selectors: {
            body: 'body',
            header: '[data-navigation="header"]',
            trigger: '[data-navigation="trigger"]',
            expander: '[data-navigation="expand"]',
            lvlItem: '[data-navigation="lvl-item"]',
            lvl: '[data-navigation="lvl"]'
        },
        Attributes: {
            id: 'data-navigation-id',
            focus: 'data-navigation-focus'
        },
        Classes: {
            isActive: 'is-active',
            isHeaderExpanded: 'is-header-expanded',
            isExpanded: 'is-expanded',
            isHover: 'is-hover'
        },
        init: function () {
            this.id = this.$container.attr(this.Attributes.id);
            this.$body = $(this.Selectors.body);
            this.$header = $(this.Selectors.header).first();
            this.$triggers = $(this.Selectors.trigger).filter('[' + this.Attributes.id + '="' + this.id + '"]');
            this.$expander = this.$container.find(this.Selectors.expander);
            this.$lvlItems = this.$container.find(this.Selectors.lvlItem);

            this.$triggers.on('click', $.proxy(this, 'onTriggerClick'));
            this.$expander.on('click', $.proxy(this, 'onExpanderClick'));

            $(document).on('x4e:info:expand', $.proxy(this, 'close'));
            $(document).on('x4e:search:expand', $.proxy(this, 'close'));
            $(window).on('changed.zf.mediaquery', $.proxy(this, 'onMediaQueryChange'));
            $(window).on('x4e:animated-anchors:onAnimationBegin', $.proxy(this, 'onAnchorAnimationBegin'));
        },
        unregisterCloseEvents: function () {
            this.$body.off('click', this.onBodyClick);
            $(document).off('keyup', this.onKeyUp);
        },
        registerCloseEvents: function () {
            this.$body.on('click', $.proxy(this, 'onBodyClick'));
            $(document).on('keyup', $.proxy(this, 'onKeyUp'));
        },
        onTriggerClick: function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            var isCurrentActive = $(ev.currentTarget).hasClass(this.Classes.isActive);

            $(document).triggerHandler('x4e:navigation:closeAll');
            $(document).triggerHandler('x4e:header-popup:hide');

            if (!isCurrentActive) {
                this.expand();
            }
        },
        onBodyClick: function (ev) {
            var $target = $(ev.target);
            if (!$target.is(this.$header) && this.$header.find($target).length === 0) {
                this.close();
            }
        },
        onKeyUp: function (ev){
            var esc = 27;
            if (ev.keyCode === esc) {
                this.close();
            }
        },
        expand: function () {
            this.$container.addClass(this.Classes.isExpanded);
            this.$body.addClass(this.Classes.isHeaderExpanded);
            this.$triggers.addClass(this.Classes.isActive);
            this.registerCloseEvents();
            this.setFocus();
            $(document).triggerHandler('x4e:navigation:expand');
        },
        close: function () {
            this.$container.removeClass(this.Classes.isExpanded);
            this.$body.removeClass(this.Classes.isHeaderExpanded);
            this.$triggers.removeClass(this.Classes.isActive);
            this.unregisterCloseEvents();
            $(document).triggerHandler('x4e:navigation:close');
        },
        onExpanderClick: function (ev) {
            ev.preventDefault();
            ev.stopPropagation();

            var $expander = $(ev.currentTarget);
            var $currentLvlItem = $expander.closest(this.Selectors.lvlItem);
            var $nextLvl = $currentLvlItem.find(this.Selectors.lvl).first();

            if ($currentLvlItem.hasClass(this.Classes.isExpanded)) {
                this.closeLvl($currentLvlItem, $nextLvl);
            } else {
                this.expandLvl($currentLvlItem, $nextLvl);
            }
        },
        expandLvl: function ($currentLvlItem, $nextLvl) {
            var self = this;

            $nextLvl.css('display', 'none');
            $currentLvlItem.addClass(self.Classes.isExpanded);

            $nextLvl
                .stop(true)
                .slideDown(this.Options.expand, function () {
                    $nextLvl.css('display', '');
                });
        },
        closeLvl: function ($currentLvlItem, $nextLvl) {
            var self = this;
            $nextLvl.css('display', 'block');
            $currentLvlItem.removeClass(self.Classes.isExpanded);

            $nextLvl
                .stop(true)
                .slideUp(this.Options.expand, function () {
                    $nextLvl.css('display', '');
                });
        },
        setFocus: function () {
            var attr = this.$container.attr(this.Attributes.focus);
            if (attr) {
                this.$container.find(attr).first().focus();
            }
        },
        onMediaQueryChange: function (event, newSize, oldSize) {
            //There are navigations which have to be hidden for smaller screens. To simplify code, we simply hide all navigations when switching from 'medium' to 'small' screen.
            if (newSize === 'small' && oldSize === 'medium') {
                $(document).triggerHandler('x4e:navigation:closeAll');
            }
        },
        onAnchorAnimationBegin: function () {
            $(document).triggerHandler('x4e:navigation:closeAll');
        }
    });

    window.X4e = X4e;

})(this, jQuery);